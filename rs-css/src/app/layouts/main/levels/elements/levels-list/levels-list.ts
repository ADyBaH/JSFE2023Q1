import { levelListInnerHTML } from '../../../../../constants/level-list-constant'
import { LevelsDataInterface } from '../../../../../models/levels-interface'
import { levelsData } from '../../../../../../assets/data/levels-data.json'
import { localStorageADyBaH } from '../../../../../services/local-storage'
import { BaseComponent } from '../../../../../../utils/base-component'
import { LevelButtonElement } from './elements/level-button-element'
import { emitter } from '../../../../../services/event-emitter'
import { EmitterEnum } from '../../../../../enum/emitter-enum'
import './levels-list.scss'

export class LevelsList extends BaseComponent {
  private completedTask = localStorageADyBaH.completedTask
  private helpedTask = localStorageADyBaH.helpedTask
  public levelsData: LevelsDataInterface = levelsData
  public arrayButtons: BaseComponent[]
  public resetButton: BaseComponent

  constructor(parent: HTMLElement) {
    super({ attribute: { className: 'levels-list-block levels-list-block_hidden' }, parent })

    this.innerHTML = levelListInnerHTML

    this.arrayButtons = this.createButtons()

    this.resetButton = new BaseComponent({
      tag: 'button',
      attribute: { className: 'levels-block__reset-button', textContent: 'Reset levels.' },
      parent: this.element,
    })

    emitter.subscribe(EmitterEnum.SetupWin, () => this.setupWin())
    emitter.subscribe(EmitterEnum.SetupHelp, () => this.setupWin())

    this.arrayButtons.forEach((button) => button.setEventListener('click', (event: Event) => this.eventClick(event)))
    this.resetButton.setEventListener('click', () => this.resetLevels())
  }

  private createButtons(): BaseComponent[] {
    return Object.keys(this.levelsData).map(
      (element) =>
        new LevelButtonElement({
          parent: this.element,
          key: element,
          nameTask: this.levelsData[element].nameTask,
          isCompletedTask: this.completedTask.includes(element),
          isHelpedTask: this.helpedTask.includes(element),
        }),
    )
  }

  private eventClick({ target }: Event): void {
    if (target && target instanceof HTMLElement) {
      const targetText: string | null = target.textContent
      if (targetText) {
        const numberTask = targetText.split(' ')[0]
        emitter.emit(EmitterEnum.SetToLastTask, numberTask)
        emitter.emit(EmitterEnum.ChangeLevel, this.levelsData[numberTask])
      }
    }
  }

  public resetLevels(): void {
    emitter.emit(EmitterEnum.ResetLevels)
    this.arrayButtons.forEach((baseComponent) => baseComponent.setClassName('levels-block__button'))
  }

  private setupWin(): void {
    this.completedTask = localStorageADyBaH.completedTask
    this.helpedTask = localStorageADyBaH.helpedTask

    this.arrayButtons.forEach((baseComponent) => {
      const value = baseComponent.element.textContent?.split(' ')[0]

      if (value && this.completedTask.includes(value)) {
        baseComponent.addClass('levels-block__button_completed')
      }

      if (value && this.helpedTask.includes(value)) {
        baseComponent.addClass('levels-block__button_helped')
      }
    })
  }
}
