import { BaseComponent } from './components/base-component';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Main } from './components/main';

class App extends BaseComponent {
  constructor() {
    super({ attr: { className: 'root' }, parent: document.body });
  }

  init() {
    this.header = new Header(this.element);
    this.main = new Main(this.element);
    this.footer = new Footer(this.element);
  }
}
new App().init();
