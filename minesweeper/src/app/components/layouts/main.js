import { BaseComponent } from '../../../utils/base-component'
import { GameField } from './game/gameField'

export class Main extends BaseComponent {
  constructor(root) {
    super({ tag: 'main', attr: { className: 'main' }, parent: root })
    this.gameField = new GameField(this.element)
  }
}
