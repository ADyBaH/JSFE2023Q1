import { LevelsDescription } from './elements/levels-description/levels-description'
import { levelsData } from '../../../../assets/data/levels-data.json'
import { LevelsHeader } from './elements/levels-header/levels-header'
import { localStorageADyBaH } from '../../../services/local-storage'
import { BaseComponent } from '../../../../utils/base-component'
import { LevelsList } from './elements/levels-list/levels-list'
import './levels.scss'

export class Levels extends BaseComponent {
  public levelsData = levelsData
  private completedTask = localStorageADyBaH.completedTask
  private levelList = new LevelsList(this.element, this.completedTask)
  public progressBar: BaseComponent
  private levelsHeader: LevelsHeader
  private description: LevelsDescription
  constructor(root: HTMLElement) {
    super({ attribute: { className: 'levels-block' }, parent: root })
    this.progressBar = new BaseComponent({
      tag: 'progress',
      attribute: { className: 'levels-block__progress-bar', value: '1', max: '10' },
    })
    this.levelsHeader = new LevelsHeader(this.element, this.completedTask, this.levelList, this.progressBar)
    this.element.append(this.progressBar.element)
    this.description = new LevelsDescription(this.element)
    this.progressBar.element.insertAdjacentHTML(
      'afterend',
      '<h3 class="levels-block__description-text">Description:</h3>',
    )
  }
}
