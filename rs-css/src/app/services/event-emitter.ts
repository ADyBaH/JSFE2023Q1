import { CallbackType } from '../types/callback-type'

class EventEmitter<Str, Arguments> {
  private listeners = new Map()

  public subscribe(eventName: Str, callback: Arguments): void {
    const callbackArray = this.listeners.get(eventName) ?? []
    callbackArray.push(callback)
    this.listeners.set(eventName, callbackArray)
  }

  public unsubscribe(eventName: Str, callback: Arguments): void {
    const eventsArray = this.listeners.get(eventName)
    if (!eventsArray) {
      return
    }
    eventsArray.splice(eventsArray.indexOf(callback), 1)
  }

  public emit<StringName, Argument>(eventName: StringName, eventArgument?: Argument): void {
    const eventsArray = this.listeners.get(eventName)
    if (!eventsArray) {
      return
    }

    eventsArray.forEach((listener: CallbackType) => listener(eventArgument))
  }

  public clear(eventName?: Str): void {
    if (eventName) {
      this.listeners.set(eventName, [])
      return
    }
    this.listeners = new Map()
  }
}

export const emitter = new EventEmitter()
