import { BaseComponent } from 'src/app/components/base-component'
import { httpService } from 'src/app/services/http-service'
import { emitter } from 'src/app/services/event-emitter'
import { EmitterEnum } from 'src/app/enum/emitter-enum'
import { maxItemsInList } from 'src/app/constants/list-constants'
import type { Car } from 'src/app/types/car-type'
import { GarageListComponent } from '../garage-list-component/garage-list-component'
import { garageState } from '../../garage-state'

export class GarageList extends BaseComponent {
  private garageState = garageState

  constructor(parent: HTMLElement) {
    super({ attribute: { className: 'garage-list' }, parent })
    this.generateGarageComponents()
    emitter.subscribe(EmitterEnum.updateCars, this.generateGarageComponents)
    emitter.subscribe(EmitterEnum.changeNumberPage, this.generateGarageComponents)
  }

  private getChunkCars(array: Car[], numberPage: number, lenght: number): Car[] {
    return array.slice(numberPage * lenght - lenght, numberPage * lenght)
  }
  private generateGarageComponents = async (): Promise<void> => {
    this.removeAllChildren()
    const carsArray = await httpService.getCars()
    this.garageState.maxPage = Math.ceil(carsArray.length / maxItemsInList)
    this.getChunkCars(carsArray, this.garageState.currentPage, maxItemsInList).map(
      (car) => new GarageListComponent(car, this.element),
    )
  }
}
