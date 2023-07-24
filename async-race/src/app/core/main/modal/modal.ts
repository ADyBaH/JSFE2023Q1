import { BaseComponent } from '../../../shared/base-component'
import { EmitterEnum } from '../../../enum/emitter.enum'
import { emitter } from '../../../services/event-emitter'
import './modal.scss'

export class Modal extends BaseComponent {
  constructor(parent: HTMLElement) {
    super({ attribute: { className: 'modal modal_hidden' }, parent })

    this.innerHTML = `
    <div class="modal__win-block">
      <h2 class="modal__win-block_logo">
        Congratulation!
      </h2>
      <p class="modal__win-block_paragraph">
        You completed last task.
      </p>
    </div>
    `

    emitter.subscribe(EmitterEnum.ShowModal, this.showModal)
    this.setEventListener('click', () => this.addClass('modal_hidden'))
  }

  private showModal = (text: string): void => {
    this.innerHTML = `
    <div class="modal__win-block">
      <h2 class="modal__win-block_logo">
        Congratulation!
      </h2>
      <p class="modal__win-block_paragraph">
        ${text}
      </p>
    </div>
    `
    this.removeClass('modal_hidden')

    const timer = setTimeout(() => {
      this.addClass('modal_hidden')
      this.clearTimer(timer)
    }, 5000)
  }

  private clearTimer(timer: NodeJS.Timeout): void {
    clearTimeout(timer)
  }
}
