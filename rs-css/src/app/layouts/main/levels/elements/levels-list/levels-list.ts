import { LevelsDataInterface } from '../../../../../models/levels-interface'
import { levelsData } from '../../../../../../assets/data/levels-data.json'
import { localStorageADyBaH } from '../../../../../services/local-storage'
import { BaseComponent } from '../../../../../../utils/base-component'
import { emitter } from '../../../../../services/event-emitter'
import './levels-list.scss'

export class LevelsList extends BaseComponent {
  private completedTask = localStorageADyBaH.completedTask
  private helpedTask = localStorageADyBaH.helpedTask
  public levelsData: LevelsDataInterface = levelsData
  public arrayButtons: BaseComponent[]
  public resetButton: BaseComponent

  constructor(parent: HTMLElement) {
    super({ attribute: { className: 'levels-list-block levels-list-block_hidden' }, parent })
    this.innerHTML = '<h2 class="levels-block__logo">Chosen level</h2>'
    this.arrayButtons = this.createButtons()
    this.resetButton = new BaseComponent({
      tag: 'button',
      attribute: { className: 'levels-block__reset-button', textContent: 'Reset levels.' },
      parent: this.element,
    })
    emitter.subscribe('setupWin', () => this.setupWin())
    emitter.subscribe('setupHelped', () => this.setupWin())
    this.arrayButtons.forEach((button) => button.setEventListener('click', (event: Event) => this.eventClick(event)))
    this.resetButton.setEventListener('click', () => this.resetLevels())
  }

  private createButtons(): BaseComponent[] {
    return Object.keys(this.levelsData).map((element) => {
      const buttonElement = new BaseComponent({
        tag: 'button',
        attribute: {
          className: 'levels-block__button',
          textContent: `${element} ${this.levelsData[String(element)].nameTask}`,
        },
        parent: this.element,
      })
      if (this.completedTask.includes(element)) {
        buttonElement.addClass('levels-block__button_completed')
      }
      if (this.helpedTask.includes(element)) {
        buttonElement.addClass('levels-block__button_helped')
      }
      return buttonElement
    })
  }

  private eventClick(event: Event): void {
    const { target } = event
    if (target && target instanceof HTMLElement) {
      const targetText: string | null = target.textContent
      if (targetText) {
        const numberTask = targetText.split(' ')[0]
        emitter.emit('setToLastTask', numberTask)
        emitter.emit('changeLevel', this.levelsData[numberTask])
      }
    }
  }

  public resetLevels(): void {
    emitter.emit('resetLevels')
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
