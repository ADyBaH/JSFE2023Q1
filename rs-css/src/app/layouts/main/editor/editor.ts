import { BaseComponent } from '../../../components/base-component'
import { CssEditor } from './css-editor'
import { FileBlock } from './file-block'
import { HtmlViewer } from './html-viewer'

export class Editor extends BaseComponent {
  public cssEditor: CssEditor
  public htmlViewer: HtmlViewer
  constructor(root: HTMLElement) {
    super({ attribute: { className: 'editor-block' }, parent: root })
    const cssBlock = new FileBlock(this.element, 'css')
    const htmlBlock = new FileBlock(this.element, 'html')
    this.cssEditor = new CssEditor(cssBlock.fileBlock.element)
    this.htmlViewer = new HtmlViewer(htmlBlock.fileBlock.element)
  }
}
