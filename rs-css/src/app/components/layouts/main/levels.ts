import { BaseComponent } from '../../../../utils/base-component'

export class Levels extends BaseComponent {
  constructor(root: HTMLElement) {
    super({ attribute: { className: 'section' }, parent: root })

    this.element.innerHTML = `
      <div class= "container"  style="position: absolute;top: 0; right: 0;">
        Levels
      </div>
    `
  }
}
