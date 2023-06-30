import { MainStateType } from '../../../../../types/main-state-type'
import { BaseComponent } from '../../../../../../utils/base-component'
import { emitter } from '../../../../../services/event-emitter'
import { EmitterEnum } from '../../../../../enum/emitter-enum'
import { htmlEditorDictionary } from '../../../../../dictionary/html-editor-dictionary'

export class HtmlViewer extends BaseComponent {
  private markup = new BaseComponent({
    attribute: { className: 'html-text' },
    parent: this.element,
  })

  constructor(root: HTMLElement) {
    super({ attribute: { className: 'html-viewer' }, parent: root })

    emitter.subscribe(EmitterEnum.changeElementsOnState, (args: MainStateType) => this.changeMarkup(args))
  }

  public changeMarkup({ editorComponents }: MainStateType): void {
    this.markup.removeAllChildren()

    this.markup.element.insertAdjacentHTML('afterbegin', htmlEditorDictionary.firstElementInnerHTML)

    if (Array.isArray(editorComponents)) {
      editorComponents.forEach((baseComponent) => {
        this.markup.element.append(baseComponent.element)
      })
    }

    this.markup.element.insertAdjacentHTML('beforeend', htmlEditorDictionary.lastElementInnerHTML)
  }
}
