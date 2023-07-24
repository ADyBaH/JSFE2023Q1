import type { Button } from '../shared/button'

export const paginationDictionary = {
  true: (buttonInstance: Button): void => buttonInstance.disableButton(),
  false: (buttonInstance: Button): void => buttonInstance.turnOnButton(),
}
