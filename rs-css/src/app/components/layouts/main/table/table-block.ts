import { BaseComponent } from '../../../../../utils/base-component'

export class TableBlock extends BaseComponent {
  public logo
  public table
  constructor(root: HTMLElement) {
    super({ tag: 'section', attribute: { className: 'table-block' }, parent: root })
    this.logo = new BaseComponent({
      tag: 'h2',
      attribute: { className: 'table-block__logo', textContent: 'Task for Table' },
      parent: this.element,
    })
    this.table = new BaseComponent({
      attribute: { className: 'table-block__table' },
      parent: this.element,
    })
  }
}
