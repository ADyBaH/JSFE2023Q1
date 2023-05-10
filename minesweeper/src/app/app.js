import { BaseComponent } from './components/base-component';
import { Header } from './components/header';

class App extends BaseComponent {
  constructor() {
    super({ className: 'root' });

  }

  init() {
    document.body.append(this.element);
    this.header = new Header(this.element);
  }
}
const a = new App().init();
