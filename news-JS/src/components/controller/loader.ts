import { ResponseCodes } from '../model/response-codes.enum'
import { DrawNews, DrawSources, Options, Resp } from '../types/appTypes'

class Loader {
  protected readonly baseLink: string
  protected readonly options: Options
  // constructor(baseLink, options) {
  constructor(baseLink: string, options: Options) {
    this.baseLink = baseLink
    this.options = options
  }

  private getIsResponseError(response: Response): boolean {
    return response.status === ResponseCodes.Unauthorized || response.status === ResponseCodes.NotFound
  }

  protected getResp<Type extends DrawNews | DrawSources>(
    { endpoint, options }: Resp,
    callback: (data: Type) => void = (): void => {
      console.error('No callback for GET response')
      // throw new Error('No callback for GET response');
    },
  ): void {
    this.load('GET', endpoint, callback, options)
  }

  protected errorHandler(response: Response): Response {
    if (this.getIsResponseError(response)) {
      throw Error(response.statusText)
    }
    return response
  }

  // makeUrl(options, endpoint) {
  protected makeUrl(options: Options | undefined, endpoint: string): string {
    const urlOptions: Options = { ...this.options, ...options }
    let url = `${this.baseLink}${endpoint}?`

    ;(Object.keys(urlOptions) as (keyof Options)[]).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`
    })
    return url.slice(0, -1)
  }

  // load(method, endpoint, callback, options = {}) {
  // load(method: string, endpoint: string, callback: (data: string) => void, options: Options) {
  protected load<T extends DrawNews | DrawSources>(
    method: string,
    endpoint: string,
    callback: (data: T) => void,
    options?: Options,
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err))
  }
}

export default Loader
