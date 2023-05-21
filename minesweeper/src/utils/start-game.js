export function startGame(state, header, options) {
  Object.assign(options.element, { className: 'game__options game__options_hide' })
  Object.assign(state, { isStart: true })
  header.timer.startTimer()
}
