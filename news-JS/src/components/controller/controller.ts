import AppLoader from './appLoader'
import { DrawSources, DrawNews } from '../types/appTypes'
import { EnumController } from '../types/enumAll'

class AppController extends AppLoader {
  public getSources(callback: (data: DrawSources) => void): void {
    super.getResp(
      {
        endpoint: EnumController.endpointSources,
      },
      callback,
    )
  }

  public getNews(e: MouseEvent, callback: (data: DrawNews) => void): void {
    let target = e.target as HTMLDivElement
    const newsContainer = e.currentTarget as HTMLSpanElement

    while (target !== newsContainer) {
      if (target.classList.contains(EnumController.sourcItem)) {
        const sourceId = target.getAttribute(EnumController.dataSourceId) as string
        if (newsContainer.getAttribute(EnumController.dataSource) !== sourceId) {
          newsContainer.setAttribute(EnumController.dataSource, sourceId)
          super.getResp(
            {
              endpoint: EnumController.endpointEverything,
              options: {
                sources: sourceId,
              },
            },
            callback,
          )
        }
        return
      }

      target = target.parentNode as HTMLDivElement
    }
  }
}

export default AppController
