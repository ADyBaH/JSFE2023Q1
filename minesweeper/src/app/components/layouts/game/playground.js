import { BaseComponent } from '../../../../utils/base-component'
import { getRandomCell } from '../../../../utils/get-random-cell'
import { getNumberOfMine } from '../../../../utils/get-number-of-mine'
import { openButtonAround } from '../../../../utils/open-button-around'
import { isWin } from '../../../../utils/is-win'
import { generateMatrixWithButtons } from '../../../../utils/generate-matrix-with-buttons'
import { setWin } from '../../../../utils/set-win'
import { setLose } from '../../../../utils/set-lose'
import { startGame } from '../../../../utils/start-game'
import { setLeftClickOnButton } from '../../../../utils/set-left-click-on-button'
import { setRightClickOnButton } from '../../../../utils/set-right-click-on-button'
import click from '../../../../assets/sounds/korotkiy-pochti-bezzvuchnyiy-schelchok.mp3'
import lose from '../../../../assets/sounds/lose.mp3'
import win from '../../../../assets/sounds/win.mp3'

export class Playground extends BaseComponent {
  constructor(gameField, gameState, header, options, modal) {
    super({ attr: { className: 'game__playground game__playground_easy' }, parent: gameField })
    this.gameState = gameState
    this.header = header
    this.options = options
    this.modal = modal
    this.header.buttonNewGame.element.addEventListener('click', () => this.newGame())
    this.soundClick = new Audio(click)
    this.soundWin = new Audio(win)
    this.soundWin.volume = 0.1
    this.soundLose = new Audio(lose)
    this.soundLose.volume = 0.1
  }

  get flatPlayground() {
    return this.playground.flatMap((array) => array)
  }

  generateMatrix(numberOfButton) {
    this.playground = generateMatrixWithButtons(this.element, numberOfButton)
    this.flatPlayground.forEach((buttonInstance) => {
      Object.assign(buttonInstance.element, { className: `button button_${this.gameState.difficult}` })
      buttonInstance.element.addEventListener('mousedown', ({ button, target }) =>
        this.eventButtonClick(button, target),
      )
    })
  }

  newGame() {
    this.header.timer.clearTimer()
    this.header.clearCountOfMove()
    this.header.buttonNewGame.element.className = 'button-new-game'
    this.options.element.classList.remove('game__options_hide')
    this.modal.element.className = 'game__modal game__modal_hide'
    Object.assign(this.gameState, {
      isStart: false,
      timer: 0,
      numberOfOpenCeil: 0,
    })

    this.flatPlayground.forEach((buttonInstance) => {
      Object.assign(buttonInstance.element, { className: `button button_${this.gameState.difficult}` })
      buttonInstance.setStateButton({
        state: {
          isMine: false,
          isChecked: false,
          isOpen: false,
        },
        text: { textContent: '' },
      })
    })
  }

  addMines(numberOfMine, excludeTuple) {
    for (let counterOfMine = 0; counterOfMine !== numberOfMine; ) {
      getRandomCell(this.playground, excludeTuple).setStateButton({
        state: { isMine: true },
        text: { textContent: '' },
      })
      counterOfMine += 1
    }

    this.flatPlayground.forEach((buttonInstance) => {
      if (!buttonInstance.isMine) {
        const numberOfMineAround = getNumberOfMine(this.playground, buttonInstance.matrixIndex)

        buttonInstance.setStateButton({
          state: { numberOfMineAround },
          text: { textContent: '' },
        })
      }
    })
  }

  eventButtonClick(mouseButton, target) {
    if (!(mouseButton !== 0 || mouseButton !== 2)) {
      return
    }
    if (this.gameState.isSound) {
      this.soundClick.play()
    }
    const tupleIndexFromButton = target.dataset.matrixIndex.split(',').map(Number)
    const clickButtonInstance = this.playground[tupleIndexFromButton[0]][tupleIndexFromButton[1]]
    if (clickButtonInstance.isOpen || clickButtonInstance.isChecked) {
      return
    }
    if (!this.gameState.isStart) {
      this.addMines(this.gameState.countOfMine, tupleIndexFromButton)
      startGame(this.gameState, this.header, this.options)
    }
    if (clickButtonInstance.isMine && mouseButton === 0) {
      setLose(this.gameState, this.header, this.modal, this.options, target, this.soundLose)
      return
    }
    this.header.increaseCountOfMove()
    if (mouseButton === 0) {
      setLeftClickOnButton(clickButtonInstance)
      this.gameState.numberOfOpenCeil += 1
    }
    if (mouseButton === 2) {
      setRightClickOnButton(clickButtonInstance)
    }
    if (!clickButtonInstance.numberOfMineAround && mouseButton === 0) {
      openButtonAround(this.playground, tupleIndexFromButton, this.gameState)
    }
    if (isWin(this.gameState)) {
      setWin(this.gameState, this.header, this.modal, this.options, this.soundWIn)
    }
  }
}
