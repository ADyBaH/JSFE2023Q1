import { BaseComponent } from 'src/app/components/base-component'

export class GarageForm extends BaseComponent {
  private fieldset = new BaseComponent({
    tag: 'fieldset',
    parent: this.element,
  })

  private inputText
  private inputColor
  public buttonSubmit

  constructor(className: string, legendName: string, parent: HTMLElement) {
    super({
      tag: 'form',
      attribute: {
        className,
      },
      parent,
    })
    this.inputText = new BaseComponent({
      tag: 'input',
      attribute: {
        className: `${className}__input`,
        type: 'text',
        placeholder: 'Title',
      },
      parent: this.fieldset.element,
    })

    this.inputColor = new BaseComponent({
      tag: 'input',
      attribute: {
        className: `${className}__color`,
        type: 'color',
      },
      parent: this.fieldset.element,
    })

    this.buttonSubmit = new BaseComponent({
      tag: 'button',
      attribute: {
        className: `${className}__button`,
        type: 'submit',
        textContent: legendName.split(' ')[0],
      },
      parent: this.fieldset.element,
    })
    this.fieldset.element.insertAdjacentHTML('beforeend', `<legend class="${className}__legend">${legendName}</legend>`)
  }

  public set color(value: string) {
    if (this.inputColor.element instanceof HTMLInputElement) {
      this.inputColor.element.value = `#${value}`
    }
  }

  public get color(): string {
    if (this.inputColor.element instanceof HTMLInputElement) {
      return this.inputColor.element.value
    }
    return ''
  }

  public set text(value: string) {
    if (this.inputText.element instanceof HTMLInputElement) {
      this.inputText.element.value = value
    }
  }

  public get text(): string {
    if (this.inputText.element instanceof HTMLInputElement) {
      return this.inputText.element.value
    }
    return ''
  }
}
