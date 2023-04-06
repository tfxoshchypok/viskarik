import {useGame} from './useGame'

const {game} = useGame()

const ruby = game.items.create({name: 'Пляшка Віскаріка'})
const key = game.items.create({name: 'Ключ'})
const flashlight = game.items.create({name: 'Лампа'})
const sword = game.items.create({name: 'Меч'})

export const useItems = () => {
  return {
    ruby,
    key,
    flashlight,
    sword
  }
}
