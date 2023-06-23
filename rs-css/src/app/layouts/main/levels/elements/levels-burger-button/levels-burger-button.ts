import './levels-burger-button.scss'
import { BaseComponent } from '../../../../../../utils/base-component'

export class LevelsBurgerBlock extends BaseComponent {
  public burgerButton = new BaseComponent({
    attribute: { className: 'header-levels-block__burger-button' },
    parent: this.element,
  })
  constructor(parent: HTMLElement) {
    super({
      attribute: { className: 'header-levels-block__burger-block' },
      parent,
    })
  }
}
