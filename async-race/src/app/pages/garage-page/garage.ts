import { instanceRandomCars } from 'src/app/services/random-cars-service'
import { Pagination } from 'src/app/components/pagination/pagination'
import { BaseComponent } from 'src/app/components/base-component'
import { httpService } from 'src/app/services/http-service'
import { emitter } from 'src/app/services/event-emitter'
import { EmitterEnum } from 'src/app/enum/emitter-enum'
import { Button } from 'src/app/components/button'
import { GarageList } from './components/garage-list/garage-list'
import { GarageForm } from './components/form/garage-form'
import { garageState } from './garage-state'
import './garage.scss'

export class Garage extends BaseComponent {
  private garageState = garageState
  private inputsContainer = new BaseComponent({
    attribute: { className: 'inputs-container' },
    parent: this.element,
  })

  private createForm = new GarageForm('garage-form', 'Create Car', this.inputsContainer.element)
  private changeForm = new GarageForm('change-form change-form_hide', 'Change Car', this.inputsContainer.element)
  private buttonRace = new Button('button-race button', 'Race', this.inputsContainer.element)
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

  private paginationGarage = new Pagination(this.garageState, this.element)
  private garageList = new GarageList(this.element)

  constructor(parent?: HTMLElement) {
    super({
      attribute: {
        className: 'garage',
      },
      parent,
    })
    this.buttonReset.disableButton()
    this.createForm.buttonSubmit.setEventListener('click', this.appendCar)
    this.changeForm.buttonSubmit.setEventListener('click', this.changeCar)
    this.buttonGenerateCar.setEventListener('click', this.appendCars)
    this.buttonRace.setEventListener('click', this.startRace)
    this.buttonReset.setEventListener('click', this.resetRace)
    emitter.subscribe(EmitterEnum.changeLogo, this.changeLogo)
    emitter.subscribe(EmitterEnum.changeNumberPage, this.resetRace)
    emitter.subscribe(EmitterEnum.selectCar, this.selectCar)
    emitter.subscribe(EmitterEnum.selectCar, this.showChangeForm)
    emitter.subscribe(EmitterEnum.lockGaragePaginationButtons, this.paginationGarage.disableAllPaginationButtons)
    emitter.subscribe(EmitterEnum.unlockGaragePaginationButtons, this.paginationGarage.checkButtons)
  }

  private startRace = (): void => {
    this.garageList.resetRace()
    this.buttonRace.disableButton()
    this.buttonReset.turnOnButton()
    this.garageList.startRace()
  }

  private resetRace = (): void => {
    this.buttonRace.turnOnButton()
    this.buttonReset.disableButton()
    this.garageList.resetRace()
  }

  private changeLogo = (numberCars: string): void => {
    this.logo.innerText = `Garage(${numberCars} cars)`
  }

  private appendCar = async (): Promise<void> => {
    const nameCar = this.createForm.text || instanceRandomCars.generateRandomCar().name
    await httpService.addCar({ name: nameCar, color: this.createForm.color })
    emitter.emit(EmitterEnum.updateCars)
  }

  private appendCars = async (): Promise<void> => {
    await httpService.addCars()
    emitter.emit(EmitterEnum.updateCars)
  }

  private selectCar = (numberCar: number): void => {
    this.garageState.changeCar = numberCar
  }

  private hideChangeForm = (): void => {
    this.changeForm.addClass('change-form_hide')
  }

  private showChangeForm = (): void => {
    this.changeForm.removeClass('change-form_hide')
  }

  private changeCar = async (): Promise<void> => {
    if (!this.garageState.changeCar) {
      return
    }

    const getCarFromServer = await httpService.getCar(this.garageState.changeCar)
    if (!getCarFromServer.name) {
      this.hideChangeForm()
      this.garageState.changeCar = null
      return
    }

    const nameCar = this.changeForm.text || instanceRandomCars.generateRandomCar().name
    await httpService.changeCar({ name: nameCar, color: this.changeForm.color }, this.garageState.changeCar)
    this.garageState.changeCar = null
    this.hideChangeForm()
    emitter.emit(EmitterEnum.updateCars)
  }
}
