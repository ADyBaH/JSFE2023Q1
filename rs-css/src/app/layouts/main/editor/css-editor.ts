import { BaseComponent } from '../../../components/base-component'

export class CssEditor extends BaseComponent {
  private input = new BaseComponent({
    tag: 'input',
    attribute: { className: 'css-editor__input', placeholder: 'Type in a CSS selector' },
    parent: this.element,
  })
  private inputBlock = new BaseComponent({
    attribute: { className: 'css-editor__button-block' },
    parent: this.element,
  })
  public enterButton = new BaseComponent({
    tag: 'button',
    attribute: { textContent: 'Enter', className: 'css-editor__enter-button' },
    parent: this.inputBlock.element,
  })
  public helpButton = new BaseComponent({
    tag: 'button',
    attribute: { textContent: 'Help', className: 'css-editor__help-button' },
    parent: this.inputBlock.element,
  })
  constructor(root: HTMLElement) {
    super({ attribute: { className: 'css-editor' }, parent: root })
    this.inputBlock.element.insertAdjacentHTML(
      'afterend',
      `<br>
      <p class="css-editor__text"></p>
      <p class="css-editor__text">{</p>
      <p class="css-editor__text">/* Styles would go here. */</p>
      <p class="css-editor__text">}</p>
      <br>
      <p class="css-editor__text">/*</p>
      <p class="css-editor__text">Type a number to skip to a level.</p>
      <p class="css-editor__text">Ex → "5" for level 5</p><p class="css-editor__text">*/</p>`,
    )
  }
}
