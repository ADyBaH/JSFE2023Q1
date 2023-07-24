import type { BaseComponent } from '../shared/base-component'

export class Router {
  private lastHashPath?: string
  private mainElement: HTMLElement
  private pages
  constructor(pages: Record<string, BaseComponent>, mainElement: HTMLElement) {
    window.addEventListener('hashchange', () => this.hashChangeEvent())
    this.mainElement = mainElement
    this.pages = pages
    this.hashChangeEvent()
  }

  public hashChangeEvent(): void {
    const [path] = window.location.hash.split('?')
    if (path === this.lastHashPath) {
      return
    }

    if (this.pages[path]) {
      this.mainElement.replaceChildren(this.pages[path].element)
    }
    if (!this.pages[path]) {
      this.mainElement.replaceChildren(this.pages.notFound.element)
    }
  }
}
