import { EnumNews } from '../../types/enumAll'
import { Post } from '../../types/viewTypes'
import './news.css'

class News {
  public static draw(data: Post[]): void {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data

    const fragment = document.createDocumentFragment()

    const newsItemTemp = document.querySelector(EnumNews.idNewsItemTemp) as HTMLTemplateElement

    news.forEach((item, idx: number): void => {
      const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement

      if (idx % 2) {
        ;(newsClone.querySelector(EnumNews.classNewsItem) as HTMLElement).classList.add('alt')
      }
      ;(newsClone.querySelector(EnumNews.classNewsMetaPhoto) as HTMLElement).style.backgroundImage = `url(${
        item.urlToImage || EnumNews.imgPlaceHolder
      })`
      ;(newsClone.querySelector(EnumNews.classNewsMetaAuthor) as HTMLElement).textContent =
        item.author || item.source.name
      ;(newsClone.querySelector(EnumNews.classNewsMetaDate) as HTMLElement).textContent = item.publishedAt
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-')
      ;(newsClone.querySelector(EnumNews.classNewsDescriptionTitle) as HTMLElement).textContent = item.title
      ;(newsClone.querySelector(EnumNews.classNewsDescriptionSource) as HTMLElement).textContent = item.source.name
      ;(newsClone.querySelector(EnumNews.classNewsDescriptionContent) as HTMLElement).textContent = item.description
      ;(newsClone.querySelector(EnumNews.classNewsReadMore) as HTMLElement).setAttribute('href', item.url)

      fragment.append(newsClone)
    })
    ;(document.querySelector(EnumNews.classNews) as HTMLElement).innerHTML = ''
    ;(document.querySelector(EnumNews.classNews) as HTMLElement).appendChild(fragment)
  }
}

export default News
