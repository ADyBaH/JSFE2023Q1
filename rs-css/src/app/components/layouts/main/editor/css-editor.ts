import { BaseComponent } from '../../../../../utils/base-component'

export class CssEditor extends BaseComponent {
  constructor(root: HTMLElement) {
    super({ attribute: { className: 'section' }, parent: root })

    this.element.innerHTML = `
      <div class= "container">
        CssEditor
      </div>
    `
  }
}
