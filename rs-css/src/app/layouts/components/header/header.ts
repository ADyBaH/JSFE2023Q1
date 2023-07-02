import { BaseComponent } from '../../../../utils/base-component'
import { headerInnerHTMLString } from '../../../constants/header-innerHTML-constant'
import './header.scss'

export class Header extends BaseComponent {
  constructor(root: HTMLElement) {
    super({ tag: 'header', attribute: { className: 'header' }, parent: root })

    this.element.innerHTML = headerInnerHTMLString
  }
}
