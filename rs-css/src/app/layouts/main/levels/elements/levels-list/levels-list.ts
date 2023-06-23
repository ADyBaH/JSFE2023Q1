import { LevelsDataInterface } from '../../../../../modules/interface-for-levels'
import { levelsData } from '../../../../../../assets/data/levels-data.json'
import { BaseComponent } from '../../../../../../utils/base-component'
import { emitter } from '../../../../../services/event-emitter'
import './levels-list.scss'

export class LevelsList extends BaseComponent {
  private completedTask: string[]
  public levelsData: LevelsDataInterface = levelsData
  public arrayButtons: BaseComponent[]
  public resetButton: BaseComponent

  constructor(parent: HTMLElement, completedTask: string[]) {
    super({ attribute: { className: 'levels-list-block levels-list-block_hidden' }, parent })
    this.innerHTML = '<h2 class="levels-block__logo">Chosen level</h2>'
    this.completedTask = completedTask
    this.arrayButtons = this.createButtons()
    this.resetButton = new BaseComponent({
      tag: 'button',
      attribute: { className: 'levels-block__reset-button', textContent: 'Reset levels.' },
      parent: this.element,
    })
    this.arrayButtons.forEach((button) => button.setEventListener('click', (event: Event) => this.eventClick(event)))
    this.resetButton.setEventListener('click', () => this.resetLevels())
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
            textContent: `${element} ${this.levelsData[String(element)].nameTask}`,
          },
          parent: this.element,
        }),
    )
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
    this.arrayButtons.forEach((baseComponent) => baseComponent.removeClass('levels-block__button_completed'))
  }
}
