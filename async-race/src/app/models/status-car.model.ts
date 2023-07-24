import type { BaseComponent } from '../shared/base-component'

export interface StatusCarModel {
  id: number
  time: number
  isFinished: boolean
  carName: BaseComponent
  carColor: string
}
