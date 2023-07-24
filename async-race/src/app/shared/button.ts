import { BaseComponent } from './base-component'

export class Button extends BaseComponent {
  constructor(className: string, textContent: string, parent?: HTMLElement) {
    super({
      tag: 'button',
      attribute: {
        className: `${className} button`,
        textContent,
        type: 'button',
      },
      parent,
    })
  }

  public disableButton(): void {
    if (this.element instanceof HTMLButtonElement) {
      this.element.disabled = true
    }
  }

  public turnOnButton(): void {
    if (this.element instanceof HTMLButtonElement) {
      this.element.disabled = false
    }
  }
}
