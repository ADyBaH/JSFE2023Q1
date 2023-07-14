import { BaseComponent } from './components/base-component'
import { Footer } from './components/footer/footer'
import { Header } from './components/header/header'
import { Main } from './components/main/main'

class App {
  private root = new BaseComponent({
    attribute: { id: 'root', className: 'root' },
    parent: document.body,
  })

  public init(): void {
    const header = new Header(this.root.element)
    const main = new Main(this.root.element)
    const footer = new Footer(this.root.element)
    this.root.appends([header.element, main.element, footer.element])
  }
}

new App().init()
