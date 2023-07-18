import { urlServiceString } from '../constants/http-service-constants'
import type { Car } from '../types/car-type'
import { emitter } from './event-emitter'

export class HttpService {
  private serverUrl = urlServiceString
  constructor() {
    emitter.subscribe('addCar', this.addCar)
  }

  public async getCars(): Promise<Car[]> {
    const getCars = await fetch(`${this.serverUrl}/garage`)
    const getCarsJson = await getCars.json()
    return getCarsJson
  }

  public async addCar(object: { name: string; color: string }): Promise<void> {
    await fetch(`${this.serverUrl}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object),
    })
  }
}

export const httpService = new HttpService()
