import { BaseComponent } from '../../../../utils/base-component'
import { Editor } from './editor/editor'
import { Levels } from './levels/levels'
import { TableBlock } from './table/table-block'

export class Main extends BaseComponent {
  public table = new TableBlock(this.element)
  public editor = new Editor(this.element)
  public levels = new Levels(this.element)

  constructor(root: HTMLElement) {
    super({ tag: 'main', attribute: { className: 'main' }, parent: root })
  }
}
