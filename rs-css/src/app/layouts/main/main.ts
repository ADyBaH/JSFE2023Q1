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
    emitter.subscribe(EmitterEnum.changeLevel, (args: LevelInterface) => this.changeState(args))
    emitter.subscribe('shakeEditor', () => this.shakeTable())
    emitter.emit(EmitterEnum.changeLevel, this.levelsData[this.lastTask])
  }

  private changeState(template: LevelInterface): void {
    this.mainState.editorComponents = []
    this.mainState.tableComponents = []
    template.layout.forEach((setup) => {
      const elements = new EventBinder(new TableElement(setup), new EditorElement(setup))
      this.mainState.editorComponents.push(elements.editorElement)
      this.mainState.tableComponents.push(elements.tableElement)
      if (setup.child) {
        const elementsChild = new EventBinder(
          new TableElement(setup.child, elements.tableElement.element),
          new EditorElement(setup.child, elements.editorElement.element),
        )
        elementsChild.tableElement.addClass('custom-child-element')
        elementsChild.tableElement.removeClass('custom-element')
        elementsChild.editorElement.element.insertAdjacentHTML(
          'afterend',
          `<span class="hljs-tag">&lt;/<span class="hljs-name">${setup.tag}</span>&gt;</span>`,
        )
      }
    })
    mainState.answer = template.answer
    mainState.levelId = template.id
    mainState.mainTask = template.task
    emitter.emit(EmitterEnum.changeElementsOnState, mainState)
  }

  public shakeTable(): void {
    this.editor.addClass('shake')
    setInterval(() => this.editor.removeClass('shake'), 2000)
  }
}
