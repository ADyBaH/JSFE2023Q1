import { LevelsEnum } from '../shared/enums/levels-enums'
import { LocalStorageEnum } from '../shared/enums/local-storage-enum'

class LocalStorage {
  public setToLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  public get lastTask(): string {
    const lastTaskKey = LocalStorageEnum.lastTask
    const lastTask = localStorage.getItem(lastTaskKey)

    if (lastTask) {
      return lastTask
    }

    const level = LevelsEnum[0]
    this.setToLocalStorage(lastTaskKey, level)
    return level
  }

  public get completedTask(): string[] {
    const completedTaskKey = LocalStorageEnum.completedTask
    const completedTask = localStorage.getItem(completedTaskKey)

    if (completedTask) {
      return JSON.parse(completedTask)
    }
    this.setToLocalStorage(completedTaskKey, JSON.stringify([]))
    return []
  }
}

export const localStorageADyBaH = new LocalStorage()
