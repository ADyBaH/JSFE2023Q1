import AppLoader from './appLoader'
import { ArrayPost, ViewData } from '../types/interface'

class AppController extends AppLoader {
  public getSources(callback: (data: ArrayPost) => void): void {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback,
    )
  }

  public getNews({ target, currentTarget }: MouseEvent, callback: (data: ViewData) => void): void {
    let clickTarget = target
    const newsContainer = currentTarget

    while (
      newsContainer instanceof HTMLElement &&
      clickTarget instanceof HTMLElement &&
      clickTarget !== newsContainer
    ) {
      if (clickTarget.classList.contains('source__item')) {
        const sourceId = clickTarget.getAttribute('data-source-id')
        if (newsContainer.getAttribute('data-source') !== sourceId && sourceId !== null) {
          newsContainer.setAttribute('data-source', sourceId)
          super.getResp(
            {
              endpoint: 'everything',
              sourceId,
            },
            callback,
          )
        }
        return
      }
      clickTarget = clickTarget.parentNode
    }
  }
}

export default AppController
