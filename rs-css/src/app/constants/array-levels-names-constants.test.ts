import { arrayLevelsNames } from './array-levels-names-constant'

test('Array levels names test', () => {
  const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  expect(arrayLevelsNames).toEqual(data)
})
