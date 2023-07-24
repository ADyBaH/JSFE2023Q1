import { defaultValuesState } from 'src/app/constants/state-constants'
import type { GarageState } from 'src/app/types/garage-state-type'

export const garageState: GarageState = {
  currentPage: defaultValuesState.currentPage,
  maxPage: defaultValuesState.maxPage,
  minPage: defaultValuesState.minPage,
  changeCar: defaultValuesState.changeCar,
  arrayCars: defaultValuesState.arrayCars,
}
