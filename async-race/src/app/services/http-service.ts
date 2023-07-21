import { urlServiceString } from '../constants/http-service-constants'
import { instanceRandomCars } from './random-cars-service'
import type { CarEngine } from '../types/cat-engine-type'
import type { Car } from '../types/car-type'
import { emitter } from './event-emitter'
import { maxItemsInList } from '../constants/list-constants'

export class HttpService {
  private serverUrl = urlServiceString
  private nameCars = instanceRandomCars
  constructor() {
    emitter.subscribe('addCar', this.addCar)
    this.nameCars.generateRandomCar()
  }

  public async getCar(id: number): Promise<Car> {
    const getCar = await fetch(`${this.serverUrl}/garage/${id}`)
    const getCarJson = await getCar.json()
    return getCarJson
  }

  public async getCars(): Promise<Car[]> {
    const getCars = await fetch(`${this.serverUrl}/garage`)
    const getCarsJson = await getCars.json()
    return getCarsJson
  }

  public async getPaginationCars(
    numberPage: number | string,
    maxItems: number | string = maxItemsInList,
  ): Promise<{ arrayCars: Car[]; totalItems: string | null }> {
    const getCars = await fetch(`${this.serverUrl}/garage?_page=${numberPage}&_limit=${maxItems}`)
    const arrayCars = await getCars.json()
    return { arrayCars, totalItems: getCars.headers.get('X-Total-Count') }
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

  public async changeCar(object: Omit<Car, 'id'>, id: number): Promise<void> {
    await fetch(`${this.serverUrl}/garage/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object),
    })
  }

  public async changeStatusEngine(id: number, status: 'started' | 'stopped'): Promise<CarEngine> {
    const statusEngine = await fetch(`${this.serverUrl}/engine?id=${id}&status=${status}`, {
      method: 'PATCH',
    })
    return statusEngine.json()
  }

  public async isEngineWork(id: number): Promise<boolean> {
    const statusEngine = await fetch(`${this.serverUrl}/engine?id=${id}&status=drive`, {
      method: 'PATCH',
    })

    return statusEngine?.status !== 500
  }
}

export const httpService = new HttpService()
