import { BaseComponent } from '../../../../utils/base-component'
import { LevelNodeSetting } from '../../../models/level-node-setting-interface'

export class TableElement extends BaseComponent {
  constructor({ tag, attribute }: LevelNodeSetting, parent?: HTMLElement) {
    super({
      tag,
      attribute,
      parent,
    })
    this.addClass('custom-element')
    this.addClass(tag)
  }
}
