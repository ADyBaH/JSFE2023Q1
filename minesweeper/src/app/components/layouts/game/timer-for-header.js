import { BaseComponent } from '../../../../utils/base-component'
import { getStringWithPad } from '../../../../utils/get-string-with-pad'

export class Timer extends BaseComponent {
  constructor(parent, gameState) {
    super({
      tag: 'span',
      attr: { className: 'timer-game', textContent: '000' },
      parent,
    })
    this.gameState = gameState
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.element.textContent = getStringWithPad((this.gameState.timer += 1))
    }, 1000)
  }

  stopTimer() {
    clearInterval(this.timerInterval)
  }

  clearTimer() {
    this.element.textContent = '000'
    clearInterval(this.timerInterval)
  }
}
