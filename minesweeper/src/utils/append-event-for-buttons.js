export function appendEventForButtons(array, event, callback) {
  array.forEach((instanceButton) => instanceButton.element.addEventListener(event, callback))
}
