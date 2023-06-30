import { BaseComponent } from '../../../../utils/base-component'
import { HtmlViewer } from './elements/html-viewer/html-viewer'
import { CssEditor } from './elements/css-editor/css-editor'
import { FileBlock } from './elements/file-block/file-block'
import './editor.scss'

export class Editor extends BaseComponent {
  public cssEditor: CssEditor
  public htmlViewer: HtmlViewer
  constructor(root: HTMLElement, tableElement: HTMLElement) {
    super({ attribute: { className: 'editor-block' }, parent: root })

    const cssBlock = new FileBlock(this.element, 'css')
    const htmlBlock = new FileBlock(this.element, 'html')

    this.cssEditor = new CssEditor(cssBlock.fileBlock.element, tableElement)
    this.htmlViewer = new HtmlViewer(htmlBlock.fileBlock.element)
  }
}
