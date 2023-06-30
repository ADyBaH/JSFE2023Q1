import { emitter } from '../../../../../../services/event-emitter'

export const shakeElementDictionary = {
  true: (arrayElements: Element[]): void => {
    arrayElements.forEach((elements) => elements.classList.add('shake'))
    setTimeout(() => arrayElements.forEach((elements) => elements.classList.remove('shake')), 2000)
  },
  false: (arrayElements: Element[]): Element[] => {
    emitter.emit('shakeEditor')
    return arrayElements
  },
}
