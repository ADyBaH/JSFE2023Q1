import { LevelsEnum } from '../../enums/levels-enums'

class LocalStorage {
  public get lastTask(): string {
    const lastTask = localStorage.getItem('lastTaskADyBaH')
    if (lastTask) {
      return lastTask
    }

    const level = LevelsEnum[0]
    this.lastTask = level
    return level
  }
  public set lastTask(value: string) {
    localStorage.setItem('lastTaskADyBaH', value)
  }

  public set completedTask(value: string[]) {
    localStorage.setItem('completedTaskADyBaH', JSON.stringify(value))
  }

  public get completedTask(): string[] {
    const completedTask = localStorage.getItem('completedTaskADyBaH')
    console.log(completedTask)
    if (completedTask) {
      return JSON.parse(completedTask)
    }
    this.completedTask = []
    return []
  }
}

export const localStorageADyBaH = new LocalStorage()
