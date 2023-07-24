import type { Button } from '../shared/button'

export const paginationDictionary = {
  true: (buttonInstance: Button): void => buttonInstance.setDisableStatus(true),
  false: (buttonInstance: Button): void => buttonInstance.setDisableStatus(false),
}
