import type { BaseComponent } from '../components/base-component'

export type StatusCar = {
  id: number
  time: number
  isFinished: boolean
  carName: BaseComponent
  carColor: string
}
