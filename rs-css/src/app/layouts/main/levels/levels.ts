import { BaseComponent } from '../../../components/base-component'
import { levelsData } from '../../../../assets/data/levels-data.json'
import { localStorageADyBaH } from '../../../services/local-storage'
import { LevelsHeader } from './levels-header'
import { LevelsList } from './levels-list'

export class Levels extends BaseComponent {
  public levelsData = levelsData
  private completedTask = localStorageADyBaH.completedTask

  public buttonToggleClose = new BaseComponent({
    tag: 'button',
    attribute: { className: 'levels-block__close-open-button' },
    parent: this.element,
  })

  private levelsHeader = new LevelsHeader(this.element, this.completedTask)
  private levelList = new LevelsList(this.element, this.completedTask)
  constructor(root: HTMLElement) {
    super({ attribute: { className: 'levels-block' }, parent: root })
    this.buttonToggleClose.setEventListener('click', () => this.toggleCloseLevels())
  }

  private toggleCloseLevels(): void {
    this.buttonToggleClose.toggle('levels-block__close-open-button_rotate')
    this.toggle('levels-block_hidden')
  }
}
