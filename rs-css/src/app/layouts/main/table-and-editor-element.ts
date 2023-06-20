import { NodeSetup } from '../../modules/interface-for-levels'
import { BaseComponent } from '../../components/base-component'

export class TableAndEditorElement {
  public tableElement: BaseComponent
  public editorElement: BaseComponent
  public tupleElements: BaseComponent[]
  constructor({ attribute }: NodeSetup, parent?: HTMLElement) {
    this.tableElement = new BaseComponent({
      attribute: { className: `table__${attribute.className} table__element` },
      parent,
    })
    this.editorElement = new BaseComponent({
      attribute: {
        className: `html-text__${attribute.className} html-text__element`,
        textContent: attribute.textContent,
      },
      parent,
    })
    this.tupleElements = [this.editorElement, this.tableElement]
    this.tupleElements.forEach((baseComponent) => {
      baseComponent.element.addEventListener('mouseover', () => this.toggleHoverClassName())
      baseComponent.element.addEventListener('mouseout', () => this.toggleHoverClassName())
    })
  }

  private toggleHoverClassName(): void {
    this.tupleElements[0].toggle('active-text')
    this.tupleElements[1].toggle('active')
  }
}
