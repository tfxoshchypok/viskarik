const gameStarting = Symbol('Гра стартувала')
const gameContinues = Symbol('Гра триває')
const playerWon = Symbol('Гравець переміг!')
const playerDie = Symbol('Гравець загинув :(')

export const useGameStatuses = () => {
  return {
    gameStarting, gameContinues, playerWon, playerDie
  }
}
