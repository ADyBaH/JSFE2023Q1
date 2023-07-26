import { Winners } from 'src/app/winners/winners-page'
import { NotFound } from 'src/app/not-found/not-found-page'
import { Garage } from 'src/app/garage/garage'
import { Router } from 'src/app/utils/router'
import { BaseComponent } from '../../shared/base-component'
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
