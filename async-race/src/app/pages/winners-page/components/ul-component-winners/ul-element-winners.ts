import type { UlElementType } from 'src/app/types/ul-element-type'
import { BaseComponent } from 'src/app/components/base-component'
import { carSvgString } from 'src/app/constants/car-svg-string'
import { LiElement } from '../../elements/li-element'
import './ul-element-winners.scss'

export class UlElementWinner extends BaseComponent {
  private winsElement
  private timeElement
  private idELement
  private carName
  private carSvg
  private wins
  private time

  constructor({ parent, id, name, wins, time, color }: UlElementType) {
    super({
      tag: 'ul',
      attribute: {
        className: 'winners__car-ul',
      },
      parent,
    })

    this.idELement = new LiElement({ className: 'winners__car-li', textContent: String(id) }, this.element)
    this.carSvg = new LiElement({ className: 'winners__car-li car-container', innerHTML: carSvgString }, this.element)
    this.carName = new LiElement({ className: 'winners__car-li', textContent: name }, this.element)
    this.winsElement = new LiElement({ className: 'winners__car-li', textContent: String(wins) }, this.element)
    this.timeElement = new LiElement({ className: 'winners__car-li', textContent: String(time) }, this.element)

    this.carSvg.element.style.fill = color
    this.wins = wins
    this.time = time
  }
}
