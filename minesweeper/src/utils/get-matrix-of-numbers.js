export function getMatrixOfNumbers([fistIndex, secondIndex]) {
  return [
    [fistIndex - 1, secondIndex - 1],
    [fistIndex - 1, secondIndex],
    [fistIndex - 1, secondIndex + 1],
    [fistIndex, secondIndex - 1],
    [fistIndex, secondIndex + 1],
    [fistIndex + 1, secondIndex - 1],
    [fistIndex + 1, secondIndex],
    [fistIndex + 1, secondIndex + 1],
  ]
}
