import { LocalStorageEnum } from '../enum/local-storage-enum'
import { emitter } from './event-emitter'

class LocalStorage {
  constructor() {
    emitter.subscribe('resetLevels', () => this.clearCompletedLevels())
    emitter.subscribe('setToLastTask', (args: string) => this.setToLocalStorage(LocalStorageEnum.lastTask, args))
    emitter.subscribe('setupWin', (value: string): void => this.setCompletedTask(value))
  }
  public setToLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  public get lastTask(): string {
    const lastTaskKey = LocalStorageEnum.lastTask
    const lastTask = localStorage.getItem(lastTaskKey)

    if (lastTask) {
      return lastTask
    }

    const level = '1'
    this.setToLocalStorage(lastTaskKey, level)
    return level
  }

  public get completedTask(): string[] {
    const completedTaskKey = LocalStorageEnum.completedTask
    const completedTask = localStorage.getItem(completedTaskKey)

    if (completedTask) {
      return JSON.parse(completedTask)
    }
    this.setToLocalStorage(completedTaskKey, JSON.stringify(['1']))
    return ['1']
  }

  public setCompletedTask(value: string): void {
    const array = this.completedTask
    array.push(value)
    this.setToLocalStorage(LocalStorageEnum.completedTask, JSON.stringify(array))
  }

  private clearCompletedLevels(): void {
    this.setToLocalStorage(LocalStorageEnum.completedTask, JSON.stringify([]))
  }
}

export const localStorageADyBaH = new LocalStorage()
