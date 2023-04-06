import PressAnyKey from 'press-any-key'

const gameInfo = async (game) => {
  console.log('************************************************')
  console.log('Game Status: ', game.state.description)
  console.log('Players count: ', !!game.player ? 1 : 0)
  console.log('Items count: ', game.items.count)
  console.log('Places count: ', game.places.count)
  console.log('Paths count: ', game.paths.count)
  console.log('Describes count: ', game.describes.count)
  console.log('Game status: ', game.state.description)
  console.log('Player state: ', game.player.alive ? 'живий' : 'загинув')
  console.log('Player place: ', game.player.place.name)
  console.log('Player in hands: ', game.player.inHands.map((h) => h.name).join(', '))
  console.log('************************************************')
  await PressAnyKey('Тицьніть будь-яку клавішу для продовження')
}

export const useUtils = () => {
  return {
    gameInfo
  }
}
