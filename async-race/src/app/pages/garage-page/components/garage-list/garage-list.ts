import { BaseComponent } from 'src/app/components/base-component'
import { maxItemsInList } from 'src/app/constants/list-constants'
import type { StatusCar } from 'src/app/types/status-car-type'
import { httpService } from 'src/app/services/http-service'
import { emitter } from 'src/app/services/event-emitter'
import { EmitterEnum } from 'src/app/enum/emitter-enum'
import { GarageListComponent } from '../garage-list-component/garage-list-component'
import { garageState } from '../../garage-state'
import './garage-list.scss'

export class GarageList extends BaseComponent {
  private garageState = garageState

  constructor(parent: HTMLElement) {
    super({ attribute: { className: 'garage-list' }, parent })

    this.generateGarageComponents()

    emitter.subscribe(EmitterEnum.UpdateCars, this.generateGarageComponents)
    emitter.subscribe(EmitterEnum.ChangeNumberGaragePage, this.generateGarageComponents)
  }

  private generateGarageComponents = async (): Promise<void> => {
    this.removeAllChildren()

    emitter.emit(EmitterEnum.HideChangeCarForm)
    emitter.emit(EmitterEnum.LockGaragePaginationButtons)

    const { arrayCars, totalItems } = await httpService.getPaginationCars(this.garageState.currentPage)

    if (totalItems === null) {
      return
    }

    emitter.emit(EmitterEnum.ChangeLogo, totalItems)

    this.garageState.maxPage = Math.ceil(Number(totalItems) / maxItemsInList)
    this.garageState.arrayCars = arrayCars.map((car) => new GarageListComponent(car, this.element))

    emitter.emit(EmitterEnum.UnlockGaragePaginationButtons)
  }

  private getTextForModal(cars: StatusCar): string {
    return `${cars.carName.innerHTML} won first to ${cars.time} seconds.`
  }

  public async startRace(): Promise<void> {
    if (!this.garageState.arrayCars) {
      return
    }

    Promise.any(this.garageState.arrayCars.map((car) => car.startCar())).then((car) => {
      if (car) {
        emitter.emit(EmitterEnum.ShowModal, this.getTextForModal(car))
        emitter.emit(EmitterEnum.AppendWinner, { id: car.id, time: car.time })
      }
    })
  }

  public async resetRace(): Promise<void> {
    if (this.garageState.arrayCars) {
      this.garageState.arrayCars.forEach(async (car) => car.resetCar())
    }
  }
}
