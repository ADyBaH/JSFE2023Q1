import { ArrayPost, ViewData } from './interface'

export type Options = {
  apiKey?: string
  sources?: string
}

export type Resp = {
  endpoint: string
  sourceId?: string
}

export type Environment = {
  BASE_URL: string
  API_KEY: string
}

export type DataOrPost = ViewData | ArrayPost
