import { BaseComponent } from '../../../components/base-component'
import { emitter } from '../../../services/event-emitter'
import { levelsData } from '../../../../assets/data/levels-data.json'
import { LevelsDataInterface } from '../../../modules/interface-for-levels'
import { localStorageADyBaH } from '../../../services/local-storage'
import { LocalStorageEnum } from '../../../shared/enums/local-storage-enum'

export class LevelsList extends BaseComponent {
  private completedTask: string[]
  public levelsData: LevelsDataInterface = levelsData
  public arrayButtons: BaseComponent[]

  constructor(parent: HTMLElement, completedTask: string[]) {
    super({ attribute: { className: 'levels-list-block' }, parent })
    this.completedTask = completedTask
    this.arrayButtons = this.createButtons()
    this.arrayButtons.forEach((button) => button.setEventListener('click', (event: Event) => this.eventClick(event)))
  }

  private createButtons(): BaseComponent[] {
    return Object.keys(this.levelsData).map(
      (element) =>
        new BaseComponent({
          tag: 'button',
          attribute: {
            className: `levels-block__button ${
              this.completedTask.includes(element) ? ' levels-block__button_completed' : ''
            }`,
            textContent: `${element}`,
          },
          parent: this.element,
        }),
    )
  }

  private eventClick(event: Event): void {
    const { target } = event
    if (target && target instanceof HTMLElement) {
      const targetText: string = target.textContent ?? ''
      localStorageADyBaH.setToLocalStorage(LocalStorageEnum.lastTask, targetText)
      emitter.emit('changeLevel', this.levelsData[targetText])
    }
  }
}
