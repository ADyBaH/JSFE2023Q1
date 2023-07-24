import { instanceRandomCars } from 'src/app/services/random-cars-service'
import { Pagination } from 'src/app/components/pagination/pagination'
import { BaseComponent } from 'src/app/components/base-component'
import { ButtonsTextEnum } from 'src/app/enum/buttons-text-enum'
import { httpService } from 'src/app/services/http-service'
import { emitter } from 'src/app/services/event-emitter'
import { EmitterEnum } from 'src/app/enum/emitter-enum'
import { Button } from 'src/app/components/button'
import type { StatusCar } from 'src/app/types/status-car-type'
import { defaultGarageLogo } from './constants/default-garage-logo'
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
  private changeForm = new GarageForm('change-form', 'Change Car', this.inputsContainer.element)

  private buttonsContainer = new BaseComponent({
    attribute: { className: 'buttons-container' },
    parent: this.inputsContainer.element,
  })

  private buttonRace = new Button('button-race', ButtonsTextEnum.Race, this.buttonsContainer.element)
  private buttonReset = new Button('button-reset', ButtonsTextEnum.Reset, this.buttonsContainer.element)
  private buttonGenerateCar = new Button(
    'button-generate-car',
    ButtonsTextEnum.GenerateCar,
    this.buttonsContainer.element,
  )

  private logo = new BaseComponent({
    tag: 'h1',
    attribute: {
      className: 'garage__logo',
      textContent: defaultGarageLogo,
    },
    parent: this.element,
  })

  private paginationGarage = new Pagination(this.garageState, this.element, EmitterEnum.ChangeNumberGaragePage)
  private garageList = new GarageList(this.element)

  constructor(parent?: HTMLElement) {
    super({
      attribute: {
        className: 'garage',
      },
      parent,
    })

    this.buttonReset.disableButton()
    this.changeForm.addClass('change-form_hide')

    this.buttonRace.setEventListener('click', this.startRace)
    this.buttonReset.setEventListener('click', this.resetRace)
    this.buttonGenerateCar.setEventListener('click', this.appendCars)
    this.createForm.buttonSubmit.setEventListener('click', this.appendCar)
    this.changeForm.buttonSubmit.setEventListener('click', this.changeCar)

    emitter.subscribe(EmitterEnum.ChangeLogo, this.changeLogo)
    emitter.subscribe(EmitterEnum.SelectCar, this.selectCar)
    emitter.subscribe(EmitterEnum.SelectCar, this.showChangeForm)
    emitter.subscribe(EmitterEnum.ChangeNumberGaragePage, this.resetRace)
    emitter.subscribe(EmitterEnum.UnlockGaragePaginationButtons, this.paginationGarage.checkButtons)
    emitter.subscribe(EmitterEnum.LockGaragePaginationButtons, this.paginationGarage.disableAllPaginationButtons)
    emitter.subscribe(EmitterEnum.HideChangeCarForm, this.hideChangeForm)
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
    emitter.emit(EmitterEnum.UpdateCars)
  }

  private appendCars = async (): Promise<void> => {
    await httpService.addCars()
  }

  private selectCar = (car: StatusCar): void => {
    this.garageState.changeCar = car
    this.changeForm.text = this.garageState.changeCar.carName.innerText
    this.changeForm.color = this.garageState.changeCar.carColor
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

    const getCarFromServer = await httpService.getCar(this.garageState.changeCar.id)
    if (!getCarFromServer.name) {
      this.hideChangeForm()
      this.garageState.changeCar = null
      return
    }

    const nameCar = this.changeForm.text || getCarFromServer.name
    await httpService.changeCar({ name: nameCar, color: this.changeForm.color }, this.garageState.changeCar.id)
    this.garageState.changeCar = null
    this.hideChangeForm()
    emitter.emit(EmitterEnum.UpdateCars)
  }
}
