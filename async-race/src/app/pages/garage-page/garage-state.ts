import { defaultValuesState } from 'src/app/constants/state-constants'
import type { GarageStateModel } from 'src/app/models/garage-state.model'

export const garageState: GarageStateModel = {
  currentPage: defaultValuesState.currentPage,
  maxPage: defaultValuesState.maxPage,
  minPage: defaultValuesState.minPage,
  changeCar: defaultValuesState.changeCar,
  arrayCars: defaultValuesState.arrayCars,
}
