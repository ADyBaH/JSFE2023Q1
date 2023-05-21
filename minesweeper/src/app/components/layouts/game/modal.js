import { BaseComponent } from '../../../../utils/base-component'

export class Modal extends BaseComponent {
  constructor(parent) {
    super({ attr: { className: 'game__modal game__modal_hide' }, parent })
    this.text = new BaseComponent({
      tag: 'h2',
      attr: { className: 'game__modal_logo', textContent: 'You win' },
      parent: this.element,
    })
  }
}
