import { BaseComponent } from 'src/app/components/base-component'
import { httpService } from 'src/app/services/http-service'
import { emitter } from 'src/app/services/event-emitter'
import { EmitterEnum } from 'src/app/enum/emitter-enum'
import { GarageListComponent } from '../garage-list-component/garage-list-component'

export class GarageList extends BaseComponent {
  private logo = new BaseComponent({
    tag: 'h2',
    attribute: { className: 'garage-list__logo', textContent: 'Page #1' },
    parent: this.element,
  })

  private carsArrayPromise
  constructor(parent: HTMLElement) {
    super({ attribute: { className: 'garage-list' }, parent })
    this.carsArrayPromise = this.generateGarageComponents()
    emitter.subscribe(EmitterEnum.updateCars, this.generateGarageComponents)
  }

  private generateGarageComponents = async (): Promise<BaseComponent[]> => {
    this.removeAllChildren()
    const carsArray = await httpService.getCars()
    return carsArray.map((car) => new GarageListComponent(car, this.element))
  }
}
