import { urlServiceString } from '../constants/http-service-constants'
import type { Car } from '../types/car-type'
import { emitter } from './event-emitter'
import { instanceRandomCars } from './random-cars-service'

export class HttpService {
  private serverUrl = urlServiceString
  private nameCars = instanceRandomCars
  constructor() {
    emitter.subscribe('addCar', this.addCar)
    this.nameCars.generateRandomCar()
  }

  public async getCars(): Promise<Car[]> {
    const getCars = await fetch(`${this.serverUrl}/garage`)
    const getCarsJson = await getCars.json()
    return getCarsJson
  }

  public async addCar(object: Omit<Car, 'id'>): Promise<void> {
    await fetch(`${this.serverUrl}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object),
    })
  }

  public async addCars(): Promise<void> {
    instanceRandomCars.generateRandomCars().forEach(async (randomCarObject: Omit<Car, 'id'>) => {
      await this.addCar(randomCarObject)
    })
  }

  public async removeCar(id: number): Promise<void> {
    await fetch(`${this.serverUrl}/garage/${id}`, {
      method: 'DELETE',
    })
  }
}

export const httpService = new HttpService()
