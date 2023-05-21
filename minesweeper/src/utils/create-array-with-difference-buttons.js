import { BaseComponent } from './base-component'

export function createArrayWithDifferenceButtons(parent) {
  return ['easy', 'medium', 'hard'].map(
    (string) =>
      new BaseComponent({
        tag: 'button',
        attr: { className: `options__button options__button_${string}`, textContent: string },
        parent,
      }),
  )
}
