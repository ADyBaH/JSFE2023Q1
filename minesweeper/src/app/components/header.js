import { BaseComponent } from '../utils/base-component'

export class Header extends BaseComponent {
  constructor(root) {
    super({ tag: 'header', attr: { className: 'header' }, parent: root })
    this.element.innerHTML = '<h1 class = "header__logo">RSS-Minesweeper</h1>'
  }
}
