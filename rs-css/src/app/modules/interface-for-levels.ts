export interface LevelsDataInterface {
  [key: string]: LevelInterface
}

export interface LevelInterface {
  id: string
  task: string
  layout: NodeSetup[]
  answers: string[]
}

export interface NodeSetup {
  attribute: Record<string, string>
  child: NodeSetup | null
}
