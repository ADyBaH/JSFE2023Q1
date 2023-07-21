import type { GarageListComponent } from '../pages/garage-page/components/garage-list-component/garage-list-component'

export type GarageState = {
  currentPage: number
  maxPage: number
  minPage: number
  changeCar: null | number
  arrayCars: GarageListComponent[] | null
}
