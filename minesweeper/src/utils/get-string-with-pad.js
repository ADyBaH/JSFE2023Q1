export const getStringWithPad = (number, padDirection = 'start', padNumber = 3, PadValue = '0') =>
  padDirection === 'start' ? `${number}`.padStart(padNumber, PadValue) : `${number}`.padEnd(padNumber, PadValue)
