import AppController from '../controller/controller'
import { AppView } from '../view/appView'
import { DrawSources, DrawNews } from '../types/appTypes'

class App {
  protected readonly controller: AppController
  protected readonly view: AppView

  constructor() {
    this.controller = new AppController()
    this.view = new AppView()
  }

  start(): void {
    ;(document.querySelector('.sources') as HTMLElement).addEventListener('click', (e) =>
      this.controller.getNews(e, (data: DrawNews) => AppView.drawNews(data)),
    )

    this.controller.getSources((data: DrawSources) => AppView.drawSources(data))
  }
}

export default App
