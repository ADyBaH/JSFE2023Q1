import { NotFound } from 'src/app/pages/not-found-page/not-found-page'
import { Winners } from 'src/app/pages/winners-page/winners-page'
import { Garage } from 'src/app/pages/garage-page/garage'
import { Router } from 'src/app/utils/router'
import { BaseComponent } from '../base-component'
import './main.scss'

export class Main extends BaseComponent {
  private pages = {
    '#garage': new Garage(),
    '#winners': new Winners(),
    'notFound': new NotFound(),
  }

  private router = new Router(this.pages, this.element)

  constructor(root: HTMLElement) {
    super({ tag: 'main', attribute: { className: 'main' }, parent: root })
  }
}
