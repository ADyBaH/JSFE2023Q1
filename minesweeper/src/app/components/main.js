import { BaseComponent } from './base-component';

export class Main extends BaseComponent {
  constructor(root) {
    super({ tag: 'main', attr: { className: 'main' }, parent: root });
    this.wrapper = new BaseComponent({ attr: { className: 'wrapper' }, parent: this.element });
  }
}
