import { checkRandomNumbers } from './check-random-numbers'
import { getTupleRandomNumbers } from './get-tuple-random-numbers'

export function getRandomCell(matrix, excludeValueTuple) {
  let [randomFirstNumber, randomSecondNumber] = getTupleRandomNumbers(matrix.length)
  while (checkRandomNumbers(matrix, randomFirstNumber, randomSecondNumber, excludeValueTuple)) {
    ;[randomFirstNumber, randomSecondNumber] = getTupleRandomNumbers(matrix.length)
  }
  return matrix[randomFirstNumber][randomSecondNumber]
}
