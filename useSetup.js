import {useGame} from './useGame'
import {useItems} from './useItems'
import {usePlaces} from './usePlaces'
import {useDescribes} from './useDescribes'
import {usePaths} from './usePaths'
import {useKills} from './useKills'

const {game} = useGame()
const {ruby, key, sword, flashlight} = useItems()

const {meadow, caveEntrance, spider, building, closed} = usePlaces()

export const useSetup = () => {
  usePaths()
  useDescribes()
  useKills()

  spider.putHere(ruby)
  caveEntrance.putHere(key)
  building.putHere(flashlight)
  closed.putHere(sword)

  game.player.goto(meadow)
}


