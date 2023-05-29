export interface Source {
  id: string
  name: string
}

export interface Post {
  author: string
  content: string
  description: string
  publishedAt: string
  source: Source
  title: string
  url: string
  urlToImage: string
}

export interface PostForSources {
  category: string
  country: string
  description: string
  id: string
  language: string
  name: string
  url: string
}

export interface ArrayPost {
  sources: PostForSources[]
  status: string
}

export interface ViewData {
  status: string
  totalResults: number
  articles: Post[]
}
