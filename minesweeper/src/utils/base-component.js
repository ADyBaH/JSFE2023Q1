export class BaseComponent {
  constructor({ tag, attr, parent, events }) {
    const element = document.createElement(tag ?? 'div')
    Object.assign(element, attr)
    this.element = element
    if (parent) {
      parent.append(element)
    }
    if (events) {
      events.forEach(({ name, callback }) => element.addEventListener(name, callback))
    }
  }
}
