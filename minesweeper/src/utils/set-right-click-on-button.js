export function setRightClickOnButton(buttonInstance) {
  const { isChecked } = buttonInstance
  buttonInstance.setStateButton({
    state: { isChecked: !isChecked },
    text: { textContent: buttonInstance.element.textContent === '' ? '🚩' : '' },
  })
}
