import { BaseComponent } from '../../../../utils/base-component'

export class ButtonForPlayground extends BaseComponent {
  constructor({ field, isMine = false, isOpen = false, isChecked = false, numberOfMineAround = 0, events }, index) {
    super({
      tag: 'button',
      attr: { className: 'button', textContent: '' },
      parent: field,
      events,
    })
    this.matrixIndex = index
    this.element.dataset.matrixIndex = index
    this.isMine = isMine
    this.isChecked = isChecked
    this.isOpen = isOpen

    this.numberOfMineAround = numberOfMineAround
  }

  setStateButton({ state, text }) {
    if (state) {
      Object.assign(this, state)
    }
    if (text) {
      Object.assign(this.element, text)
    }
  }
}
