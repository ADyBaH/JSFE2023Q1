import { changeClassNameDictionary } from '../../../../../dictionary/change-class-name-dictionary'
import { LevelsBurgerBlock } from './element/levels-burger-button/levels-burger-button'
import { LevelsDataInterface } from '../../../../../models/levels-interface'
import { levelsData } from '../../../../../../assets/data/levels-data.json'
import { localStorageADyBaH } from '../../../../../services/local-storage'
import { MaxMinLevelEnum } from '../../../../../enum/max-min-level-enum'
import { BaseComponent } from '../../../../../../utils/base-component'
import { MainStateType } from '../../../../../types/main-state-type'
import { emitter } from '../../../../../services/event-emitter'
import { EmitterEnum } from '../../../../../enum/emitter-enum'
import { mainState } from '../../../main-state'
import './levels-header.scss'
import { EventEnum } from '../../../../../enum/event-enum'

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

    this.prevLevelButton.setEventListener(EventEnum.Click, () => this.decrementsLevels())
    this.nextLevelButton.setEventListener(EventEnum.Click, () => this.incrementLevels())
    this.burgerBlock.setEventListener(EventEnum.Click, () => this.toggleBurgerRotate())

    emitter.subscribe(EmitterEnum.ChangeElementsOnState, () => this.changeLogo())
    emitter.subscribe(EmitterEnum.ResetLevels, () => this.resetCompletedLogo())
    emitter.subscribe(EmitterEnum.SetupWin, () => this.updateCompletedTask())
    emitter.subscribe(EmitterEnum.SetupHelp, () => this.updateHelpedTask())

    this.changeLogo()
  }

  public changeLogo(): void {
    this.changeProgressBar()

    this.logo.innerText = `Levels ${this.mainState.levelId} of ${MaxMinLevelEnum.Max}`

    changeClassNameDictionary[`${this.completedTask.includes(this.mainState.levelId)}`](
      this.logo,
      'header-levels-block__logo_completed',
    )

    changeClassNameDictionary[`${this.helpedTask.includes(this.mainState.levelId)}`](
      this.logo,
      'header-levels-block__logo_helped',
    )
  }

  private toggleBurgerRotate(): void {
    this.burgerBlock.toggle('header-levels-block__burger-block_rotate')
    this.levelListComponent.toggle('levels-list-block_hidden')
  }

  private changeProgressBar(): void {
    Object.assign(this.progressBar.element, { value: `${this.mainState.levelId}` })
  }

  private setupChange(value: string): void {
    emitter.emit(EmitterEnum.ChangeLevel, this.levelsData[value])
    emitter.emit(EmitterEnum.SetToLastTask, value)

    this.changeProgressBar()
  }

  public incrementLevels(): void {
    const value = +this.mainState.levelId + 1

    if (value > MaxMinLevelEnum.Max) {
      return
    }

    this.setupChange(`${value}`)
  }

  public decrementsLevels(): void {
    const value = +this.mainState.levelId - 1

    if (value < MaxMinLevelEnum.Min) {
      return
    }

    this.setupChange(`${value}`)
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
