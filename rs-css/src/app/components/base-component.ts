import { BaseComponentInterface } from '../modules/base-component-interface'

export class BaseComponent {
  public element
  constructor({ tag = 'div', attribute, parent }: BaseComponentInterface) {
    this.element = document.createElement(tag)
    Object.assign(this.element, attribute)
    if (parent) {
      parent.append(this.element)
    }
  }

  public set innerText(content: string) {
    this.element.innerText = content
  }

  public get innerText(): string {
    return this.element.innerText
  }

  public removeAllChields(): void {
    while (this.element.firstChild !== null) {
      if (this.element.firstChild !== null) {
        this.element.removeChild(this.element.firstChild)
      }
    }
  }

  public toggle(className: string): void {
    this.element.classList.toggle(className)
  }

  public setEventListener(name: string, callback: (event: Event) => void): void {
    this.element.addEventListener(name, callback)
  }
}
