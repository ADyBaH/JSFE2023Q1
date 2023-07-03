import { LevelInterface } from '../../../../../models/level-interface'
import { BaseComponent } from '../../../../../../utils/base-component'
import { emitter } from '../../../../../services/event-emitter'
import { EmitterEnum } from '../../../../../enum/emitter-enum'
import { EventEnum } from '../../../../../enum/event-enum'
import './levels-description.scss'

export class LevelsDescription extends BaseComponent {
  public buttonToggleClose = new BaseComponent({
    tag: 'button',
    attribute: { className: 'levels-block__close-open-button levels-block__close-open-button_rotate' },
    parent: this.element,
  })

  private descriptionBlock = new BaseComponent({
    attribute: { className: 'levels-block__description-block' },
    parent: this.element,
  })

  constructor(parent: HTMLElement) {
    super({ attribute: { className: 'levels-block__description levels-block__description_hidden' }, parent })

    this.buttonToggleClose.setEventListener(EventEnum.Click, () => this.toggleCloseDescription())

    emitter.subscribe(EmitterEnum.ChangeLevel, (args: LevelInterface) => this.changeDescription(args))
  }

  private toggleCloseDescription(): void {
    this.buttonToggleClose.toggle('levels-block__close-open-button_rotate')
    this.toggle('levels-block__description_hidden')
  }

  public changeDescription({ description }: LevelInterface): void {
    this.descriptionBlock.innerHTML = description
  }
}
