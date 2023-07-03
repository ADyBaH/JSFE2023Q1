import { LevelsDataInterface } from '../../models/levels-interface'
import { levelsData } from '../../../assets/data/levels-data.json'
import { MainStateType } from '../../types/main-state-type'
import { MaxMinLevelEnum } from '../../enum/max-min-level-enum'

const levelsDataConst: LevelsDataInterface = levelsData

export const mainState: MainStateType = {
  answer: levelsDataConst[`${MaxMinLevelEnum.Min}`].answer,
  mainTask: levelsDataConst[`${MaxMinLevelEnum.Min}`].task,
  editorComponents: [],
  tableComponents: [],
  maximumLevels: MaxMinLevelEnum.Max,
  levelId: `${MaxMinLevelEnum.Min}`,
}
