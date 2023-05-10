import { BaseComponent } from './base-component';

export class Footer extends BaseComponent {
  constructor(root) {
    super({ tag: 'footer', attr: { className: 'footer' }, parent: root });
    this.wrapper = new BaseComponent({ attr: { className: 'wrapper' }, parent: this.element });
    this.container = new BaseComponent({ attr: { className: 'container' }, parent: this.wrapper.element });
    this.github = new BaseComponent({
      tag: 'a',
      attr: {
        className: 'footer__github',
        textContent: 'github',
        target: '_blank',
        href: 'https://github.com/ADyBaH',
      },
    });
    this.by = new BaseComponent({
      tag: 'h2',
      attr: { className: 'footer__github', textContent: '© ADyBaH 2023' },
    });
    this.rssLogo = new BaseComponent({
      tag: 'span',
      attr: { className: 'footer__rss-logo', textContent: 'img' },
    });
    this.container.element.append(this.github.element, this.by.element, this.rssLogo.element);
  }
}
