import { LevelInterface } from '../../../models/level-interface'
import { BaseComponent } from '../../../../utils/base-component'
import { MainStateType } from '../../../types/main-state-type'
import { emitter } from '../../../services/event-emitter'
import './table-block.scss'
import { EmitterEnum } from '../../../enum/emitter-enum'

export class TableBlock extends BaseComponent {
  public logo: BaseComponent
  public table: BaseComponent
  constructor(root: HTMLElement, loadLevel: LevelInterface) {
    super({ tag: 'section', attribute: { className: 'table-block' }, parent: root })
    emitter.subscribe(EmitterEnum.changeElementsOnState, ({ task }: MainStateType) => this.changeLogo(task))
    emitter.subscribe(EmitterEnum.changeElementsOnState, (args: MainStateType) => this.changeTable(args))
    this.logo = new BaseComponent({
      tag: 'h2',
      attribute: { className: 'table-block__logo', textContent: loadLevel.task },
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

  public changeTable(args: MainStateType): void {
    this.table.removeAllChields()
    if (Array.isArray(args.tableComponents)) {
      args.tableComponents.forEach((baseComponent) => this.table.element.append(baseComponent.element))
    }
  }
}
