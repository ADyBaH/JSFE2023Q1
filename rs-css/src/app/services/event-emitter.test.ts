import { emitter } from './event-emitter'

const eventEmitterStatus = {
  subscribeStatus: false,
}

test('Event emitter: subscribe test', () => {
  const testFunction = (): void => {
    eventEmitterStatus.subscribeStatus = !eventEmitterStatus.subscribeStatus
  }
  emitter.subscribe('testSubscribe', () => testFunction())
  emitter.emit('testSubscribe')
  expect(eventEmitterStatus.subscribeStatus).toBeTruthy()
})

test('Event emitter: unsubscribe test', () => {
  const testFunction = (): void => {
    eventEmitterStatus.subscribeStatus = !eventEmitterStatus.subscribeStatus
  }
  emitter.unsubscribe('testSubscribe', () => testFunction())
  emitter.emit('testSubscribe')
  expect(eventEmitterStatus.subscribeStatus).toBeTruthy()
})

test('Event emitter: clear event test', () => {
  const testFunction = (): void => {
    eventEmitterStatus.subscribeStatus = !eventEmitterStatus.subscribeStatus
  }
  emitter.subscribe('testSubscribe', () => testFunction())
  emitter.clear('testSubscribe')
  emitter.emit('testSubscribe')
  expect(eventEmitterStatus.subscribeStatus).toBeTruthy()
})

test('Event emitter: clear all events test', () => {
  const testFunction1 = (): void => {
    eventEmitterStatus.subscribeStatus = !eventEmitterStatus.subscribeStatus
  }
  const testFunction2 = (): void => {
    eventEmitterStatus.subscribeStatus = !eventEmitterStatus.subscribeStatus
  }
  const testFunction3 = (): void => {
    eventEmitterStatus.subscribeStatus = !eventEmitterStatus.subscribeStatus
  }
  emitter.subscribe('testSubscribe1', () => testFunction1())
  emitter.subscribe('testSubscribe2', () => testFunction2())
  emitter.subscribe('testSubscribe3', () => testFunction3())
  emitter.clear()
  emitter.emit('testSubscribe1')
  emitter.emit('testSubscribe2')
  emitter.emit('testSubscribe3')
  expect(eventEmitterStatus.subscribeStatus).toBeTruthy()
})
