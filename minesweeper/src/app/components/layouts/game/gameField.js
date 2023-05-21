import { appendEventForButtons } from '../../../../utils/append-event-for-buttons'
import { BaseComponent } from '../../../../utils/base-component'
import { dictionaryForDifferenceButtons } from '../../../../utils/dictionary-for-difference-buttons'
import { GameState } from '../../../../utils/game-state'
import { AbsoluteButtonsBlock } from './absolute-buttons-block'
import { GameHeader } from './game-header'
import { GameOptions } from './game-options'
import { Modal } from './modal'
import { Playground } from './playground'

export class GameField extends BaseComponent {
  constructor(main) {
    super({ tag: 'section', attr: { className: 'game section' }, parent: main })
    this.gameState = new GameState({
      timer: 0,
      isStart: false,
      countOfCeil: 10,
      countOfMine: 10,
      countOfMove: null,
      maximumMine: 99,
      minimumMine: 10,
      numberOfOpenCeil: 0,
      difficult: 'easy',
      isSound: true,
      theme: 'dark',
    })
    this.modal = new Modal(this.element)
    this.gameHeader = new GameHeader(this.element, this.gameState)
    this.gameOptions = new GameOptions(this.element, this.gameState)
    this.absoluteButtonsBlock = new AbsoluteButtonsBlock(main, this.gameState, this.modal)
    appendEventForButtons(this.gameOptions.arrayWithDifferenceButtons, 'click', ({ target }) =>
      this.rebuildTemplate(target),
    )
    this.gameField = new Playground(this.element, this.gameState, this.gameHeader, this.gameOptions, this.modal)
    this.gameField.generateMatrix(this.gameState.countOfCeil)
  }

  rebuildTemplate(target) {
    const numberOfCeil = dictionaryForDifferenceButtons[target.textContent]
    this.gameState.difficult = target.textContent
    this.gameField.element.replaceWith()
    this.gameState.countOfCeil = numberOfCeil
    this.gameField = new Playground(this.element, this.gameState, this.gameHeader, this.gameOptions, this.modal)
    this.gameField.generateMatrix(this.gameState.countOfCeil)
    this.gameField.element.className = `game__playground game__playground_${target.textContent}`
  }
}
