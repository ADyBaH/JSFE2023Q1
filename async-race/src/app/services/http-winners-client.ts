import { BASE_PATH } from '../constants/http-service-constants'
import type { WinnersType } from '../types/winners-type'
import { HttpMethods } from '../enum/http-methods.enum'
import { HttpHeadersJson } from './constants/http-headers-constants'
import { emitter } from './event-emitter'
import { EmitterEnum } from '../enum/emitter.enum'

export class HttpWinnersClient {
  private serverUrl = BASE_PATH

  constructor() {
    emitter.subscribe(EmitterEnum.AppendWinner, this.checkWinner)
  }

  public async getWinner(id: number): Promise<WinnersType | undefined> {
    const arrayWinners = await this.getWinners()
    return arrayWinners.find((winner) => winner.id === id)
  }

  public async getWinners(): Promise<WinnersType[]> {
    const fetchWinners = await fetch(`${this.serverUrl}/winners`)
    const arrayWinners = await fetchWinners.json()
    emitter.emit(EmitterEnum.UpdateWinnersLogo, arrayWinners.length)
    return arrayWinners
  }

  public async getPaginationWinners(numberPage: number | string): Promise<WinnersType[]> {
    const getWinners = await fetch(`${this.serverUrl}/winners?_page=${numberPage}&_limit=${10}`)
    const arrayWinners = await getWinners.json()
    return arrayWinners
  }

  public checkWinner = async (result: Omit<WinnersType, 'wins'>): Promise<void> => {
    const getCar = await this.getWinner(result.id)

    if (!getCar) {
      await this.addWinner(result)
      emitter.emit(EmitterEnum.GenerateWinners)
      return
    }
    if (getCar) {
      await this.updateWinner(getCar, result)
      emitter.emit(EmitterEnum.GenerateWinners)
    }
  }

  public async removeWinner(id: number): Promise<void> {
    const winner = await this.getWinner(id)
    if (winner) {
      await fetch(`${this.serverUrl}/winners/${id}`, {
        method: HttpMethods.Delete,
      })
    }
  }

  public addWinner = async (result: Omit<WinnersType, 'wins'>): Promise<void> => {
    await fetch(`${this.serverUrl}/winners`, {
      method: HttpMethods.Post,
      headers: HttpHeadersJson,
      body: JSON.stringify({ ...result, wins: 1 }),
    })
  }

  public async updateWinner({ id, time, wins }: WinnersType, newResult: Omit<WinnersType, 'wins'>): Promise<void> {
    await fetch(`${this.serverUrl}/winners/${id}`, {
      method: HttpMethods.Put,
      headers: HttpHeadersJson,
      body: JSON.stringify({ time: time > newResult.time ? newResult.time : time, wins: wins + 1 }),
    })
  }
}

export const httpWinnersClient = new HttpWinnersClient()
