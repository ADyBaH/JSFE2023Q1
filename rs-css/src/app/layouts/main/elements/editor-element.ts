import { BaseComponent } from '../../../../utils/base-component'
import { LevelNodeSetting } from '../../../models/level-node-setting-interface'

export class EditorElement extends BaseComponent {
  constructor({ innerHTML }: LevelNodeSetting, parent?: HTMLElement) {
    super({
      attribute: {
        className: 'html-text__element',
        innerHTML,
      },
      parent,
    })
  }
}
