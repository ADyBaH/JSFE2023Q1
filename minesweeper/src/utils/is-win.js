export const isWin = (stateGame) =>
  stateGame.countOfCeil * stateGame.countOfCeil - stateGame.countOfMine === stateGame.numberOfOpenCeil
