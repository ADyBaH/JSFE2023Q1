import { BaseComponent } from '../utils/base-component'
import { Button } from './button'

export class Playground extends BaseComponent {
  constructor(gameElement) {
    super({ attr: { className: 'game__playground' }, parent: gameElement })
    this.playground = this.generateMatrix(25)
    console.log(this.playground)
  }

  generateMatrix(numberOfButton) {
    return Array.from({ length: numberOfButton }, () =>
      Array.from({ length: numberOfButton }, () => new Button({ field: this.element })),
    )
  }
}
