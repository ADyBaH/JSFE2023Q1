import type { WinnersCarType } from 'src/app/types/winners-car-type'
import { httpWinnersClient } from 'src/app/services/http-winners-client'
import { BaseComponent } from 'src/app/shared/base-component'
import { httpGarageClient } from 'src/app/services/http-garage-client'
import { emitter } from 'src/app/services/event-emitter'
import { EmitterEnum } from 'src/app/enum/emitter.enum'
import type { PaginationStateModel } from 'src/app/models/pagination-state.model'
import type { SortType } from 'src/app/types/sort-type'
import { winnersSortDictionary } from 'src/app/dictionary/winners-sort-dictionary'
import { UlElementWinner } from '../ul-component-winners/ul-element-winners'
import { maxItemsOnPage } from '../../constants/max-items-on-page'
import './winners-container.scss'

export class WinnersContainers extends BaseComponent {
  private paginationState: PaginationStateModel & SortType

  constructor(parent: HTMLElement, state: PaginationStateModel & SortType) {
    super({
      attribute: {
        className: 'winners__container',
      },
      parent,
    })
    this.paginationState = state
    emitter.subscribe(EmitterEnum.GenerateWinners, this.generateWinners)
    emitter.subscribe(EmitterEnum.ChangeNumberWinnersPage, this.generateWinners)
    this.generateWinners()
  }

  private getWinners = async (): Promise<WinnersCarType[]> => {
    emitter.emit(EmitterEnum.LockWinnersPaginationButtons)

    const getAllWinners = await httpWinnersClient.getWinners()

    this.paginationState.maxPage = getAllWinners.length / maxItemsOnPage
    const arrayWinners = await httpWinnersClient.getPaginationWinners(this.paginationState.currentPage)

    const arrayCars = await Promise.all(arrayWinners.map(async (winner) => httpGarageClient.getCarById(winner.id)))
    const arrayWinnerCars = arrayCars.map((car, index) => ({ ...car, ...arrayWinners[index] }))

    return winnersSortDictionary[this.paginationState.sortDirection](arrayWinnerCars)
  }

  private generateWinners = async (): Promise<void> => {
    this.removeAllChildren()

    const arrayWinner = await this.getWinners()

    if (arrayWinner) {
      arrayWinner.forEach((winnerCar) => new UlElementWinner({ ...winnerCar, parent: this.element }))
    }

    emitter.emit(EmitterEnum.UnlockWinnersPaginationButtons)
  }
}
