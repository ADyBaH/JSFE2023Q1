import { PostForSources } from '../../types/viewTypes'
import './sources.css'

class Sources {
  public static draw(data: PostForSources[]): void {
    const fragment = document.createDocumentFragment()
    const sourceItemTemp = document.querySelector('#sourceItemTemp')
    const arrowDivPrev = document.createElement('div')
    arrowDivPrev.className = 'source__arrowPrev'

    const arrowDivNext = document.createElement('div')
    arrowDivNext.className = 'source__arrowNext'

    fragment.append(arrowDivPrev)
    data.forEach((item) => {
      const sourceClone = (sourceItemTemp as HTMLTemplateElement).content.cloneNode(true) as HTMLElement

      ;(sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name
      ;(sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id)

      fragment.append(sourceClone)
    })

    fragment.append(arrowDivNext)
    ;(document.querySelector('.sources') as HTMLElement).append(fragment)
  }
}

export default Sources
