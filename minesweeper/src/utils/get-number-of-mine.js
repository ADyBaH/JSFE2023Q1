import { getArrayButtons } from './get-array-buttons'

export function getNumberOfMine(matrix, [fistIndex, secondIndex]) {
  return getArrayButtons(matrix, [fistIndex, secondIndex]).reduce(
    (accumulator, buttonInstance) => +buttonInstance.isMine + accumulator,
    0,
  )
}
