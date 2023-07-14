import { BaseComponent } from 'app/components/base-component'
import './garage.scss'

export class Garage extends BaseComponent {
  constructor(parent?: HTMLElement) {
    super({
      attribute: {
        className: 'garage',
      },
      parent,
    })
    this.innerHTML = '<h1>Garage</h1>'
  }
}
