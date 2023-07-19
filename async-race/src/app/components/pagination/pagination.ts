import type { PaginationState } from 'src/app/types/pagination-state-type'
import { emitter } from 'src/app/services/event-emitter'
import { EmitterEnum } from 'src/app/enum/emitter-enum'
import { BaseComponent } from '../base-component'
import { Button } from '../button'

export class Pagination extends BaseComponent {
  private state

  private decreaseCountPage = new Button('pagination-container__button-increase', 'decrease', this.element)
  private counterLogo = new BaseComponent({
    tag: 'span',
    attribute: { className: 'pagination-container__logo' },
    parent: this.element,
  })
  private increaseCountPage = new Button('pagination-container__button-increase', 'increase', this.element)

  constructor(state: PaginationState, parent: HTMLElement) {
    super({ attribute: { className: 'pagination-container' }, parent })
    this.state = state
    this.updateLogo()
    this.increaseCountPage.setEventListener('click', this.increaseNumberPage)
    this.decreaseCountPage.setEventListener('click', this.decreaseNumberPage)
  }

  private updateLogo = (): void => {
    this.counterLogo.innerText = `Page #${this.state.currentPage}`
  }

  private increaseNumberPage = (): void => {
    if (this.state.maxPage < this.state.currentPage + 1) {
      return
    }

    this.state.currentPage += 1
    this.updateLogo()
    emitter.emit(EmitterEnum.changeNumberPage)
  }

  private decreaseNumberPage = (): void => {
    if (this.state.minPage > this.state.currentPage - 1) {
      return
    }
    this.state.currentPage -= 1
    this.updateLogo()
    emitter.emit(EmitterEnum.changeNumberPage)
  }
}
