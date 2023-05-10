import { BaseComponent } from './base-component';

export class Header extends BaseComponent {
  constructor(root) {
    super({ tag: 'header', className: 'header' });
    this.wrapper = new BaseComponent({ tag: 'div', className: 'wrapper' });
    this.logo = new BaseComponent({ tag: 'h1', textContent: 'RSS-Minesweeper', className: 'header__logo' });
    this.wrapper.element.append(this.logo.element);
    this.element.append(this.wrapper.element);
    if (root) {
      root.append(this.element);
    }
  }
}
