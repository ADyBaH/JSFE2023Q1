import { LevelsDataInterface } from '../../../../../models/interface-for-levels'
import { LevelsBurgerBlock } from './element/levels-burger-button/levels-burger-button'
import { levelsData } from '../../../../../../assets/data/levels-data.json'
import { localStorageADyBaH } from '../../../../../services/local-storage'
import { MaxMinLevelEnum } from '../../../../../enum/max-min-level-enum'
import { BaseComponent } from '../../../../../../utils/base-component'
import { MainStateType } from '../../../../../types/main-state-type'
import { emitter } from '../../../../../services/event-emitter'
import { mainState } from '../../../main-state'
import './levels-header.scss'
import { levelsHeaderDictionary } from '../../../../../dictionary/levels-header-dictionary'

export class LevelsHeader extends BaseComponent {
  private mainState: MainStateType = mainState
  private completedTask = localStorageADyBaH.completedTask
  private helpedTask = localStorageADyBaH.helpedTask
  private logo: BaseComponent
  private prevLevelButton: BaseComponent
  private nextLevelButton: BaseComponent
  private burgerBlock: LevelsBurgerBlock
  private levelListComponent: BaseComponent
  private levelsData: LevelsDataInterface = levelsData
  private progressBar: BaseComponent

  constructor(parent: HTMLElement, levelListComponent: BaseComponent, progressBar: BaseComponent) {
    super({ attribute: { className: 'header-levels-block' }, parent })
    this.levelListComponent = levelListComponent
    this.logo = new BaseComponent({
      tag: 'h2',
      attribute: { className: 'header-levels-block__logo' },
      parent: this.element,
    })
    this.prevLevelButton = new BaseComponent({
      tag: 'button',
      attribute: { className: 'header-levels-block__prev-button' },
      parent: this.element,
    })
    this.nextLevelButton = new BaseComponent({
      tag: 'button',
      attribute: { className: 'header-levels-block__next-button' },
      parent: this.element,
    })
    this.progressBar = progressBar
    this.burgerBlock = new LevelsBurgerBlock(this.element)
    this.burgerBlock.setEventListener('click', () => this.toggleBurgerRotate())
    this.prevLevelButton.setEventListener('click', () => this.decrementsLevels())
    this.nextLevelButton.setEventListener('click', () => this.incrementLevels())
    emitter.subscribe('changeElementsOnState', () => this.changeLogo())
    emitter.subscribe('resetLevels', () => this.resetCompletedLogo())
    emitter.subscribe('setupWin', () => this.updateCompletedTask())
    emitter.subscribe('setupHelp', () => this.updateHelpedTask())
    this.changeLogo()
  }

  public changeLogo(): void {
    this.changeProgressBar()
    this.logo.innerText = `Levels ${this.mainState.levelId} of ${MaxMinLevelEnum.max}`

    levelsHeaderDictionary.completedTask[`${this.completedTask.includes(this.mainState.levelId)}`](
      this.logo,
      'header-levels-block__logo_completed',
    )
    levelsHeaderDictionary.helpedTask[`${this.helpedTask.includes(this.mainState.levelId)}`](
      this.logo,
      'header-levels-block__logo_helped',
    )
  }

  private toggleBurgerRotate(): void {
    this.burgerBlock.toggle('header-levels-block__burger-block_rotate')
    this.levelListComponent.toggle('levels-list-block_hidden')
  }

  public incrementLevels(): boolean {
    const value = +this.mainState.levelId + 1
    if (value > MaxMinLevelEnum.max) {
      return false
    }
    this.emitChangeLevel(`${value}`)
    emitter.emit('setToLastTask', `${value}`)
    this.changeProgressBar()
    return true
  }

  public decrementsLevels(): boolean {
    const value = +this.mainState.levelId - 1
    if (value < MaxMinLevelEnum.min) {
      return false
    }
    this.emitChangeLevel(`${value}`)
    emitter.emit('setToLastTask', `${value}`)
    this.changeProgressBar()
    return true
  }

  private emitChangeLevel(key: string): void {
    emitter.emit('changeLevel', this.levelsData[key])
  }

  private changeProgressBar(): void {
    Object.assign(this.progressBar.element, { value: `${this.mainState.levelId}` })
  }

  private resetCompletedLogo(): void {
    this.completedTask = localStorageADyBaH.completedTask
    this.helpedTask = localStorageADyBaH.helpedTask
    this.logo.removeClass('header-levels-block__logo_completed')
    this.logo.removeClass('header-levels-block__logo_helped')
  }

  private updateCompletedTask(): void {
    this.logo.addClass('header-levels-block__logo_completed')
    this.completedTask = localStorageADyBaH.completedTask
  }

  private updateHelpedTask(): void {
    this.logo.addClass('header-levels-block__logo_helped')
    this.helpedTask = localStorageADyBaH.helpedTask
  }
}
