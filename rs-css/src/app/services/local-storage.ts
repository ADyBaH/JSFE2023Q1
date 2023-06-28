import { LocalStorageEnum } from '../enum/local-storage-enum'
import { emitter } from './event-emitter'

class LocalStorage {
  constructor() {
    emitter.subscribe('resetLevels', () => this.clearCompletedLevels())
    emitter.subscribe('setToLastTask', (args: string) => this.setToLocalStorage(LocalStorageEnum.lastTaskKey, args))
    emitter.subscribe('setupWin', (value: string): void => this.setCompletedTask(value))
    emitter.subscribe('setupHelp', (value: string): void => this.setHelpedTask(value))
  }
  public setToLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  public get lastTask(): string {
    const [lastTaskKey] = LocalStorageEnum.lastTaskKey
    const lastTask = localStorage.getItem(lastTaskKey)

    if (lastTask) {
      return lastTask
    }

    const level = '1'
    this.setToLocalStorage(lastTaskKey, level)
    return level
  }

  public get completedTask(): string[] {
    const [completedTaskKey] = LocalStorageEnum.completedTaskKey
    const completedTask = localStorage.getItem(completedTaskKey)

    if (completedTask) {
      return JSON.parse(completedTask)
    }
    this.setToLocalStorage(completedTaskKey, JSON.stringify([]))
    return []
  }
  public get helpedTask(): string[] {
    const [helpedTaskKey] = LocalStorageEnum.helpedTaskKey
    const helpedTask = localStorage.getItem(helpedTaskKey)

    if (helpedTask) {
      return JSON.parse(helpedTask)
    }
    this.setToLocalStorage(helpedTaskKey, JSON.stringify([]))
    return []
  }

  public setCompletedTask(value: string): void {
    const array = this.completedTask
    array.push(value)
    this.setToLocalStorage(LocalStorageEnum.completedTaskKey, JSON.stringify(array))
  }

  public setHelpedTask(value: string): void {
    const array = this.helpedTask
    array.push(value)
    this.setToLocalStorage(LocalStorageEnum.helpedTaskKey, JSON.stringify(array))
  }

  private clearCompletedLevels(): void {
    this.setToLocalStorage(LocalStorageEnum.completedTaskKey, JSON.stringify([]))
    this.setToLocalStorage(LocalStorageEnum.helpedTaskKey, JSON.stringify([]))
  }
}

export const localStorageADyBaH = new LocalStorage()
