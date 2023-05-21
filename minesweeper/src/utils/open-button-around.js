import { getArrayButtons } from './get-array-buttons'
import { setOnButtonAndAddValueToState } from './set-on-button-and-add-value-to-state'

export function openButtonAround(matrix, [fistIndex, secondIndex], gameState) {
  getArrayButtons(matrix, [fistIndex, secondIndex]).forEach((buttonInstance) => {
    if (buttonInstance.isOpen) {
      return
    }
    if (buttonInstance.numberOfMineAround) {
      setOnButtonAndAddValueToState(buttonInstance, gameState, buttonInstance.numberOfMineAround, 1)
      return
    }
    setOnButtonAndAddValueToState(buttonInstance, gameState, '', 1)
    openButtonAround(matrix, buttonInstance.matrixIndex, gameState)
  })
}
