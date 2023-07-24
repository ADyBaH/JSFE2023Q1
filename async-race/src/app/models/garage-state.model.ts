import type { GarageListComponent } from '../pages/garage-page/components/garage-list-component/garage-list-component'
import type { StatusCarModel } from './status-car.model'

export interface GarageStateModel {
  currentPage: number
  maxPage: number
  minPage: number
  changeCar: StatusCarModel | null
  arrayCars: GarageListComponent[] | null
}
