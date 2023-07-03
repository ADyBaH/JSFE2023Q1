import { MaxMinLevelEnum } from '../enum/max-min-level-enum'

export const arrayLevelsNames: string[] = Array.from({ length: MaxMinLevelEnum.Max }, (_, index) => `${index + 1}`)
