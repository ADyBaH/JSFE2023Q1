export function setToLocalStorage(text) {
  const listResults = localStorage.getItem('results') ? JSON.parse(localStorage.getItem('results')) : []

  if (listResults.length >= 10) {
    listResults.pop()
  }
  listResults.unshift(text)

  localStorage.setItem('results', JSON.stringify(listResults))
}
