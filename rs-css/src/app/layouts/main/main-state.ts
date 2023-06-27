import { LevelsDataInterface } from '../../models/interface-for-levels'
import { levelsData } from '../../../assets/data/levels-data.json'
import { MainStateType } from '../../types/main-state-type'
import { MaxMinLevelEnum } from '../../enum/max-min-level-enum'

const levelsDataConst: LevelsDataInterface = levelsData

export const mainState: MainStateType = {
  answer: levelsDataConst[`${MaxMinLevelEnum.min}`].answer,
  task: levelsDataConst[`${MaxMinLevelEnum.min}`].task,
  editorComponents: [],
  tableComponents: [],
  maximumLevels: MaxMinLevelEnum.max,
  levelId: `${MaxMinLevelEnum.min}`,
}
