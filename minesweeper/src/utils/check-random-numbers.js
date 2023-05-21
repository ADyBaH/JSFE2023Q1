export function checkRandomNumbers(
  matrix,
  randomFirstNumber,
  randomSecondNumber,
  [excludeFirstValue, excludeSecondValue],
) {
  return randomFirstNumber === excludeFirstValue && randomSecondNumber === excludeSecondValue
    ? true
    : matrix[randomFirstNumber][randomSecondNumber].isMine
}
