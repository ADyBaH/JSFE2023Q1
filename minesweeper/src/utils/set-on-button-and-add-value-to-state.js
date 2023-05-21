import { addValueToNumberOfOpenCeil } from './add-value-to-number-of-open-ceil'
import { colors } from './dictionary-colors'
import { setOnButton } from './set-to-button'

export function setOnButtonAndAddValueToState(buttonInstance, gameState, textForButton, numberForState) {
  buttonInstance.element.classList.add('button_activeButton')
  buttonInstance.element.classList.add(colors[buttonInstance.numberOfMineAround])
  addValueToNumberOfOpenCeil(gameState, numberForState)
  setOnButton(buttonInstance, textForButton)
}
