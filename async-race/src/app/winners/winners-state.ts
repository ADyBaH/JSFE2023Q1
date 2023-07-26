import { defaultValuesState } from 'src/app/constants/state-constants'
import type { PaginationStateModel } from 'src/app/models/pagination-state.model'
import type { SortType } from 'src/app/types/sort-type'

export const winnersState: PaginationStateModel & SortType = {
  currentPage: defaultValuesState.currentPage,
  maxPage: defaultValuesState.maxPage,
  minPage: defaultValuesState.minPage,
  sortDirection: 'wins-down',
}
