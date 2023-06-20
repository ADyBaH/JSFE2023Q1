import { MainStateType } from '../../../types/main-state-type'
import { BaseComponent } from '../../../components/base-component'
import { mainState } from '../main-state'

export class LevelsHeader extends BaseComponent {
  private mainState: MainStateType = mainState
  private completedTask: string[]
  private logo: BaseComponent
  private prevLevelButton: BaseComponent
  private nextLevelButton: BaseComponent
  private burgerButton: BaseComponent

  constructor(parent: HTMLElement, completedTask: string[]) {
    super({ attribute: { className: 'header-levels-block' }, parent })
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

    this.burgerButton = new BaseComponent({
      attribute: { className: 'header-levels-block__burger-button' },
      parent: this.element,
    })
    this.completedTask = completedTask
    this.changeLogo()
  }

  public changeLogo(): void {
    this.logo.innerText = `Levels ${this.mainState.levelId} of 10`
  }
}
