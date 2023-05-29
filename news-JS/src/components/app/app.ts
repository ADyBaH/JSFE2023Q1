import AppController from '../controller/controller'
import { AppView } from '../view/appView'
import { ArrayPost, ViewData } from '../types/interface'

class App {
  protected readonly controller: AppController
  protected readonly view: AppView

  constructor() {
    this.controller = new AppController()
    this.view = new AppView()
  }

  public start(): void {
    const sources = document.querySelector<HTMLElement>('.sources')

    sources?.addEventListener('click', (event) =>
      this.controller.getNews(event, (data: ViewData) => this.view.drawNews(data)),
    )

    this.controller.getSources((data: ArrayPost) => this.view.drawSources(data))
  }
}

export default App
