import { BaseComponent } from 'src/app/components/base-component'
import { httpService } from 'src/app/services/http-service'
import { emitter } from 'src/app/services/event-emitter'
import { EmitterEnum } from 'src/app/enum/emitter-enum'
import { maxItemsInList } from 'src/app/constants/list-constants'
import { GarageListComponent } from '../garage-list-component/garage-list-component'
import { garageState } from '../../garage-state'

export class GarageList extends BaseComponent {
  private garageState = garageState

  constructor(parent: HTMLElement) {
    super({ attribute: { className: 'garage-list' }, parent })
    this.generateGarageComponents()
    emitter.subscribe(EmitterEnum.updateCars, this.generateGarageComponents)
    emitter.subscribe(EmitterEnum.changeNumberPage, this.generateGarageComponents)
    emitter.subscribe(EmitterEnum.startRace, this.startRace)
  }

  private generateGarageComponents = async (): Promise<void> => {
    this.removeAllChildren()
    emitter.emit(EmitterEnum.lockGaragePaginationButtons)
    const { arrayCars, totalItems } = await httpService.getPaginationCars(this.garageState.currentPage)

    if (totalItems === null) {
      return
    }
    emitter.emit(EmitterEnum.changeLogo, totalItems)
    this.garageState.maxPage = Math.ceil(Number(totalItems) / maxItemsInList)
    this.garageState.arrayCars = arrayCars.map((car) => new GarageListComponent(car, this.element))
    emitter.emit(EmitterEnum.unlockGaragePaginationButtons)
  }

  public async startRace(): Promise<void> {
    if (this.garageState.arrayCars) {
      this.garageState.arrayCars.forEach(async (car) => car.startCar())
    }
  }

  public async resetRace(): Promise<void> {
    if (this.garageState.arrayCars) {
      this.garageState.arrayCars.forEach(async (car) => car.resetCar())
    }
  }
}
