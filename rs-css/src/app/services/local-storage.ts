import { arrayLevelsNames } from '../constants/array-levels-names-constant'
import { LocalStorageEnum } from '../enum/local-storage-enum'
import { EmitterEnum } from '../enum/emitter-enum'
import { emitter } from './event-emitter'

class LocalStorage {
  constructor() {
    emitter.subscribe(EmitterEnum.ResetLevels, () => this.clearCompletedLevels())
    emitter.subscribe(EmitterEnum.SetToLastTask, (args: string) =>
      this.setToLocalStorage(LocalStorageEnum.LastTaskKey, args),
    )
    emitter.subscribe(EmitterEnum.SetupWin, (value: string): void => this.setCompletedTask(value))
    emitter.subscribe(EmitterEnum.SetupHelp, (value: string): void => this.setHelpedTask(value))
  }
  public setToLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  public get lastTask(): string {
    const key = LocalStorageEnum.LastTaskKey
    const lastTask = localStorage.getItem(key)

    if (lastTask) {
      return lastTask
    }

    const level = arrayLevelsNames[0]
    this.setToLocalStorage(key, level)

    return level
  }

  public get completedTask(): string[] {
    const key = LocalStorageEnum.CompletedTaskKey
    const completedTask = localStorage.getItem(key)

    if (completedTask) {
      return JSON.parse(completedTask)
    }

    this.setToLocalStorage(key, JSON.stringify([]))

    return []
  }
  public get helpedTask(): string[] {
    const key = LocalStorageEnum.HelpedTaskKey
    const helpedTask = localStorage.getItem(key)

    if (helpedTask) {
      return JSON.parse(helpedTask)
    }

    this.setToLocalStorage(key, JSON.stringify([]))

    return []
  }

  public setCompletedTask(value: string): void {
    const array = this.completedTask

    if (!array.includes(value)) {
      array.push(value)
    }

    this.setToLocalStorage(LocalStorageEnum.CompletedTaskKey, JSON.stringify(array))
  }

  public setHelpedTask(value: string): void {
    const array = this.helpedTask

    if (!array.includes(value)) {
      array.push(value)
    }

    this.setToLocalStorage(LocalStorageEnum.HelpedTaskKey, JSON.stringify(array))
  }

  private clearCompletedLevels(): void {
    this.setToLocalStorage(LocalStorageEnum.CompletedTaskKey, JSON.stringify([]))
    this.setToLocalStorage(LocalStorageEnum.HelpedTaskKey, JSON.stringify([]))
  }
}

export const localStorageADyBaH = new LocalStorage()
