import { BaseComponent } from '../../../../utils/base-component'

export class InputForMine extends BaseComponent {
  constructor(parent, gameState) {
    super({
      tag: 'input',
      attr: {
        name: 'count-for-mine',
        className: 'number-of-mine',
        value: gameState.countOfMine,
        type: 'number',
        max: gameState.maximumMine,
        min: gameState.minimumMine,
      },
      events: [
        {
          name: 'change',
          callback: (event) => {
            if (+event.target.value > 99) {
              this.gameState.countOfMine = 99
              return
            }
            if (+event.target.value < 10) {
              this.gameState.countOfMine = 10
              return
            }

            this.gameState.countOfMine = +event.target.value
          },
        },
      ],
      parent,
    })
    this.gameState = gameState
  }
}
