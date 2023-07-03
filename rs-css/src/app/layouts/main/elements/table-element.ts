import { BaseComponent } from '../../../../utils/base-component'

export class TableElement extends BaseComponent {
  constructor(tag: string, attribute: Record<string, string>, animated?: boolean, parent?: HTMLElement) {
    super({
      tag,
      attribute,
      parent,
    })

    this.addClass('fade-in')
    setInterval(() => this.removeClass('fade-in'), 250)

    this.addClass('custom-element')
    this.addClass(tag)

    if (animated) {
      this.addClass('animated-element')
    }
  }
}
