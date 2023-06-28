export interface LevelsDataInterface {
  [key: string]: LevelInterface
}

export interface LevelInterface {
  id: string
  task: string
  nameTask: string
  layout: NodeSetup[]
  answer: string
  description: string
}

export interface NodeSetup {
  innerHTML: string
  tag: string
  attribute: {
    className?: string
    id?: string
  }
  animated?: boolean
  child: NodeSetup | null
}
