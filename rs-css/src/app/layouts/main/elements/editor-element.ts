import { BaseComponent } from '../../../../utils/base-component'

export class EditorElement extends BaseComponent {
  constructor(innerHTML: string, parent?: HTMLElement) {
    super({
      attribute: {
        className: 'html-text__element',
        innerHTML,
      },
      parent,
    })
  }
}
