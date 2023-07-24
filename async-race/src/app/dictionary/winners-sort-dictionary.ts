import type { WinnersCarType } from '../types/winners-car-type'

export const winnersSortDictionary = {
  'wins-up': (arrayWinners: WinnersCarType[]): WinnersCarType[] => arrayWinners.sort((a, b) => a.wins - b.wins),
  'wins-down': (arrayWinners: WinnersCarType[]): WinnersCarType[] => arrayWinners.sort((a, b) => b.wins - a.wins),
  'time-up': (arrayWinners: WinnersCarType[]): WinnersCarType[] => arrayWinners.sort((a, b) => a.time - b.time),
  'time-down': (arrayWinners: WinnersCarType[]): WinnersCarType[] => arrayWinners.sort((a, b) => b.time - a.time),
}
