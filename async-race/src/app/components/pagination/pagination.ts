import { paginationDictionary } from 'src/app/dictionary/pagination-dictionary'
import type { PaginationState } from 'src/app/types/pagination-state-type'
import { emitter } from 'src/app/services/event-emitter'
import { BaseComponent } from '../base-component'
import { Button } from '../button'
import './pagination.scss'

export class Pagination extends BaseComponent {
  private state
  private emitterEvent

  private decreaseCountPage = new Button('pagination-container__button-increase', '⬅', this.element)

  private counterLogo = new BaseComponent({
    tag: 'span',
    attribute: { className: 'pagination-container__logo' },
    parent: this.element,
  })

  private increaseCountPage = new Button('pagination-container__button-increase', '➡', this.element)

  constructor(state: PaginationState, parent: HTMLElement, emitterEvent: string) {
    super({ attribute: { className: 'pagination-container' }, parent })
    this.state = state
    this.emitterEvent = emitterEvent

    this.updateLogo()

    this.decreaseCountPage.disableButton()
    this.increaseCountPage.setEventListener('click', this.increaseNumberPage)
    this.decreaseCountPage.setEventListener('click', this.decreaseNumberPage)
  }

  public checkButtons = (): void => {
    paginationDictionary[`${this.state.maxPage <= this.state.currentPage}`](this.increaseCountPage)
    paginationDictionary[`${this.state.minPage >= this.state.currentPage}`](this.decreaseCountPage)
  }

  public disableAllPaginationButtons = (): void => {
    this.increaseCountPage.disableButton()
    this.decreaseCountPage.disableButton()
  }

  private updateLogo = (): void => {
    this.counterLogo.innerText = `Page #${this.state.currentPage}`
  }

  private increaseNumberPage = (): void => {
    this.decreaseCountPage.turnOnButton()
    this.state.currentPage += 1
    this.checkButtons()

    this.updateLogo()
    emitter.emit(this.emitterEvent)
  }

  private decreaseNumberPage = (): void => {
    this.increaseCountPage.turnOnButton()
    this.state.currentPage -= 1
    this.checkButtons()

    this.updateLogo()
    emitter.emit(this.emitterEvent)
  }
}
