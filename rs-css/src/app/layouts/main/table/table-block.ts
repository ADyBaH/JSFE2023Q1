import { BaseComponent } from '../../../../utils/base-component'
import { LevelInterface } from '../../../models/level-interface'
import { MainStateType } from '../../../types/main-state-type'
import { emitter } from '../../../services/event-emitter'
import { EmitterEnum } from '../../../enum/emitter-enum'
import './table-block.scss'

export class TableBlock extends BaseComponent {
  public logo: BaseComponent
  public table: BaseComponent
  constructor(root: HTMLElement, { task }: LevelInterface) {
    super({ tag: 'section', attribute: { className: 'table-block' }, parent: root })
    emitter.subscribe(EmitterEnum.changeElementsOnState, ({ mainTask }: MainStateType) => this.changeLogo(mainTask))
    emitter.subscribe(EmitterEnum.changeElementsOnState, (args: MainStateType) => this.changeTable(args))
    this.logo = new BaseComponent({
      tag: 'h2',
      attribute: { className: 'table-block__logo', textContent: task },
      parent: this.element,
    })
    this.table = new BaseComponent({
      attribute: { className: 'table-block__table' },
      parent: this.element,
    })
  }

  public changeLogo(task: string): void {
    this.logo.innerText = task
  }

  public changeTable({ tableComponents }: MainStateType): void {
    this.table.removeAllChildren()
    if (Array.isArray(tableComponents)) {
      tableComponents.forEach((baseComponent) => this.table.element.append(baseComponent.element))
    }
  }
}
