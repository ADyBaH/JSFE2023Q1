import { BaseComponent } from '../../../../../../../utils/base-component'
import { LevelButtonType } from '../../../../../../types/level-button-type'

export class LevelButtonElement extends BaseComponent {
  constructor({ parent, key, nameTask, isCompletedTask, isHelpedTask }: LevelButtonType) {
    super({
      tag: 'button',
      attribute: {
        className: 'levels-block__button',
        textContent: `${key} ${nameTask}`,
      },
      parent,
    })

    if (isCompletedTask) {
      this.addClass('levels-block__button_completed')
    }

    if (isHelpedTask) {
      this.addClass('levels-block__button_helped')
    }
  }
}
