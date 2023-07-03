import { BaseComponent } from '../../../../utils/base-component'
import { modalWinTemplate } from '../../../constants/modal-template'
import { EmitterEnum } from '../../../enum/emitter-enum'
import { EventEnum } from '../../../enum/event-enum'
import { emitter } from '../../../services/event-emitter'
import './modal.scss'

export class Modal extends BaseComponent {
  constructor(parent: HTMLElement) {
    super({ attribute: { className: 'modal modal_hidden' }, parent })

    this.innerHTML = modalWinTemplate

    emitter.subscribe(EmitterEnum.ShowModal, () => this.toggle('modal_hidden'))
    this.setEventListener(EventEnum.Click, () => this.toggle('modal_hidden'))
  }
}
