import { BaseComponent } from '../../utils/base-component'

export type MainStateType = {
  editorComponents: BaseComponent[]
  tableComponents: BaseComponent[]
  maximumLevels: number
  answer: string
  levelId: string
  mainTask: string
}
