import { EmitterEnum } from '../../../../../../enum/emitter-enum'
import { emitter } from '../../../../../../services/event-emitter'

export const shakeElementDictionary = {
  true: (arrayElements: Element[]): void => {
    arrayElements.forEach((elements) => elements.classList.add('shake'))

    setTimeout(() => arrayElements.forEach((elements) => elements.classList.remove('shake')), 2000)
  },
  false: (arrayElements: Element[]): Element[] => {
    emitter.emit(EmitterEnum.shakeEditor)

    return arrayElements
  },
}
