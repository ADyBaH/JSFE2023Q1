import { screen } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { BaseComponent } from './base-component'

test('create base component', () => {
  const testComponent = new BaseComponent({ attribute: { textContent: 'Visible Example' }, parent: document.body })
  console.log(testComponent)
  expect(screen.getByText('Visible Example')).toBeVisible()
})

test('change innerHTML to base component', () => {
  const testComponent = new BaseComponent({ attribute: { className: 'test' } })
  testComponent.innerHTML = '<div>test div</div>'
  expect(testComponent.innerHTML).toBe('<div>test div</div>')
})

test('add className to base component', () => {
  const testComponent = new BaseComponent({ attribute: { className: 'test' } })
  testComponent.addClass('added-class')
  expect(testComponent.className).toBe('test added-class')
})

test('remove className to base component', () => {
  const testComponent = new BaseComponent({ attribute: { className: 'test remove-class' } })
  testComponent.removeClass('remove-class')
  expect(testComponent.className).toBe('test')
})

test('set class name to base component', () => {
  const testComponent = new BaseComponent({ attribute: { className: 'test remove-class' } })
  testComponent.setClassName('new-class')
  expect(testComponent.className).toBe('new-class')
})
