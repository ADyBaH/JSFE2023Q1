import { BaseComponent } from '../../utils/base-component'

export const levelsHeaderDictionary = {
  completedTask: {
    true: (baseComponent: BaseComponent, className: string): void => baseComponent.addClass(className),
    false: (baseComponent: BaseComponent, className: string): void => baseComponent.removeClass(className),
  },
  helpedTask: {
    true: (baseComponent: BaseComponent, className: string): void => baseComponent.addClass(className),
    false: (baseComponent: BaseComponent, className: string): void => baseComponent.removeClass(className),
  },
}
