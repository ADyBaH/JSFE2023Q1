import { BaseComponent } from './components/base-component'
import { Layout } from './layout/layout'

class App extends BaseComponent {
  constructor() {
    super({ attr: { className: 'root' }, parent: document.body })
  }

  init() {
    const layout = new Layout(this.element)
  }
}
new App().init()
