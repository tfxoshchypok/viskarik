import {useGameStatuses} from './statuses.js'

import Player from './player'

import Places from './element-lists/places'
import Paths from './element-lists/paths'
import Items from './element-lists/items'
import Describes from './element-lists/describes'
import Kills from './element-lists/kills'

const {gameStarting, gameContinues, playerDie} = useGameStatuses()

export default class Game {
  constructor() {
    this.state = gameStarting
    this.player = new Player()
    this.places = new Places()
    this.items = new Items()
    this.paths = new Paths()
    this.describes = new Describes()
    this.kills = new Kills()
    this.actions = []
  }

  get continues() {
    return [gameStarting, gameContinues].includes(this.state)
  }

  playerDie() {
    this.state = playerDie
    this.player.die()
  }
}
