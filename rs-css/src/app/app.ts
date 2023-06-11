import { Layout } from './components/layouts/layout'

class App {
  public layout = new Layout()
  private root = document.getElementById('root')

  public init(): boolean {
    if (!this.root) {
      return false
    }
    this.layout.create(this.root)
    return true
  }
}

new App().init()
