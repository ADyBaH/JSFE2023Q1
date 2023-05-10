import { BaseComponent } from './components/base-component';

class App extends BaseComponent {
  constructor() {
    super({ className: 'root' });

  }

  init() {
    document.body.append(this.element);
  }
}
const a = new App().init();

console.log(a);
