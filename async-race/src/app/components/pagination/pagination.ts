import { numberButtons } from 'src/app/constants/pagination-const'
import { BaseComponent } from '../base-component'
import { Button } from '../button'

export class Pagination extends BaseComponent {
  private arrayButtons = this.generateButtons(numberButtons, this.element)

  constructor(parent: HTMLElement) {
    super({ attribute: { className: 'pagination-container' }, parent })
  }

  private generateButtons(number: number, parent: HTMLElement): Button[] {
    return Array.from({ length: number }, (_, index) => new Button('pagination-button', `${index + 1}`, parent))
  }
}
