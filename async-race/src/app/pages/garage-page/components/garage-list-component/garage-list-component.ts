import { BaseComponent } from 'src/app/components/base-component'
import { Button } from 'src/app/components/button'
import { carSvgString } from 'src/app/constants/car-svg-string'
import { EmitterEnum } from 'src/app/enum/emitter-enum'
import { emitter } from 'src/app/services/event-emitter'
import { httpService } from 'src/app/services/http-service'
import type { StatusCar } from 'src/app/types/status-car-type'
import type { Car } from 'src/app/types/car-type'

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
    this.statusCar = {
      id,
      time: 0,
      finished: false,
      isEngineWork: true,
    }

    this.buttonStart = new Button('garage-list__button', 'Start ▶', this.element)
    this.buttonStop = new Button('garage-list__button', 'Stop ⏹', this.element)
    this.buttonStop.disableButton()
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

    this.car = new BaseComponent({
      attribute: { className: 'garage-list__car-container', innerHTML: carSvgString },
      parent: this.roadContainer.element,
    })

    this.car.element.style.fill = color

    this.buttonRemove.setEventListener('click', this.removeCar)
    this.buttonSelect.setEventListener('click', this.selectCar)
    this.buttonStart.setEventListener('click', this.startCar)
    this.buttonStop.setEventListener('click', this.stopCar)
  }

  public removeCar = async (): Promise<void> => {
    await httpService.removeCar(this.statusCar.id)
    emitter.emit(EmitterEnum.updateCars)
  }

  private selectCar = (): void => {
    emitter.emit(EmitterEnum.selectCar, this.statusCar.id)
  }

  public startCar = async (): Promise<void> => {
    const { distance, velocity } = await httpService.changeStatusEngine(this.statusCar.id, 'started')

    this.buttonStart.disableButton()
    this.buttonStop.turnOnButton()
    this.animateCar(distance / velocity)
  }

  private stopCar = async (): Promise<void> => {
    await httpService.changeStatusEngine(this.statusCar.id, 'stopped')
    this.buttonStop.disableButton()
    this.buttonStart.turnOnButton()
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId)
    }
    this.resetCar()
  }

  private animateCar = async (time: number): Promise<void> => {
    let startTime: number = 0

    const interval = setInterval(async () => {
      this.statusCar.isEngineWork = await httpService.isEngineWork(this.statusCar.id)
    }, 1000)

    const move = (timeMove: number): void => {
      if (!startTime) {
        startTime = timeMove
      }

      const passedTime = timeMove - startTime
      const passedDistance = Math.round(passedTime * (100 / time))

      this.car.element.style.left = `calc(${Math.min(passedDistance, 100)}% - ${
        (this.car.element.clientWidth / 100) * passedDistance
      }px)`

      this.statusCar.time = Math.round(passedTime / 1000)
      if (passedDistance < 100 && this.statusCar.isEngineWork) {
        this.animationId = requestAnimationFrame(move)
        return
      }
      clearInterval(interval)
      this.buttonStart.turnOnButton()
      this.buttonStop.disableButton()
      this.statusCar.finished = true
    }

    this.animationId = requestAnimationFrame(move)
  }

  public resetCar = (): void => {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId)
    }
    this.animationId = null
    this.car.element.style.left = '0%'
    httpService.changeStatusEngine(this.statusCar.id, 'stopped')
  }
}
