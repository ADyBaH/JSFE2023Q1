import { BaseComponent } from 'src/app/components/base-component'

export class LiElement extends BaseComponent {
  constructor(attribute: Record<string, string>, parent: HTMLElement) {
    super({ tag: 'li', attribute, parent })
  }
}
