import { BaseComponent } from '../../../utils/base-component'

export class EventBinder {
  public tableElement: BaseComponent
  public editorElement: BaseComponent
  public title: BaseComponent
  constructor(tableElement: BaseComponent, editorElement: BaseComponent) {
    this.tableElement = tableElement
    this.editorElement = editorElement
    this.title = new BaseComponent({
      attribute: {
        className: 'title',
        textContent: `<${tableElement.element.tagName}></${tableElement.element.tagName}>`,
      },
    })
    this.editorElement.setEventListener('mouseover', (event) => this.toggleHoverClassName(event))
    this.tableElement.setEventListener('mouseover', (event) => this.toggleHoverClassName(event))
    this.editorElement.setEventListener('mouseout', (event) => this.toggleHoverClassName(event))
    this.tableElement.setEventListener('mouseout', (event) => this.toggleHoverClassName(event))
  }

  private toggleHoverClassName(event: Event): void {
    event.stopPropagation()
    this.editorElement.toggle('active-text')
    this.tableElement.toggle('active')
    if (event.type === 'mouseover') {
      this.addTitle()
    }
    if (event.type === 'mouseout') {
      this.removeTitle()
    }
  }

  public addTitle(): void {
    this.tableElement.element.append(this.title.element)
  }

  public removeTitle(): void {
    this.title.element.remove()
  }
}
