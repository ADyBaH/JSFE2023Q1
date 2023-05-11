import { Footer } from './footer'
import { Header } from './header'
import { Main } from './main'

export class Layout {
  constructor(root) {
    const header = new Header(root)
    const main = new Main(root)
    const footer = new Footer(root)
  }
}
