export function setRightClickOnButton(buttonInstance) {
  if (buttonInstance.isChecked) {
    Object.assign(buttonInstance.element, { textContent: '' })
    Object.assign(buttonInstance, { isChecked: false })
    console.log(buttonInstance)
    return
  }
  Object.assign(buttonInstance.element, { textContent: '🚩' })
  Object.assign(buttonInstance, { isChecked: true })
  console.log(buttonInstance)
}
