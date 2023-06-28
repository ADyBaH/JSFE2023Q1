import { BaseComponent } from '../../../../utils/base-component'
import { modalWinTemplate } from '../../../constants/modal-template'
import { EmitterEnum } from '../../../enum/emitter-enum'
import { emitter } from '../../../services/event-emitter'
import './modal.scss'

export class Modal extends BaseComponent {
  constructor(parent: HTMLElement) {
    super({ attribute: { className: 'modal modal_hidden' }, parent })
    this.setEventListener('click', () => this.toggle('modal_hidden'))
    emitter.subscribe(EmitterEnum.showModal, () => this.toggle('modal_hidden'))
    this.innerHTML = modalWinTemplate
  }
}
