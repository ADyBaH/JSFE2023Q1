export class BaseComponent {
  constructor(props) {
    const { tag } = props;
    const element = document.createElement(tag || 'div');
    Object.assign(element, props);
    this.element = element;
  }
}
