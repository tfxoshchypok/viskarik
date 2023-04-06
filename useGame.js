import Game from './api/game'

const game = new Game()

export const useGame = () => {
  return {
    game
  }
}
