import hljs from 'highlight.js'
import {
  answerDebounceTime,
  stringTemplateForInputBlock,
  timeAnimationSlide,
} from '../../../../../constants/css-editor-constant'
import { arrayLevelsNames } from '../../../../../constants/array-levels-names-constant'
import { shakeElementDictionary } from './dictionary/shake-element-dictionary'
import { LevelsDataInterface } from '../../../../../models/levels-interface'
import { levelsData } from '../../../../../../assets/data/levels-data.json'
import { MaxMinLevelEnum } from '../../../../../enum/max-min-level-enum'
import { BaseComponent } from '../../../../../../utils/base-component'
import { MainStateType } from '../../../../../types/main-state-type'
import { emitter } from '../../../../../services/event-emitter'
import { EmitterEnum } from '../../../../../enum/emitter-enum'
import { mainState } from '../../../main-state'
import './css-editor.scss'

export class CssEditor extends BaseComponent {
  private readonly levelsData: LevelsDataInterface = levelsData
  private arrayElementsForAnswer: HTMLElement[] = []
  private mainState = mainState
  private tableElement

  private preElement = new BaseComponent({
    tag: 'pre',
    attribute: { className: 'css-editor__pre' },
    parent: this.element,
  })

  private codeElement = new BaseComponent({
    tag: 'code',
    attribute: { className: 'css-editor__code lang-css animated-background-color' },
    parent: this.preElement.element,
  })

  private input = new BaseComponent({
    tag: 'input',
    attribute: { className: 'css-editor__input', placeholder: 'Type in a CSS selector' },
    parent: this.element,
  })

  private inputBlock = new BaseComponent({
    attribute: { className: 'css-editor__button-block' },
    parent: this.element,
  })

  public enterButton = new BaseComponent({
    tag: 'button',
    attribute: { textContent: 'Enter', className: 'css-editor__enter-button' },
    parent: this.inputBlock.element,
  })

  public helpButton = new BaseComponent({
    tag: 'button',
    attribute: { textContent: 'Help', className: 'css-editor__help-button' },
    parent: this.inputBlock.element,
  })

  constructor(root: HTMLElement, tableElement: HTMLElement) {
    super({ attribute: { className: 'css-editor' }, parent: root })

    this.tableElement = tableElement

    this.inputBlock.element.insertAdjacentHTML('afterend', stringTemplateForInputBlock)

    this.input.setEventListener('focus', () => this.codeElement.removeClass('animated-background-color'))
    this.input.setEventListener('blur', () => this.codeElement.addClass('animated-background-color'))
    this.enterButton.setEventListener('click', () => this.checkInput())
    this.helpButton.setEventListener('click', () => this.writeAnswer())
    this.input.setEventListener('keyup', (event: Event) => this.changeCodeValue(event))

    emitter.subscribe(EmitterEnum.ChangeElementsOnState, (args: MainStateType) => this.changeAnswer(args))
    emitter.subscribe(EmitterEnum.ChangeLevel, () => this.resetInput())

    hljs.highlightBlock(this.codeElement.element)
  }

  private changeCodeValue(event: Event): void {
    if (event instanceof KeyboardEvent) {
      const { target, code } = event

      if (target instanceof HTMLInputElement) {
        this.codeElement.innerText = target.value
        hljs.highlightBlock(this.codeElement.element)
      }

      if (code === 'Enter') {
        this.checkInput()
      }
    }
  }

  private isWin(findElements: Element[]): boolean {
    return (
      this.arrayElementsForAnswer.every((element) => findElements.includes(element)) &&
      this.arrayElementsForAnswer.length === findElements.length
    )
  }

  private findElements(request: string): Element[] {
    let findElements: Element[]

    try {
      findElements = Array.from(this.tableElement.querySelectorAll(request))
    } catch {
      findElements = []
    }

    return findElements
  }

  private changeLevel(isWin: boolean, arrayElements: Element[]): void {
    if (!isWin) {
      return
    }

    emitter.emit(EmitterEnum.SetupWin, this.mainState.levelId)

    const isLowerMaxLvl = +this.mainState.levelId + 1 <= MaxMinLevelEnum.Max
    const isLastLevel = +this.mainState.levelId === MaxMinLevelEnum.Max

    if (isLowerMaxLvl) {
      arrayElements.forEach((elements) => elements.classList.add('slide-out'))

      setTimeout((): void => {
        emitter.emit(EmitterEnum.ChangeLevel, this.levelsData[`${+this.mainState.levelId + 1}`])
        emitter.emit(EmitterEnum.SetToLastTask, this.mainState.levelId)
      }, timeAnimationSlide)
    }

    if (isLastLevel) {
      emitter.emit(EmitterEnum.ShowModal)
    }
  }

  private setShakeClassName(isWin: boolean, isNotEmptyArray: boolean, arrayElements: Element[]): void {
    if (isWin) {
      return
    }

    shakeElementDictionary[`${isNotEmptyArray}`](arrayElements)
  }

  private checkInput(): void {
    const value = this.input.inputValue

    if (arrayLevelsNames.includes(value)) {
      emitter.emit(EmitterEnum.ChangeLevel, this.levelsData[value])
    }

    const arrayElements: Element[] = this.findElements(value)

    const isWin = this.isWin(arrayElements)

    this.changeLevel(isWin, arrayElements)

    this.setShakeClassName(isWin, !!arrayElements.length, arrayElements)
  }

  private changeAnswer({ answer }: MainStateType): void {
    this.arrayElementsForAnswer = Array.from(this.tableElement.querySelectorAll(answer))
  }

  private writeAnswer(): void {
    this.resetInput()

    this.mainState.answer.split('').forEach((letter, index) => {
      setTimeout(() => {
        this.input.inputValue += letter
        this.codeElement.innerText += letter
        hljs.highlightBlock(this.codeElement.element)
      }, index * answerDebounceTime)
    })

    emitter.emit(EmitterEnum.SetupHelp, mainState.levelId)
  }

  private resetInput(): void {
    this.input.inputValue = ''
    this.codeElement.innerText = ''
  }
}
