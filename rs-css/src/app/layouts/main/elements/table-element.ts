import { BaseComponent } from '../../../../utils/base-component'
import { NodeSetup } from '../../../models/levels-interface'

export class TableElement extends BaseComponent {
  constructor({ tag, attribute }: NodeSetup, parent?: HTMLElement) {
    super({
      tag,
      attribute,
      parent,
    })
    this.addClass('custom-element')
    this.addClass(tag)
  }
}
