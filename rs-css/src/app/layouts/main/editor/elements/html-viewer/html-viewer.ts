import { MainStateType } from '../../../../../types/main-state-type'
import { BaseComponent } from '../../../../../../utils/base-component'
import { emitter } from '../../../../../services/event-emitter'
import { EmitterEnum } from '../../../../../enum/emitter-enum'

export class HtmlViewer extends BaseComponent {
  private markup = new BaseComponent({
    attribute: { className: 'html-text' },
    parent: this.element,
  })
  constructor(root: HTMLElement) {
    super({ attribute: { className: 'html-viewer' }, parent: root })
    emitter.subscribe(EmitterEnum.changeElementsOnState, (args: MainStateType) => this.changeMarkup(args))
  }

  public changeMarkup(args: MainStateType): void {
    this.markup.removeAllChields()
    this.markup.element.insertAdjacentHTML(
      'afterbegin',
      `<span class="hljs-tag">
      &lt;<span class="hljs-name">div</span> 
      <span class="hljs-attr">class</span>=<span class="hljs-string">"table"</span>&gt;</span>`,
    )

    if (Array.isArray(args.editorComponents)) {
      args.editorComponents.forEach((baseComponent) => {
        this.markup.element.append(baseComponent.element)
      })
      this.markup.element.insertAdjacentHTML(
        'beforeend',
        `<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>`,
      )
    }
  }
}
