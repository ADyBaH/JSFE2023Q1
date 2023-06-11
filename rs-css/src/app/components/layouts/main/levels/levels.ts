import { BaseComponent } from '../../../../../utils/base-component'

export class Levels extends BaseComponent {
  public arrayButtons: HTMLButtonElement[] = []
  constructor(root: HTMLElement) {
    super({ attribute: { className: 'levels-block' }, parent: root })
    this.createButtons()
  }

  public createButtons(): HTMLButtonElement[] | void {
    // return Array.from({ length: 11 }, )
    console.log(
      Array.from(
        { length: 11 },
        (_, index) =>
          new BaseComponent({
            tag: 'button',
            attribute: { className: `levels-block__button level${index + 1}`, textContent: `level ${index + 1}` },
            parent: this.element,
          }),
      ),
    )
  }
}
