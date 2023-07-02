import { BaseComponent } from '../../../../utils/base-component'
import { footerInnerHTML } from '../../../constants/footer-innerHTML-constant'
import './footer.scss'

export class Footer extends BaseComponent {
  constructor(root: HTMLElement) {
    super({ tag: 'footer', attribute: { className: 'footer' }, parent: root })

    this.element.innerHTML = footerInnerHTML
  }
}
