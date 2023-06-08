import { Callback } from '../../../types/type'

export class Observer {
  private listeners: Callback[]
  constructor() {
    this.listeners = []
  }

  public added(listener: Callback): void {
    this.listeners.push(listener)
  }
  public delete(listener: Callback): void {
    const number: number = this.listeners.indexOf(listener)
    if (number !== -1) {
      this.listeners.splice(number, 1)
    }
  }
  public emit<T>(argument: T): void {
    this.listeners.forEach((listener: Callback) => listener(argument))
  }
}
