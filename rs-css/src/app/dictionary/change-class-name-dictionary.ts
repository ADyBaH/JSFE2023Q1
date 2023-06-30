import { BaseComponent } from '../../utils/base-component'

export const changeClassNameDictionary = {
  true: (baseComponent: BaseComponent, className: string): void => baseComponent.addClass(className),
  false: (baseComponent: BaseComponent, className: string): void => baseComponent.removeClass(className),
}
