import { setToLocalStorage } from './set-to-localstorage'

export function setWin(state, header, modal, options, soundWins, arrayButtons) {
  Object.assign(options.element, { className: 'game__options game__options_hide' })
  Object.assign(modal.text.element, {
    textContent: `Hooray! You found all mines in ${state.timer} seconds and ${state.countOfMove} moves!`,
    className: 'game__modal_logo logo_win',
  })
  Object.assign(modal.element, { className: 'game__modal' })
  Object.assign(header.buttonNewGame.element, { className: 'button-new-game button-new-game-win' })
  setToLocalStorage(`Win: difficult: ${state.difficult}, count of mine: ${state.countOfMine}, seconds: ${state.timer}`)
  if (state.isSound) {
    soundWins.play()
  }
  header.timer.stopTimer()
  arrayButtons.forEach((buttonInstance) => {
    if (buttonInstance.isMine) {
      Object.assign(buttonInstance.element, { textContent: '💣' })
    }
  })
}
