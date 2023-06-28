import hljs from 'highlight.js'
import { stringTemplateForInputBlock } from '../../../../../constants/css-editor-constant'
import { arrayLevelsNames } from '../../../../../constants/array-levels-names-constant'
import { LevelsDataInterface } from '../../../../../models/interface-for-levels'
import { levelsData } from '../../../../../../assets/data/levels-data.json'
import { BaseComponent } from '../../../../../../utils/base-component'
import { MainStateType } from '../../../../../types/main-state-type'
import { MaxMinLevelEnum } from '../../../../../enum/max-min-level-enum'
import { emitter } from '../../../../../services/event-emitter'
import { mainState } from '../../../main-state'
import './css-editor.scss'

export class CssEditor extends BaseComponent {
  private readonly levelsData: LevelsDataInterface = levelsData
  private answer: HTMLElement[] = []
  private mainState = mainState
  private tableElement
  private preElement = new BaseComponent({
    tag: 'pre',
    attribute: { className: 'css-editor__pre' },
    parent: this.element,
  })

  private codeElement = new BaseComponent({
    tag: 'code',
    attribute: { className: 'css-editor__code lang-css' },
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
    this.enterButton.setEventListener('click', () => this.checkInput())
    this.helpButton.setEventListener('click', () => this.writeAnswer())
    this.input.setEventListener('keyup', (event) => this.changeCodeValue(event))
    emitter.subscribe('changeElementsOnState', (args: MainStateType) => this.changeAnswer(args))
    emitter.subscribe('changeLevel', () => this.resetInput())
    hljs.highlightBlock(this.codeElement.element)
  }

  private changeCodeValue(event: KeyboardEvent | Event): void {
    const element = event.target
    if (element instanceof HTMLInputElement) {
      this.codeElement.innerText = element.value
      hljs.highlightBlock(this.codeElement.element)
    }
    if (event instanceof KeyboardEvent && event.code === 'Enter') {
      this.checkInput()
    }
  }

  private checkWin(findElements: Element[]): boolean {
    return this.answer.every((element) => findElements.includes(element)) && this.answer.length === findElements.length
  }

  private checkInput(): boolean {
    const value = this.input.inputValue.trim()
    if (value === '') {
      return false
    }
    if (arrayLevelsNames.includes(value)) {
      emitter.emit('changeLevel', this.levelsData[value])
    }
    const findElements = Array.from(this.tableElement.querySelectorAll(value))
    if (this.checkWin(findElements)) {
      emitter.emit('setupWin', this.mainState.levelId)
      if (+this.mainState.levelId + 1 < MaxMinLevelEnum.max) {
        emitter.emit('changeLevel', this.levelsData[`${+this.mainState.levelId + 1}`])
      }
      if (+this.mainState.levelId === MaxMinLevelEnum.max) {
        emitter.emit('showModal')
      }
    }
    return true
  }

  private changeAnswer(args: MainStateType): void {
    this.answer = Array.from(this.tableElement.querySelectorAll(args.answer))
  }

  private writeAnswer(): void {
    this.resetInput()

    this.mainState.answer.split('').forEach((letter, index) => {
      setTimeout(() => {
        this.input.inputValue += letter
        this.codeElement.innerText += letter
        hljs.highlightBlock(this.codeElement.element)
      }, index * 100)
    })
    emitter.emit('setupHelp', mainState.levelId)
  }

  private resetInput(): void {
    this.input.inputValue = ''
    this.codeElement.innerText = ''
  }
}
