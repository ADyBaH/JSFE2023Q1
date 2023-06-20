import { BaseComponent } from '../components/base-component'

export type MainStateType = {
  levelId: string
  task: string
  tableComponents: BaseComponent[]
  editorComponents: BaseComponent[]
  answers: string[]
}
