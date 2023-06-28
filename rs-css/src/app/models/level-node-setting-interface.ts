export interface LevelNodeSetting {
  innerHTML: string
  tag: string
  attribute: {
    className?: string
    id?: string
  }
  animated?: boolean
  child: LevelNodeSetting | null
}
