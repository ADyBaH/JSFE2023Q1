import { isHTMLElement } from '../../../utils/isHTMLelement'
import { Post } from '../../types/interface'
import './news.css'

class News {
  private readonly placeholderUrl: string =
    'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'

  private reverseString = (string: string): string => string.slice(0, 10).split('-').reverse().join('-')

  private setTextContent = (element: HTMLElement | null, text: string): void => {
    if (isHTMLElement(element)) {
      Object.assign(element, { textContent: text })
    }
  }
  private setUrl = <E, O>(element: E, attr: O): void => {
    if (element instanceof HTMLAnchorElement) {
      Object.assign(element, attr)
    }
  }

  public draw(data: Post[]): void {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data
    const fragment = document.createDocumentFragment()
    const newsItemTemp = document.querySelector('#newsItemTemp')

    if (newsItemTemp instanceof HTMLTemplateElement) {
      news.forEach((item, index) => {
        const newsClone = newsItemTemp.content.cloneNode(true)
        if (newsClone instanceof DocumentFragment) {
          const newsMetaPhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo')
          if (index % 2) {
            newsClone.querySelector<HTMLElement>('.news__item')?.classList.add('alt')
          }
          if (isHTMLElement(newsMetaPhoto)) {
            newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || this.placeholderUrl})`
          }
          const arrayOfTuples: [HTMLElement | null, string][] = [
            [newsClone.querySelector<HTMLElement>('.news__meta-author'), item.author || item.source.name],
            [newsClone.querySelector<HTMLElement>('.news__meta-date'), this.reverseString(item.publishedAt)],
            [newsClone.querySelector<HTMLElement>('.news__description-title'), item.title],
            [newsClone.querySelector<HTMLElement>('.news__description-source'), item.source.name],
            [newsClone.querySelector<HTMLElement>('.news__description-content'), item.description],
          ]
          arrayOfTuples.forEach(([element, string]) => this.setTextContent(element, string))

          this.setUrl(newsClone.querySelector<HTMLAnchorElement>('.news__read-more a'), { href: item.url })

          fragment.append(newsClone)
        }
      })
      const newsElement = document.querySelector<HTMLElement>('.news')
      if (isHTMLElement(newsElement)) {
        Object.assign(newsElement, { innerHTML: '' })
        newsElement?.appendChild(fragment)
      }
    }
  }
}

export default News
