import { buttonsTextConstants } from 'src/app/constants/buttons-text-enum'
import { BaseComponent } from '../../shared/base-component'
import { Button } from '../../shared/button'
import './header.scss'

export class Header extends BaseComponent {
  private navigation = new BaseComponent({
    tag: 'nav',
    attribute: {
      className: 'navigation',
    },
    parent: this.element,
  })

  private navigationButtonGarage = new Button('navigation-button', buttonsTextConstants.Garage, this.navigation.element)
  private navigationButtonWinners = new Button(
    'navigation-button',
    buttonsTextConstants.Winners,
    this.navigation.element,
  )

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
