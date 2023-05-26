import News from './news/news'
import Sources from './sources/sources'
import { ViewData, ArrayPost } from '../types/viewTypes'

export class AppView {
  public readonly news: News
  public readonly sources: Sources
  constructor() {
    this.news = new News()
    this.sources = new Sources()
  }

  public static drawNews(data: ViewData): void {
    const values = data?.articles ? data?.articles : []
    News.draw(values)
  }

  public static drawSources(data: ArrayPost): void {
    const values = data?.sources ? data?.sources : []
    Sources.draw(values)
  }
}

export default AppView
