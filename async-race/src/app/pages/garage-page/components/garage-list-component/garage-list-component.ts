import { httpWinnersClient } from 'src/app/services/http-winners-client'
import { BaseComponent } from 'src/app/shared/base-component'
import { buttonsTextConstants } from 'src/app/constants/buttons-text-enum'
import { carSvgString } from 'src/app/constants/car-svg-string'
import type { StatusCarModel } from 'src/app/models/status-car.model'
import { StatusEngine } from 'src/app/enum/status-engine.enum'
import { httpService } from 'src/app/services/http-service'
import { emitter } from 'src/app/services/event-emitter'
import { EmitterEnum } from 'src/app/enum/emitter.enum'
import { Button } from 'src/app/shared/button'
import { ResponseEnum } from 'src/app/enum/response.enum'
import type { CarModel } from 'src/app/models/car.model'
import { thousandMilliseconds } from '../../constants/thousand-milliseconds'
import { initialCarPosition } from '../../constants/initial-car-position'
import { initialRaceTime } from '../../constants/initial-race-time'
import { maxDistanceRace } from '../../constants/max-distance-race'
import { carWidth } from '../../constants/width-car'
import './garage-list-component.scss'

export class GarageListComponent extends BaseComponent {
  private car
  private nameCar
  private buttonStart = new Button('garage-list__button', buttonsTextConstants.Start, this.element)
  private buttonStop = new Button('garage-list__button', buttonsTextConstants.Stop, this.element)
  private buttonSelect = new Button('garage-list__button', buttonsTextConstants.Select, this.element)
  private buttonRemove = new Button('garage-list__button', buttonsTextConstants.Remove, this.element)
  private roadContainer
  private animationId: number = 0
  private statusCar: StatusCarModel

  constructor({ name, color, id }: CarModel, parent: HTMLElement) {
    super({ attribute: { className: 'garage-list__component' }, parent })

    this.buttonStop.setDisableStatus(true)

    this.nameCar = new BaseComponent({
      tag: 'span',
      attribute: { className: 'garage-list__name-car', textContent: name },
      parent: this.element,
    })

    this.roadContainer = new BaseComponent({
      attribute: { className: 'garage-list__road-container' },
      parent: this.element,
    })

    this.car = new BaseComponent({
      attribute: { className: 'garage-list__car-container', innerHTML: carSvgString },
      parent: this.roadContainer.element,
    })

    this.car.element.style.fill = color

    this.statusCar = {
      id,
      time: initialRaceTime,
      isFinished: true,
      carName: this.nameCar,
      carColor: color,
    }

    this.buttonRemove.setEventListener('click', this.removeCar)
    this.buttonSelect.setEventListener('click', this.selectCar)
    this.buttonStart.setEventListener('click', this.startCar)
    this.buttonStop.setEventListener('click', this.stopCar)
  }

  public removeCar = async (): Promise<void> => {
    await httpService.removeCar(this.statusCar.id)
    await httpWinnersClient.removeWinner(this.statusCar.id)
    emitter.emit(EmitterEnum.UpdateCars)
    emitter.emit(EmitterEnum.GenerateWinners)
  }

  private selectCar = (): void => {
    emitter.emit(EmitterEnum.SelectCar, this.statusCar)
  }

  public startCar = async (): Promise<StatusCarModel | null> => {
    this.buttonStart.setDisableStatus(true)

    const { distance, velocity } = await httpService.changeStatusEngine(this.statusCar.id, StatusEngine.Started)

    this.buttonStop.setDisableStatus(false)

    return this.animateCar(distance / velocity)
  }

  private stopCar = async (): Promise<void> => {
    this.resetCar()
  }

  private animateCar = async (time: number): Promise<StatusCarModel | null> => {
    let startTime: number = 0

    const move = (timeMove: number): void => {
      if (!startTime) {
        startTime = timeMove
      }

      const passedTime = timeMove - startTime
      const passedDistance = Math.round(passedTime * (maxDistanceRace / time))

      this.car.element.style.left = `calc(${Math.min(passedDistance, maxDistanceRace)}% - ${
        (carWidth / maxDistanceRace) * passedDistance
      }px)`

      this.statusCar.time = Number((passedTime / thousandMilliseconds).toFixed(2))

      if (passedDistance < maxDistanceRace && this.statusCar.isFinished) {
        this.animationId = requestAnimationFrame(move)
      }
    }

    this.animationId = requestAnimationFrame(move)
    const response = await httpService.isEngineWork(this.statusCar.id)
    if (response.status === ResponseEnum.Error500) {
      this.car.addClass('fire')
      this.statusCar.isFinished = false
      throw Error('Engine broken')
    }
    return this.statusCar
  }

  public resetCar = async (): Promise<void> => {
    this.buttonStop.setDisableStatus(true)
    this.car.removeClass('fire')
    cancelAnimationFrame(this.animationId)
    this.animationId = 0
    this.car.element.style.left = initialCarPosition
    await httpService.changeStatusEngine(this.statusCar.id, StatusEngine.Stopped)
    this.buttonStart.setDisableStatus(false)
  }
}
