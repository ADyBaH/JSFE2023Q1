import { BaseComponent } from '../utils/base-component'
import { Footer } from './footer'
import { Header } from './header'
import { Main } from './main'

export class Layout extends BaseComponent {
  constructor() {
    super({ attr: { className: 'root' }, parent: document.body })
    const header = new Header(this.element)
    const main = new Main(this.element)
    const footer = new Footer(this.element)
  }
}
