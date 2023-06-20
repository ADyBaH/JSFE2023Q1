import { MainStateType } from '../../types/main-state-type'
import { levelsData } from '../../../assets/data/levels-data.json'
import { LevelsEnum } from '../../shared/enums/levels-enums'
import { LevelsDataInterface } from '../../modules/interface-for-levels'

const levelsDataConst: LevelsDataInterface = levelsData

export const mainState: MainStateType = {
  levelId: '1',
  task: levelsDataConst[LevelsEnum[0]].task,
  tableComponents: [],
  editorComponents: [],
  answers: levelsDataConst[LevelsEnum[0]].answers,
}
