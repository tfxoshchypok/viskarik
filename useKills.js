import {useGame} from './useGame'
import {usePlaces} from './usePlaces'
import {useItems} from './useItems'

const {game} = useGame()
const {cage, cave, spider} = usePlaces()
const {sword} = useItems()

export const useKills = () => {
  game.kills.create({
    conditions: [
      () => game.player.isHere(cage)
    ],
    message: [
      'Ах, це дуже погана ідея!',
      'Тобою щойно закусив лев.....'
    ],
    result: () => game.playerDie()
  })

  game.kills.create({
    conditions: [
      () => game.player.isHere(cave)
    ],
    message: [
      'Ніц не вийде.',
      'Лапа павука така ж міцна, як телефонний стовп!'
    ]
  })

  game.kills.create({
    conditions: [
      () => game.player.isHere(spider),
      () => spider.alive,
      () => game.player.haveIt(sword)
    ],
    message: [
      'Ти відважно і неодноразово рубаєш спину павука!',
      'Зі спини павука випливає слизький іхор...',
      'Ти вбив його, посмикування кінцівок лише підтверджують це'
    ],
    result: () => spider.alive = false
  })

  game.kills.create({
    conditions: [
      () => game.player.isHere(spider)
    ],
    message: [
      'Гатити кулаками по спині павука не має жодного ефекту.',
      'Це те саме, що його гладити.'
    ]
  })

  game.kills.create({
    message: [
      'Звідкіля ти взяв, що тут можна когось замочити?'
    ]
  })
}
