export class GameState {
  constructor(objectState) {
    if (!GameState.instance) {
      Object.assign(this, objectState)
      GameState.instance = this
    }
  }

  get this() {
    return this
  }

  set this(props) {
    Object.assign(this, props)
  }
}
