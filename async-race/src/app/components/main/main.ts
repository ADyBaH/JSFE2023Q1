import { NotFound } from 'src/app/pages/not-found-page/not-found-page'
import { Winners } from 'src/app/pages/winners-page/winners-page'
import { Garage } from 'src/app/pages/garage-page/garage'
import { Router } from 'src/app/utils/router'
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

    this.router = new Router(this.pages, this.element)
  }
}
