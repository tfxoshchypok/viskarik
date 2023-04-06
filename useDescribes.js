import {useGame} from './useGame'
import {usePlaces} from './usePlaces'
import {useItems} from './useItems'
import {useGameStatuses} from './api/statuses'

const {gameStarting, gameContinues, playerWon} = useGameStatuses()
const {game} = useGame()
const {meadow, building, cage, closed, caveEntrance, cave, spider} = usePlaces()
const {ruby} = useItems()

export const useDescribes = () => {
  game.describes.create({
    place: meadow,
    conditions: [
      () => game.player.haveIt(ruby)
    ],
    message: [
      'Вітаю! Ти врятував Бутиличку Віскаріка!',
      'І переміг у грі!'
    ],
    result: () => game.state = playerWon
  })

  game.describes.create({
    place: meadow,
    conditions: [
      () => game.state === gameStarting
    ],
    message: [
      'Ти на поляні. На півночі темна печера, на півдні невелика будівля. ',
      'Твоє завдання, якщо вирішиш його прийняти, врятувати бутилочку знаменитого ',
      '25-річного Віскаріка Chivas Regal і повернутися на поляну.'
    ],
    result: () => game.state = gameContinues
  })

  game.describes.create({
    place: meadow,
    message: [
      'Ти на поляні. На півночі темна печера, на півдні невелика будівля.',
    ]
  })

  game.describes.create({
    place: building,
    message: [
      'Ти в невеличкій будівлі. Вихід на північ.',
      'На заході є загратовані двері, але вони, здається не замкнені.',
      'На сході є менші двері.'
    ]
  })

  game.describes.create( {
    place: cage,
    message: [
      'Ти портапив до лігва лева!',
      'Лев худий і у нього голодний погляд...',
      ' Краще забирайся звідси! (вихід на схід)'
    ]
  })

  game.describes.create({
    place: closed,
    message: [
      'Це не що інше, як стара шафа для зберігання.',
      'Нажаль Віскарік не тут.'
    ]
  })

  game.describes.create({
    place: caveEntrance,
    message: [
      'Ти на вході до великої вогкої печери.',
      'Вихід на півдні. На сході - круглий, великий і темний прохід.'
    ]
  })

  game.describes.create({
    place: cave,
    conditions: [
      () => spider.alive,
      () => game.player.haveIt(ruby)
    ],
    message: [
      'Павук бачить тебе з Віскаріком в руках і атакує!!!!!!',
      '...все закінчилось за мить...'
    ],
    result: () => game.playerDie()
  })

  game.describes.create({
    place: cave,
    conditions: [
      () => spider.alive
    ],
    message: [
      'Тут вверху гіганський паук!!! Його волохата нога,',
      'розміром з бетонний стовп, прямо перед тобою!',
      'Раджу швидко і тихенько звалити звідсіля....'
    ]
  })

  game.describes.create({
    place: cave,
    message: [
      'Тут тіло гіганського паука, ще смикається...'
    ]
  })

  game.describes.create({
    place: spider,
    conditions: [
      () => spider.alive
    ],
    message: [
      'Ти на вершині гіганського павука....'
    ]
  })

  game.describes.create({
    place: spider,
    message: [
      'Йо-хууу! Ти на вершині мертвого гіганського павука...'
    ]
  })
}
