import { HttpHeadersJson } from './constants/http-headers-constants'
import { BASE_PATH } from '../constants/http-service-constants'
import type { StatusEngine } from '../enum/status-engine-enum'
import { maxItemsInList } from '../constants/list-constants'
import { instanceRandomCars } from './random-cars-service'
import type { CarEngine } from '../types/car-engine-type'
import { HttpMethods } from '../enum/http-methods-enum'
import { EmitterEnum } from '../enum/emitter-enum'
import type { CarModel } from '../models/car.model'
import { emitter } from './event-emitter'

export class HttpService {
  private serverUrl = BASE_PATH

  public async getCar(id: number): Promise<CarModel> {
    const getCar = await fetch(`${this.serverUrl}/garage/${id}`)
    const getCarJson = await getCar.json()
    return getCarJson
  }

  public async getCars(): Promise<CarModel[]> {
    const getCars = await fetch(`${this.serverUrl}/garage`)
    const getCarsJson = await getCars.json()
    return getCarsJson
  }

  public async getPaginationCars(
    numberPage: number | string,
  ): Promise<{ arrayCars: CarModel[]; totalItems: string | null }> {
    const getCars = await fetch(`${this.serverUrl}/garage?_page=${numberPage}&_limit=${maxItemsInList}`)
    const arrayCars = await getCars.json()
    return { arrayCars, totalItems: getCars.headers.get('X-Total-Count') }
  }

  public async addCar(object: Omit<CarModel, 'id'>): Promise<void> {
    await fetch(`${this.serverUrl}/garage`, {
      method: HttpMethods.Post,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object),
    })
  }

  public async addCars(): Promise<void> {
    Promise.all(
      instanceRandomCars.generateRandomCars().map(async (randomCarObject: Omit<CarModel, 'id'>) => {
        await this.addCar(randomCarObject)
      }),
    ).then(() => emitter.emit(EmitterEnum.UpdateCars))
  }

  public async removeCar(id: number): Promise<void> {
    await fetch(`${this.serverUrl}/garage/${id}`, {
      method: HttpMethods.Delete,
    })
  }

  public async changeCar(object: Omit<CarModel, 'id'>, id: number): Promise<void> {
    await fetch(`${this.serverUrl}/garage/${id}`, {
      method: HttpMethods.Put,
      headers: HttpHeadersJson,
      body: JSON.stringify(object),
    })
  }

  public async changeStatusEngine(id: number, status: StatusEngine.Started | StatusEngine.Stopped): Promise<CarEngine> {
    const statusEngine = await fetch(`${this.serverUrl}/engine?id=${id}&status=${status}`, {
      method: HttpMethods.Patch,
    })
    return statusEngine.json()
  }

  public async isEngineWork(id: number): Promise<Response> {
    return fetch(`${this.serverUrl}/engine?id=${id}&status=drive`, {
      method: HttpMethods.Patch,
    })
  }
}

export const httpService = new HttpService()
