import { BaseComponent } from '../../../utils/base-component'
import { Editor } from './main/editor/editor'
import { Levels } from './main/levels'
import { TableBlock } from './main/table-block'

export class Main extends BaseComponent {
  public table = new TableBlock(this.element)
  public editor = new Editor(this.element)
  public levels = new Levels(this.element)

  constructor(root: HTMLElement) {
    super({ tag: 'main', attribute: { className: 'main' }, parent: root })
  }
}
