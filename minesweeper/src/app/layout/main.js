import { BaseComponent } from '../utils/base-component'
import { Game } from '../components/game'
// убрать врапы
export class Main extends BaseComponent {
  constructor(root) {
    super({ tag: 'main', attr: { className: 'main' }, parent: root })
    this.wrapper = new BaseComponent({ attr: { className: 'wrapper' }, parent: this.element })
    this.gameField = new Game(this.element)
  }
}
