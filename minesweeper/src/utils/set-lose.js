import { setToLocalStorage } from './set-to-localstorage'

export function setLose(state, header, modal, options, target, soundLose, arrayButtons) {
  Object.assign(target, { textContent: '💥' })
  Object.assign(options.element, { className: 'game__options game__options_hide' })
  Object.assign(modal.text.element, { textContent: 'Game over. Try again', className: 'game__modal_logo logo_lose' })
  Object.assign(modal.element, { className: 'game__modal' })
  Object.assign(header.buttonNewGame.element, { className: 'button-new-game button-new-game-lose' })
  setToLocalStorage(`Lose: difficult: ${state.difficult}, count of mine: ${state.countOfMine}, seconds: ${state.timer}`)
  if (state.isSound) {
    soundLose.play()
  }
  header.timer.stopTimer()
  arrayButtons.forEach((buttonInstance) => {
    if (buttonInstance.isMine) {
      Object.assign(buttonInstance.element, { textContent: '💣' })
    }
  })
}
