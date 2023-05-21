import { BaseComponent } from '../../../../utils/base-component'
import { setTextToModal } from '../../../../utils/set-text-to-modal'

export class AbsoluteButtonsBlock extends BaseComponent {
  constructor(parent, state, modal) {
    super({ attr: { className: 'absolute-button-block' }, parent })
    this.state = state
    this.modal = modal
    this.theme = new BaseComponent({
      tag: 'button',
      attr: { className: 'absolute-button-block__theme', textContent: '🌒' },
      parent: this.element,
      events: [
        {
          name: 'click',
          callback: () => this.toggleTheme(),
        },
      ],
    })
    this.sound = new BaseComponent({
      tag: 'button',
      attr: { className: 'absolute-button-block__sound', textContent: '🔈' },
      parent: this.element,
      events: [
        {
          name: 'click',
          callback: () => this.toggleSound(),
        },
      ],
    })
    this.score = new BaseComponent({
      tag: 'button',
      attr: { className: 'absolute-button-block__score', textContent: '🔝' },
      parent: this.element,
      events: [
        {
          name: 'click',
          callback: () => this.toggleScore(),
        },
      ],
    })
  }

  toggleTheme() {
    this.state.theme = this.theme.element.textContent === '☀️' ? 'light-theme' : 'dark-theme'
    document.body.className = this.state.theme
    this.theme.element.textContent = this.theme.element.textContent === '☀️' ? '🌒' : '☀️'
  }

  toggleSound() {
    this.sound.element.textContent = this.sound.element.textContent === '🔈' ? '🔇' : '🔈'
    this.state.isSound = !this.state.isSound
  }

  toggleScore() {
    const checkActive = (isActive) =>
      isActive
        ? this.modal.element.classList.add('game__modal_hide')
        : this.modal.element.classList.remove('game__modal_hide')

    checkActive(this.score.element.classList.contains('active'))

    Object.assign(this.modal.text.element, { className: 'game__modal_logo' })
    this.score.element.classList.toggle('active')
    setTextToModal(this.modal.text.element, JSON.parse(localStorage.getItem('results')).join('\n\n'))
  }
}
