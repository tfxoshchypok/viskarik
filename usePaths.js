import {useGame} from './useGame'
import {useDirections} from './api/directions'
import {usePlaces} from './usePlaces'
import {useItems} from './useItems';

const {game} = useGame()
const {up, down, north, south, east, west} = useDirections()
const {spider, cave, caveEntrance, meadow, building, cage, closed} = usePlaces()
const {key, flashlight} = useItems()

export const usePaths = () => {
  game.paths.create({from: spider, direction: down, to: cave})
  game.paths.create({from: cave, direction: up, to: spider})

  game.paths.create({from: cave, direction: west, to: caveEntrance})
  game.paths.create({from: caveEntrance, direction: east, to: cave})

  game.paths.create({from: caveEntrance, direction: south, to: meadow})
  game.paths.create({
    from: meadow,
    direction: north,
    to: caveEntrance,
    condition: () => game.player.haveIt(flashlight),
    alert: 'Зайти в цю темну печеру без світла? Ти здурів?'
  })

  game.paths.create({from: meadow, direction: south, to: building})
  game.paths.create({from: building, direction: north, to: meadow})

  game.paths.create({from: building, direction: west, to: cage})
  game.paths.create({from: cage, direction: east, to: building})

  game.paths.create({from: closed, direction: west, to: building})
  game.paths.create({
    from: building,
    direction: east,
    to: closed,
    condition: () => game.player.haveIt(key),
    alert: 'Здається, двері замкнені. Потрібен ключ.'
  })
}


