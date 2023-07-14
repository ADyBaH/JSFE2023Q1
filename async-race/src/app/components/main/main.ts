import { NotFound } from 'app/pages/not-found-page/not-found-page'
import { Winners } from 'app/pages/winners-page/winners-page'
import { Garage } from 'app/pages/garage-page/garage'
import { Router } from 'app/utils/router'
import { BaseComponent } from '../base-component'
import { Modal } from './modal/modal'
import './main.scss'

export class Main extends BaseComponent {
  private modal: Modal = new Modal(this.element)

  private pages = {
    '#garage': new Garage(),
    '#winners': new Winners(),
    'notFound': new NotFound(),
  }

  private router: Router

  constructor(root: HTMLElement) {
    super({ tag: 'main', attribute: { className: 'main' }, parent: root })

    this.element.innerHTML = '<h1>main</h1>'
    this.router = new Router(this.pages, this.element)
  }
}
