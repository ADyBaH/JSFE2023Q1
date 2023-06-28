import { BaseComponent } from '../../../../utils/base-component'
import { NodeSetup } from '../../../models/interface-for-levels'

export class EditorElement extends BaseComponent {
  constructor({ innerHTML }: NodeSetup, parent?: HTMLElement) {
    super({
      attribute: {
        className: 'html-text__element',
        innerHTML,
      },
      parent,
    })
  }
}
