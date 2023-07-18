import { BaseComponent } from 'src/app/components/base-component'
import { Button } from 'src/app/components/button'
import { carSvgString } from 'src/app/constants/car-svg-string'
import type { Car } from 'src/app/types/car-type'

export class GarageListComponent extends BaseComponent {
  public id
  private buttonSelect
  private buttonRemove
  private nameCar
  private roadContainer
  private buttonStart
  private buttonStop

  constructor({ name, color, id }: Car, parent: HTMLElement) {
    super({ attribute: { className: 'garage-list__component' }, parent })
    this.id = id

    this.buttonSelect = new Button('garage-list__button', 'Select', this.element)
    this.buttonRemove = new Button('garage-list__button', 'Remove', this.element)

    this.nameCar = new BaseComponent({
      tag: 'span',
      attribute: { className: 'garage-list__name-car', textContent: name },
      parent: this.element,
    })

    this.roadContainer = new BaseComponent({
      attribute: { className: 'garage-list__road-container' },
      parent: this.element,
    })

    this.buttonStart = new Button('garage-list__button', 'Start', this.roadContainer.element)
    this.buttonStop = new Button('garage-list__button', 'Stop', this.roadContainer.element)

    this.roadContainer.element.insertAdjacentHTML('beforeend', carSvgString)
    this.roadContainer.element.style.fill = color
  }
}
