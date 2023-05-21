export function setOnButton(buttonInstance, content) {
  buttonInstance.setStateButton({
    state: { isOpen: true },
    text: { textContent: content },
  })
}
