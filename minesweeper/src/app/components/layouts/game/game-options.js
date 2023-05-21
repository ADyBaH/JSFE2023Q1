import { BaseComponent } from '../../../../utils/base-component'
import { createArrayWithDifferenceButtons } from '../../../../utils/create-array-with-difference-buttons'
import { InputForMine } from './input-for-flag'

export class GameOptions extends BaseComponent {
  constructor(parent, gameState) {
    super({ attr: { className: 'game__options' }, parent })
    this.gameState = gameState
    this.arrayWithDifferenceButtons = createArrayWithDifferenceButtons(this.element)
    this.labelForInput = new BaseComponent({
      tag: 'label',
      attr: {
        for: 'count-for-mine',
        className: 'label-for-input-mine',
        textContent: 'Count of mine: ',
      },
      parent: this.element,
    })
    this.inputForMine = new InputForMine(this.labelForInput.element, gameState)
  }
}
