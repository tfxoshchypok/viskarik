import {useGame} from './useGame'

const {game} = useGame()

const spider = game.places.create({name: 'Spider', alive: true})
const cave = game.places.create({name: 'Cave'})
const caveEntrance = game.places.create({name: 'Cave Entrance'})
const meadow = game.places.create({name: 'Meadow'})
const building = game.places.create({name: 'Building'})
const cage = game.places.create({name: 'Cage'})
const closed = game.places.create({name: 'Closed'})

export const usePlaces = () => {
  return {
    spider,
    cave,
    caveEntrance,
    meadow,
    building,
    cage,
    closed
  }
}
