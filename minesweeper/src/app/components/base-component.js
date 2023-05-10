export class BaseComponent {
  constructor(props) {
    const { tag, attr, parent } = props;
    const element = document.createElement(tag || 'div');
    Object.assign(element, attr);
    this.element = element;
    if(parent) {
      parent.append(element)
    }
  }
}
