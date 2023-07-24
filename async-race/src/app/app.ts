import { BaseComponent } from './shared/base-component'
import { Footer } from './core/footer/footer'
import { Header } from './core/header/header'
import { Main } from './core/main/main'
import { Modal } from './core/main/modal/modal'

class App {
  private root = new BaseComponent({
    attribute: { id: 'root', className: 'root' },
    parent: document.body,
  })
  private modal: Modal = new Modal(this.root.element)

  public init(): void {
    const header = new Header(this.root.element)
    const main = new Main(this.root.element)
    const footer = new Footer(this.root.element)
    this.root.appends([header.element, main.element, footer.element])
  }
}

new App().init()
