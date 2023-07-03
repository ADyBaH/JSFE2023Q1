import 'highlight.js/styles/atom-one-light.css'
import { Layout } from './layouts/layout'

class App {
  public layout = new Layout()
  private root = document.getElementById('root')

  public init(): void {
    if (!this.root) {
      return
    }
    this.layout.create(this.root)
  }
}

new App().init()
