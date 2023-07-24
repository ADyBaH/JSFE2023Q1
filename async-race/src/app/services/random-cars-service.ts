import namesCarsData from 'src/assets/data/name-cars.json'
import type { NameCarsType } from '../types/names-cars-type'
import type { CarModel } from '../models/car.model'
import { numbersRandomCars } from './constants/random-cars-constants'

class RandomCars {
  private namesCars: NameCarsType = namesCarsData

  private getRandomName(arrayNames: string[]): string {
    return arrayNames[Math.floor(Math.random() * arrayNames.length)]
  }

  private getRandomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }

  public generateRandomCar(): Omit<CarModel, 'id'> {
    return {
      name: `${this.getRandomName(this.namesCars.arrayNames)} ${this.getRandomName(this.namesCars.arraySubNames)}`,
      color: this.getRandomColor(),
    }
  }

  public generateRandomCars(): Omit<CarModel, 'id'>[] {
    return Array.from({ length: numbersRandomCars }, () => ({
      name: `${this.getRandomName(this.namesCars.arrayNames)} ${this.getRandomName(this.namesCars.arraySubNames)}`,
      color: this.getRandomColor(),
    }))
  }
}

export const instanceRandomCars = new RandomCars()
