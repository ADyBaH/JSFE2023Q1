import './levels-burger-button.scss'
import { BaseComponent } from '../../../../../../../../utils/base-component'

export class LevelsBurgerBlock extends BaseComponent {
  constructor(parent: HTMLElement) {
    super({
      attribute: { className: 'header-levels-block__burger-block' },
      parent,
    })
    this.element.innerHTML = '<div class="header-levels-block__burger-button"></div>'
  }
}
