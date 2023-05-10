import { BaseComponent } from './base-component';

export class Header extends BaseComponent {
  constructor(root) {
    super({ tag: 'header', attr: { className: 'header' }, parent: root });
    this.wrapper = new BaseComponent({ attr: { className: 'wrapper' }, parent: this.element });
    this.logo = new BaseComponent({
      tag: 'h1',
      attr: { textContent: 'RSS-Minesweeper', className: 'header__logo' },
      parent: this.wrapper.element,
    });
  }
}
