import { Pagination } from 'src/app/components/pagination/pagination'
import { BaseComponent } from 'src/app/components/base-component'
import { Button } from 'src/app/components/button'
import { httpService } from 'src/app/services/http-service'
import { emitter } from 'src/app/services/event-emitter'
import { EmitterEnum } from 'src/app/enum/emitter-enum'
import { GarageForm } from './components/form/garage-form'
import { GarageList } from './components/garage-list/garage-list'
import './garage.scss'

export class Garage extends BaseComponent {
  private inputsContainer = new BaseComponent({
    attribute: { className: 'inputs-container' },
    parent: this.element,
  })

  private createForm = new GarageForm('garage-form', 'Create Car', this.inputsContainer.element)
  private changeForm = new GarageForm('change-form', 'Change Car', this.inputsContainer.element)
  private buttonCreate = new Button('button-race button', 'Race', this.inputsContainer.element)
  private buttonReset = new Button('button-reset button', 'Reset', this.inputsContainer.element)
  private buttonGenerateCar = new Button('button-generate-car button', 'Generate Car', this.inputsContainer.element)

  private logo = new BaseComponent({
    tag: 'h1',
    attribute: {
      className: 'garage__logo',
      textContent: 'Garage(0 cars)',
    },
    parent: this.element,
  })

  private garageList = new GarageList(this.element)

  private pagination = new Pagination(this.element)

  constructor(parent?: HTMLElement) {
    super({
      attribute: {
        className: 'garage',
      },
      parent,
    })
    this.changeLogo()
    this.createForm.buttonSubmit.setEventListener('click', this.appendCar)
    emitter.subscribe(EmitterEnum.updateCars, this.changeLogo)
  }

  private changeLogo = async (): Promise<void> => {
    const array = await httpService.getCars()
    this.logo.innerText = `Garage(${array.length} cars)`
  }

  private appendCar = (): void => {
    httpService.addCar({ name: this.createForm.text, color: this.createForm.color })
    emitter.emit(EmitterEnum.updateCars)
  }
}
