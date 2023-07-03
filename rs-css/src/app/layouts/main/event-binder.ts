import { BaseComponent } from '../../../utils/base-component'
import { EventEnum } from '../../enum/event-enum'

export class EventBinder {
  public tableElement: BaseComponent
  public editorElement: BaseComponent
  public title: BaseComponent
  constructor(tableElement: BaseComponent, editorElement: BaseComponent, titleInnerHTML: string) {
    this.tableElement = tableElement
    this.editorElement = editorElement

    this.title = new BaseComponent({
      attribute: {
        className: 'title',
        innerHTML: titleInnerHTML,
      },
    })

    this.editorElement.setEventListener(EventEnum.MouseOver, (event) => this.toggleHoverClassName(event))
    this.tableElement.setEventListener(EventEnum.MouseOver, (event) => this.toggleHoverClassName(event))
    this.editorElement.setEventListener(EventEnum.MouseOut, (event) => this.toggleHoverClassName(event))
    this.tableElement.setEventListener(EventEnum.MouseOut, (event) => this.toggleHoverClassName(event))
  }

  private toggleHoverClassName(event: Event): void {
    event.stopPropagation()

    const { type } = event

    this.editorElement.toggle('active-text')
    this.tableElement.toggle('active')

    if (type === EventEnum.MouseOver) {
      this.addTitle()
    }

    if (type === EventEnum.MouseOut) {
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
