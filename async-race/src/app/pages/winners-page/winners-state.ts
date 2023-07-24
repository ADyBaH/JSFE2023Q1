import { defaultValuesState } from 'src/app/constants/state-constants'
import type { PaginationState } from 'src/app/types/pagination-state-type'
import type { SortType } from 'src/app/types/sort-type'

export const winnersState: PaginationState & SortType = {
  currentPage: defaultValuesState.currentPage,
  maxPage: defaultValuesState.maxPage,
  minPage: defaultValuesState.minPage,
  sortDirection: 'wins-down',
}
