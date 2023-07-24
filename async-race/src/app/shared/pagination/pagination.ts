import { paginationDictionary } from 'src/app/dictionary/pagination-dictionary'
import type { PaginationStateModel } from 'src/app/models/pagination-state.model'
import { ButtonsTextEnum } from 'src/app/enum/buttons-text-enum'
import { emitter } from 'src/app/services/event-emitter'
import { BaseComponent } from '../base-component'
import { Button } from '../button'
import './pagination.scss'

export class Pagination extends BaseComponent {
  private state
  private emitterEvent

  private decreaseCountPage = new Button(
    'pagination-container__button-increase',
    ButtonsTextEnum.ArrowLeft,
    this.element,
  )

  private currentPageLogo = new BaseComponent({
    tag: 'span',
    attribute: { className: 'pagination-container__logo' },
    parent: this.element,
  })

  private increaseCountPage = new Button(
    'pagination-container__button-increase',
    ButtonsTextEnum.ArrowRight,
    this.element,
  )

  constructor(state: PaginationStateModel, parent: HTMLElement, emitterEvent: string) {
    super({ attribute: { className: 'pagination-container' }, parent })
    this.state = state
    this.emitterEvent = emitterEvent

    this.changeCurrentPageLogo()

    this.decreaseCountPage.setDisableStatus(true)
    this.increaseCountPage.setEventListener('click', () => this.changeNumberPage(1))
    this.decreaseCountPage.setEventListener('click', () => this.changeNumberPage(-1))
  }

  public checkButtons = (): void => {
    paginationDictionary[`${this.state.maxPage <= this.state.currentPage}`](this.increaseCountPage)
    paginationDictionary[`${this.state.minPage >= this.state.currentPage}`](this.decreaseCountPage)
  }

  public disableAllPaginationButtons = (): void => {
    this.increaseCountPage.setDisableStatus(true)
    this.decreaseCountPage.setDisableStatus(true)
  }

  private changeCurrentPageLogo = (): void => {
    this.currentPageLogo.innerText = `Page #${this.state.currentPage}`
  }

  private changeNumberPage = (value: number): void => {
    this.increaseCountPage.setDisableStatus(false)
    this.state.currentPage += value
    this.checkButtons()

    this.changeCurrentPageLogo()
    emitter.emit(this.emitterEvent)
  }
}
