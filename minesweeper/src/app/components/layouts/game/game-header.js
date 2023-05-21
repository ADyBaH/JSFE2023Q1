import { BaseComponent } from '../../../../utils/base-component'
import { getStringWithPad } from '../../../../utils/get-string-with-pad'
import { Timer } from './timer-for-header'

export class GameHeader extends BaseComponent {
  constructor(gameField, gameState) {
    super({ attr: { className: 'game__header' }, parent: gameField })

    this.gameState = gameState

    this.countOfMove = new BaseComponent({
      tag: 'span',
      attr: { className: 'number-of-move', innerText: ` 000` },
      parent: this.element,
    })

    this.buttonNewGame = new BaseComponent({
      tag: 'button',
      attr: { className: 'button-new-game' },
      parent: this.element,
    })

    this.timer = new Timer(this.element, gameState)
  }

  get getCountOfMove() {
    return this.gameState.countOfMove
  }

  set setCountOfMove(value) {
    if (this.getCountOfMove === null) {
      this.gameState.countOfMove = 0
    }
    this.gameState.countOfMove += value
    this.countOfMove.element.innerText = ` ${getStringWithPad(this.gameState.countOfMove)}`
  }

  increaseCountOfMove() {
    this.setCountOfMove = +1
  }

  clearCountOfMove() {
    this.gameState.countOfMove = null
    this.countOfMove.element.innerText = ` 000`
  }
}
