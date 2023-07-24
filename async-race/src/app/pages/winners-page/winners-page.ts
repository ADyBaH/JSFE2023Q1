import { Pagination } from 'src/app/shared/pagination/pagination'
import { BaseComponent } from 'src/app/shared/base-component'
import { ButtonsTextEnum } from 'src/app/enum/buttons-text-enum'
import { emitter } from 'src/app/services/event-emitter'
import { EmitterEnum } from 'src/app/enum/emitter-enum'
import { Button } from 'src/app/shared/button'
import { WinnersContainers } from './components/winners-container/winners-container'
import { defaultWinnersLogo } from './constants/default-winners-logo'
import { winnersState } from './winners-state'
import './winners-page.scss'

export class Winners extends BaseComponent {
  private state = winnersState

  private logo = new BaseComponent({
    tag: 'h2',
    attribute: {
      className: 'winners__logo',
      innerText: defaultWinnersLogo,
    },
    parent: this.element,
  })

  private paginationWinners = new Pagination(this.state, this.element, EmitterEnum.ChangeNumberWinnersPage)

  private headersUl
  private arrayUlHeaders

  private buttonWinsSort = new Button('winners__li-header winsDown', ButtonsTextEnum.Wins)
  private buttonTimeSort = new Button('winners__li-header', ButtonsTextEnum.Time)

  private container

  constructor(parent?: HTMLElement) {
    super({
      attribute: {
        className: 'winners',
      },
      parent,
    })

    this.headersUl = new BaseComponent({
      tag: 'ul',
      attribute: {
        className: 'winners__ul-headers',
      },
      parent: this.element,
    })

    this.container = new WinnersContainers(this.element, this.state)

    this.arrayUlHeaders = this.createLiHeaders()

    this.arrayUlHeaders[3].appendElement(this.buttonWinsSort.element)
    this.arrayUlHeaders[4].appendElement(this.buttonTimeSort.element)

    emitter.subscribe(EmitterEnum.UpdateWinnersLogo, this.updateLogo)
    emitter.subscribe(EmitterEnum.LockWinnersPaginationButtons, this.paginationWinners.disablePaginationButtons)
    emitter.subscribe(EmitterEnum.UnlockWinnersPaginationButtons, this.paginationWinners.checkButtons)

    this.buttonWinsSort.setEventListener('click', this.sortWins)
    this.buttonTimeSort.setEventListener('click', this.sortTime)
  }

  private createLiHeaders(): BaseComponent[] {
    const headers = ['id', 'car', 'name', '', '']
    return headers.map(
      (header) =>
        new BaseComponent({
          tag: 'li',
          attribute: { className: 'winners__li-header', textContent: header },
          parent: this.headersUl.element,
        }),
    )
  }

  private updateSortButtons = (instance: Button): void => {
    this.buttonWinsSort.setClassName('winners__li-header button')
    this.buttonTimeSort.setClassName('winners__li-header button')

    instance.addClass(this.state.sortDirection)
  }

  private updateLogo = (number: string | number): void => {
    this.logo.innerText = `Winners (${number})`
  }

  private sortWins = (): void => {
    this.state.sortDirection = this.state.sortDirection === 'wins-up' ? 'wins-down' : 'wins-up'

    this.updateSortButtons(this.buttonWinsSort)

    emitter.emit(EmitterEnum.GenerateWinners)
  }

  private sortTime = (): void => {
    this.state.sortDirection = this.state.sortDirection === 'time-up' ? 'time-down' : 'time-up'

    this.updateSortButtons(this.buttonTimeSort)

    emitter.emit(EmitterEnum.GenerateWinners)
  }
}
