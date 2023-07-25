import type { WinnersCarType } from '../types/winners-car-type'

export const winnersSortDictionary = {
  wins: (arrayWinners: WinnersCarType[], direction: number): WinnersCarType[] =>
    arrayWinners.sort((a, b) => (a.wins - b.wins) * direction),

  time: (arrayWinners: WinnersCarType[], direction: number): WinnersCarType[] =>
    arrayWinners.sort((a, b) => (a.time - b.time) * direction),
}
