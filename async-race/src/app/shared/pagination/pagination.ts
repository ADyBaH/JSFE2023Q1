import { paginationDictionary } from 'src/app/dictionary/pagination-dictionary'
import type { PaginationStateModel } from 'src/app/models/pagination-state.model'
import { buttonsTextConstants } from 'src/app/constants/buttons-text-enum'
import { emitter } from 'src/app/services/event-emitter'
import { BaseComponent } from '../base-component'
import { Button } from '../button'
import './pagination.scss'

export class Pagination extends BaseComponent {
  private paginationState
  private emitterEvent

  private decreaseCountPage = new Button(
    'pagination-container__button-increase',
    buttonsTextConstants.ArrowLeft,
    this.element,
  )

  private currentPageLogo = new BaseComponent({
    tag: 'span',
    attribute: { className: 'pagination-container__logo' },
    parent: this.element,
  })

  private increaseCountPage = new Button(
    'pagination-container__button-increase',
    buttonsTextConstants.ArrowRight,
    this.element,
  )

  constructor(state: PaginationStateModel, parent: HTMLElement, emitterEvent: string) {
    super({ attribute: { className: 'pagination-container' }, parent })
    this.paginationState = state
    this.emitterEvent = emitterEvent

    this.changeCurrentPageLogo()

    this.decreaseCountPage.setDisableStatus(true)
    this.increaseCountPage.setEventListener('click', () => this.changeNumberPage(1))
    this.decreaseCountPage.setEventListener('click', () => this.changeNumberPage(-1))
  }

  public checkButtonsForEndPages = (): void => {
    paginationDictionary[`${this.paginationState.maxPage <= this.paginationState.currentPage}`](this.increaseCountPage)
    paginationDictionary[`${this.paginationState.minPage >= this.paginationState.currentPage}`](this.decreaseCountPage)
  }

  public disablePaginationButtons = (): void => {
    this.increaseCountPage.setDisableStatus(true)
    this.decreaseCountPage.setDisableStatus(true)
  }

  private changeCurrentPageLogo = (): void => {
    this.currentPageLogo.innerText = `Page #${this.paginationState.currentPage}`
  }

  private changeNumberPage = (value: number): void => {
    this.increaseCountPage.setDisableStatus(false)
    this.paginationState.currentPage += value
    this.checkButtonsForEndPages()

    this.changeCurrentPageLogo()
    emitter.emit(this.emitterEvent)
  }
}
