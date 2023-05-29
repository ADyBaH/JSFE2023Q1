import { ResponseMethods } from '../model/response-methods.enum'
import { DataOrPost, Options, Resp } from '../types/custom-type'

class Loader {
  protected readonly baseLink: string
  protected readonly options: Options

  constructor(baseLink: string, options: Options) {
    this.baseLink = baseLink
    this.options = options
  }

  protected async getResp<Type extends DataOrPost>(
    { endpoint, sourceId }: Resp,
    callback: (data: Type) => void,
  ): Promise<void> {
    try {
      await this.load(ResponseMethods.GET, endpoint, callback, sourceId)
    } catch (error) {
      console.error(error)
    }
  }

  protected async load<T extends DataOrPost>(
    method: string,
    endpoint: string,
    callback: (data: T) => void,
    sourceId: string = '',
  ): Promise<void> {
    const response = await fetch(`${this.baseLink}${endpoint}?apiKey=${this.options.apiKey}&sources=${sourceId}`, {
      method,
    })

    if (!response.ok) {
      throw Error(response.statusText)
    }

    const data: T = await response.json()
    callback(data)
  }
}

export default Loader
