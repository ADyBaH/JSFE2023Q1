import { BaseComponent } from 'src/app/shared/base-component'
import './not-found-page.scss'

export class NotFound extends BaseComponent {
  constructor(parent?: HTMLElement) {
    super({
      attribute: {
        className: 'not-found',
      },
      parent,
    })
    this.innerHTML = '<h1>Not Found Page</h1>'
  }
}
