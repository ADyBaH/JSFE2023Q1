import { BaseComponent } from '../../components/base-component'
import { Editor } from './editor/editor'
import { Levels } from './levels/levels'
import { TableBlock } from './table/table-block'
import { levelsData } from '../../../assets/data/levels-data.json'
import { TableAndEditorElement } from './table-and-editor-element'
import { mainState } from './main-state'
import { LevelInterface, LevelsDataInterface } from '../../modules/interface-for-levels'
import { emitter } from '../../services/event-emitter'
import { localStorageADyBaH } from '../../services/local-storage'
import { MainStateType } from '../../types/main-state-type'

export class Main extends BaseComponent {
  public table: TableBlock
  public editor: Editor
  public levels = new Levels(this.element)
  public levelsData: LevelsDataInterface = levelsData
  public lastTask: string = localStorageADyBaH.lastTask
  private mainState: MainStateType = mainState

  constructor(root: HTMLElement) {
    super({ tag: 'main', attribute: { className: 'main' }, parent: root })
    this.table = new TableBlock(this.element, this.levelsData[this.lastTask])
    this.editor = new Editor(this.element)
    this.changeState(this.levelsData[this.lastTask])
    emitter.subscribe('changeLevel', (args: LevelInterface) => this.changeState(args))
  }

  private changeState(template: LevelInterface): void {
    this.mainState.editorComponents = []
    this.mainState.tableComponents = []
    template.layout.forEach((setup) => {
      const elements = new TableAndEditorElement(setup)
      this.mainState.editorComponents.push(elements.editorElement)
      this.mainState.tableComponents.push(elements.tableElement)
    })

    mainState.task = template.task
    emitter.emit('changeElementsOnState', mainState)
  }
}
