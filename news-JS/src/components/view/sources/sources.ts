import { isHTMLElement } from '../../../utils/isHTMLelement'
import { PostForSources } from '../../types/interface'
import './sources.css'

class Sources {
  public scrollSources(event: MouseEvent): void {
    const { target } = event
    const source = document.querySelector('.sources')

    if (source instanceof HTMLElement && target instanceof HTMLElement) {
      const sourceLeft = source?.scrollLeft
      const addScroll = target.className === 'source__arrowNext' ? sourceLeft + 150 : sourceLeft - 150

      source?.scroll({ top: 0, left: addScroll, behavior: 'smooth' })
    }
  }

  public draw(data: PostForSources[]): void {
    const fragment = document.createDocumentFragment()
    const sources = document.querySelector('.sources')
    const sourceItemTemp = document.querySelector('#sourceItemTemp')
    const arrowDivPrev = document.createElement('div')
    const arrowDivNext = document.createElement('div')

    arrowDivPrev.onclick = this.scrollSources
    arrowDivPrev.className = 'source__arrowPrev'

    arrowDivNext.onclick = this.scrollSources
    arrowDivNext.className = 'source__arrowNext'

    fragment.append(arrowDivPrev)
    data.forEach((item) => {
      if (sourceItemTemp instanceof HTMLTemplateElement) {
        const sourceClone = sourceItemTemp.content.cloneNode(true)
        if (sourceClone instanceof DocumentFragment) {
          const sourceItemName = sourceClone.querySelector('.source__item-name')
          const sourceItem = sourceClone.querySelector('.source__item')

          if (isHTMLElement(sourceItemName)) {
            sourceItemName.textContent = item.name
          }

          sourceItem?.setAttribute('data-source-id', item.id)
          fragment.append(sourceClone)
        }
      }
    })

    fragment.append(arrowDivNext)

    if (isHTMLElement(sources)) {
      sources.append(fragment)
    }
  }
}

export default Sources
