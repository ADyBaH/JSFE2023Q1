import { BaseComponent } from '../../../components/base-component'
import { fileNamesDictionary } from '../../../shared/constants/file-names-dictionary'

export class FileBlock extends BaseComponent {
  public fileBlock: BaseComponent
  constructor(parent: HTMLElement, nameForLogoBlock: string) {
    super({ attribute: { className: `${nameForLogoBlock}-block` }, parent })
    this.element.innerHTML = `
      <div class="logo-block">
      <span class="logo-block_logo">${fileNamesDictionary[nameForLogoBlock].logo}</span>
      <span class="logo-block_file-name">${fileNamesDictionary[nameForLogoBlock].fileName}</span>
      </div>`
    this.fileBlock = new BaseComponent({
      attribute: {
        className: 'file-block',
        innerHTML: `<div class="file-block_numbers">${Array.from(
          { length: 15 },
          (_, index) => `<p class="file-block__number">${index + 1}</p>`,
        ).join('')}</div>`,
      },
      parent: this.element,
    })
  }
}
