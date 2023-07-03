import { LevelsDataInterface } from '../../models/levels-interface'
import { levelsData } from '../../../assets/data/levels-data.json'
import { localStorageADyBaH } from '../../services/local-storage'
import { LevelInterface } from '../../models/level-interface'
import { BaseComponent } from '../../../utils/base-component'
import { MainStateType } from '../../types/main-state-type'
import { EditorElement } from './elements/editor-element'
import { TableElement } from './elements/table-element'
import { emitter } from '../../services/event-emitter'
import { EmitterEnum } from '../../enum/emitter-enum'
import { TableBlock } from './table/table-block'
import { EventBinder } from './event-binder'
import { Levels } from './levels/levels'
import { mainState } from './main-state'
import { Editor } from './editor/editor'
import { Modal } from './modal/modal'
import './main.scss'

export class Main extends BaseComponent {
  public modal: Modal = new Modal(this.element)
  public tableBlock: TableBlock
  public editor: Editor
  public levels: Levels
  public levelsData: LevelsDataInterface = levelsData
  public lastTask: string = localStorageADyBaH.lastTask
  private mainState: MainStateType = mainState

  constructor(root: HTMLElement) {
    super({ tag: 'main', attribute: { className: 'main' }, parent: root })

    this.tableBlock = new TableBlock(this.element, this.levelsData[this.lastTask])
    this.levels = new Levels(this.element)
    this.editor = new Editor(this.element, this.tableBlock.table.element)

    emitter.subscribe(EmitterEnum.ChangeLevel, (args: LevelInterface) => this.changeState(args))
    emitter.subscribe(EmitterEnum.ShakeEditor, () => this.shakeTable())
    emitter.emit(EmitterEnum.ChangeLevel, this.levelsData[this.lastTask])
  }

  // переиминовать деструктуризировать
  private changeState({ layout, answer, id, task }: LevelInterface): void {
    this.mainState.editorComponents = []
    this.mainState.tableComponents = []

    layout.forEach(({ tag, attribute, animated, innerHTML, child }) => {
      const elements = new EventBinder(
        new TableElement(tag, attribute, animated),
        new EditorElement(innerHTML),
        innerHTML,
      )

      this.mainState.editorComponents.push(elements.editorElement)
      this.mainState.tableComponents.push(elements.tableElement)

      if (child) {
        const elementsChild = new EventBinder(
          new TableElement(child.tag, child.attribute, child.animated, elements.tableElement.element),
          new EditorElement(child.innerHTML, elements.editorElement.element),
          child.innerHTML,
        )

        elementsChild.tableElement.addClass('custom-child-element')
        elementsChild.tableElement.removeClass('custom-element')
        elementsChild.editorElement.element.insertAdjacentHTML(
          'afterend',
          `<span class="hljs-tag">&lt;/<span class="hljs-name">${tag}</span>&gt;</span>`,
        )
      }
    })

    this.changeMainState(answer, id, task)
  }
  private changeMainState(answer: string, id: string, task: string): void {
    mainState.answer = answer
    mainState.levelId = id
    mainState.mainTask = task
    emitter.emit(EmitterEnum.ChangeElementsOnState, mainState)
  }
  public shakeTable(): void {
    this.editor.addClass('shake')
    setInterval(() => this.editor.removeClass('shake'), 2000)
  }
}
