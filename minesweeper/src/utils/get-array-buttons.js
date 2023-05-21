import { getMatrixOfNumbers } from './get-matrix-of-numbers'
import { getElementFromMatrix } from './get-element-from-matrix'

export function getArrayButtons(matrix, [fistIndex, secondIndex]) {
  return getMatrixOfNumbers([fistIndex, secondIndex]).reduce((array, [firstNumber, secondNumber]) => {
    const element = getElementFromMatrix(matrix, firstNumber, secondNumber)
    if (element) {
      array.push(element)
    }
    return array
  }, [])
}
