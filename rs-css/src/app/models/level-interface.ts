import { LevelNodeSetting } from './level-node-setting-interface'

export interface LevelInterface {
  id: string
  task: string
  nameTask: string
  layout: LevelNodeSetting[]
  answer: string
  description: string
}
