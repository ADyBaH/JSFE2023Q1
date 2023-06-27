import { NodeSetup } from '../../models/interface-for-levels'
import { BaseComponent } from '../../../utils/base-component'

export class TableAndEditorElement {
  public tableElement: BaseComponent
  public editorElement: BaseComponent
  constructor({ tag, attribute, innerHTML }: NodeSetup, parent?: HTMLElement) {
    this.tableElement = new BaseComponent({
      tag,
      attribute,
      parent,
    })
    this.tableElement.addClass('custom-element')
    this.tableElement.addClass(tag)
    this.editorElement = new BaseComponent({
      attribute: {
        className: 'html-text__element',
        innerHTML,
      },
      parent,
    })

    this.editorElement.setEventListener('mouseover', (event) => this.toggleHoverClassName(event))
    this.tableElement.setEventListener('mouseout', (event) => this.toggleHoverClassName(event))
  }

  private toggleHoverClassName(event: Event): void {
    event.stopPropagation()
    this.editorElement.toggle('active-text')
    this.tableElement.toggle('active')
  }
}
