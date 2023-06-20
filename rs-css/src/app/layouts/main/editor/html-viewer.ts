import { MainStateType } from '../../../types/main-state-type'
import { BaseComponent } from '../../../components/base-component'
import { emitter } from '../../../services/event-emitter'

export class HtmlViewer extends BaseComponent {
  private markup = new BaseComponent({
    attribute: { className: 'html-text' },
    parent: this.element,
  })
  constructor(root: HTMLElement) {
    super({ attribute: { className: 'html-viewer' }, parent: root })
    emitter.subscribe('changeElementsOnState', (args: MainStateType) => this.changeMarkup(args))
  }

  public changeMarkup(args: MainStateType): void {
    this.markup.removeAllChields()
    this.markup.element.append('<div class="table">')

    if (Array.isArray(args.editorComponents)) {
      args.editorComponents.forEach((baseComponent) => {
        this.markup.element.append(baseComponent.element)
      })
      this.markup.element.append('</div>')
    }
  }
}
