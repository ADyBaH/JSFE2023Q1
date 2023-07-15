import { BaseComponent } from '../base-component'
import './header.scss'

export class Header extends BaseComponent {
  private navigation = new BaseComponent({
    tag: 'nav',
    attribute: {
      className: 'navigation',
    },
    parent: this.element,
  })

  private navigationButtonGarage = new BaseComponent({
    tag: 'button',
    attribute: {
      className: 'button',
      type: 'button',
      textContent: 'Garage',
    },
    parent: this.navigation.element,
  })

  private navigationButtonWinners = new BaseComponent({
    tag: 'button',
    attribute: {
      className: 'button',
      type: 'button',
      textContent: 'Winners',
    },
    parent: this.navigation.element,
  })

  constructor(root: HTMLElement) {
    super({ tag: 'header', attribute: { className: 'header' }, parent: root })
    this.navigationButtonGarage.setEventListener('click', ({ target }) => this.changeHashPage(target))
    this.navigationButtonWinners.setEventListener('click', ({ target }) => this.changeHashPage(target))
  }

  private changeHashPage(target: EventTarget | null): void {
    if (!(target instanceof HTMLElement) || target.textContent === null) {
      return
    }

    window.location.hash = `#${target.textContent.toLowerCase()}`
  }
}
