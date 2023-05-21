import { colors } from './dictionary-colors'

export function setLeftClickOnButton(buttonInstance) {
  buttonInstance.element.classList.add('button_activeButton')
  buttonInstance.element.classList.add(colors[buttonInstance.numberOfMineAround])

  buttonInstance.setStateButton({
    state: { isOpen: true },
    text: { textContent: buttonInstance.numberOfMineAround ? buttonInstance.numberOfMineAround : '' },
  })
}
