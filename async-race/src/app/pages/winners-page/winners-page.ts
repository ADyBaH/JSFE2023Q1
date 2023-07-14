import { BaseComponent } from 'app/components/base-component'
import './winners-page.scss'

export class Winners extends BaseComponent {
  constructor(parent?: HTMLElement) {
    super({
      attribute: {
        className: 'winners',
      },
      parent,
    })
    this.innerHTML = '<h1>Winners</h1>'
  }
}
