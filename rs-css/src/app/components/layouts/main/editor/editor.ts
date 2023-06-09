import { BaseComponent } from '../../../../../utils/base-component'
import { CssEditor } from './css-editor'
import { HtmlViewer } from './html-viewer'

export class Editor extends BaseComponent {
  public cssEditor = new CssEditor(this.element)
  public htmlViewer = new HtmlViewer(this.element)

  constructor(root: HTMLElement) {
    super({ attribute: { className: 'section' }, parent: root })
  }
}
