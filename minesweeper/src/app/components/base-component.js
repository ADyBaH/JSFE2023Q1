export class BaseComponent {
  constructor({ tag, attr, parent }) {
    const element = document.createElement(tag || 'div');
    Object.assign(element, attr);
    this.element = element;
    if(parent) {
      parent.append(element)
    }
  }
}
