import { BaseComponent } from 'src/app/components/base-component'
import { carSvg } from 'src/app/constants/carSvg'
import './garage.scss'
import { Form } from './components/form/form'

export class Garage extends BaseComponent {
  private inputsContainer = new BaseComponent({
    attribute: { className: 'inputs-container' },
    parent: this.element,
  })

  private createForm = new Form('garage-form', 'Create Car', this.inputsContainer.element)
  private changeForm = new Form('change-form', 'Change Car', this.inputsContainer.element)

  private buttonCreate = new BaseComponent({
    tag: 'button',
    attribute: {
      className: 'button-race button',
      textContent: 'Race',
      type: 'button',
    },
    parent: this.inputsContainer.element,
  })

  private buttonReset = new BaseComponent({
    tag: 'button',
    attribute: {
      className: 'button-reset button',
      textContent: 'Reset',
      type: 'button',
    },
    parent: this.inputsContainer.element,
  })

  private buttonGenerateCar = new BaseComponent({
    tag: 'button',
    attribute: {
      className: 'button-generate-car button',
      textContent: 'Generate Car',
      type: 'button',
    },
    parent: this.inputsContainer.element,
  })

  private logo = new BaseComponent({
    tag: 'h1',
    attribute: {
      className: 'garage__logo',
      textContent: 'Garage(0 cars)',
    },
    parent: this.element,
  })
  private car = new BaseComponent({
    attribute: { className: 'container-car', innerHTML: carSvg },
    parent: this.element,
  })

  constructor(parent?: HTMLElement) {
    super({
      attribute: {
        className: 'garage',
      },
      parent,
    })
    this.createForm.setEventListener('submit', (event) => this.submitCreateFrom(event))
    this.changeForm.setEventListener('submit', (event) => this.submitCreateFrom(event))
  }

  private submitCreateFrom(event: Event): void {
    event.preventDefault()
    this.car.element.style.fill = this.createForm.color
  }
}
