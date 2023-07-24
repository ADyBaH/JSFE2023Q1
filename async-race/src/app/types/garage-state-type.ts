import type { GarageListComponent } from '../pages/garage-page/components/garage-list-component/garage-list-component'
import type { StatusCar } from './status-car-type'

export type GarageState = {
  currentPage: number
  maxPage: number
  minPage: number
  changeCar: StatusCar | null
  arrayCars: GarageListComponent[] | null
}
