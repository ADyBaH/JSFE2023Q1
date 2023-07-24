import { BaseComponent } from 'src/app/components/base-component'
import { ButtonsTextEnum } from 'src/app/enum/buttons-text-enum'
import { carSvgString } from 'src/app/constants/car-svg-string'
import type { StatusCar } from 'src/app/types/status-car-type'
import { StatusEngine } from 'src/app/enum/status-engine-enum'
import { httpService } from 'src/app/services/http-service'
import { emitter } from 'src/app/services/event-emitter'
import { EmitterEnum } from 'src/app/enum/emitter-enum'
import { Button } from 'src/app/components/button'
import type { Car } from 'src/app/types/car-type'
import { thousandMilliseconds } from '../../constants/thousand-milliseconds'
import { defaultValueLeft } from '../../constants/default-value-left'
import { defaultTime } from '../../constants/default-time'
import { maxRange } from '../../constants/max-range'
import { carWidth } from '../../constants/width-car'
import './garage-list-component.scss'

export class GarageListComponent extends BaseComponent {
  private car
  private nameCar
  private buttonStop
  private buttonStart
  private buttonSelect
  private buttonRemove
  private roadContainer
  private animationId: number | null = null
  private statusCar: StatusCar

  constructor({ name, color, id }: Car, parent: HTMLElement) {
    super({ attribute: { className: 'garage-list__component' }, parent })

    this.buttonStart = new Button('garage-list__button', ButtonsTextEnum.Start, this.element)
    this.buttonStop = new Button('garage-list__button', ButtonsTextEnum.Stop, this.element)
    this.buttonStop.disableButton()
    this.buttonSelect = new Button('garage-list__button', ButtonsTextEnum.Select, this.element)
    this.buttonRemove = new Button('garage-list__button', ButtonsTextEnum.Remove, this.element)

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
      time: defaultTime,
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
    emitter.emit(EmitterEnum.UpdateCars)
  }

  private selectCar = (): void => {
    emitter.emit(EmitterEnum.SelectCar, this.statusCar)
  }

  public startCar = async (): Promise<StatusCar | null> => {
    const { distance, velocity } = await httpService.changeStatusEngine(this.statusCar.id, StatusEngine.Started)

    this.buttonStart.disableButton()
    this.buttonStop.turnOnButton()

    return this.animateCar(distance / velocity)
  }

  private stopCar = async (): Promise<void> => {
    await httpService.changeStatusEngine(this.statusCar.id, StatusEngine.Stopped)

    this.buttonStop.disableButton()
    this.buttonStart.turnOnButton()

    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId)
    }

    this.resetCar()
  }

  private animateCar = async (time: number): Promise<StatusCar | null> => {
    let startTime: number = 0

    const move = async (timeMove: number): Promise<void> => {
      if (!startTime) {
        startTime = timeMove
      }

      const passedTime = timeMove - startTime
      const passedDistance = Math.round(passedTime * (maxRange / time))

      this.car.element.style.left = `calc(${Math.min(passedDistance, maxRange)}% - ${
        (carWidth / maxRange) * passedDistance
      }px)`

      this.statusCar.time = Number((passedTime / thousandMilliseconds).toFixed(2))
      if (passedDistance < maxRange && this.statusCar.isFinished) {
        this.animationId = requestAnimationFrame(move)
        return
      }
      this.buttonStart.turnOnButton()
    }

    this.animationId = requestAnimationFrame(move)
    this.statusCar.isFinished = await httpService.isEngineWork(this.statusCar.id)

    await httpService.changeStatusEngine(this.statusCar.id, StatusEngine.Stopped)
    if (!this.statusCar.isFinished) {
      throw Error()
    }
    if (this.statusCar.isFinished) {
      return this.statusCar
    }
    return null
  }

  public resetCar = async (): Promise<void> => {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId)
    }
    this.animationId = null
    this.car.element.style.left = defaultValueLeft
    this.buttonStop.disableButton()
    this.buttonStart.turnOnButton()
    await httpService.changeStatusEngine(this.statusCar.id, StatusEngine.Stopped)
  }
}
