console.log("Hello, this is Coursework");

import clear from 'clear'
import inquirer from 'inquirer'
import TreePrompt from 'inquirer-tree-prompt'
import PressAnyKey from 'press-any-key'

import {useGame} from './useGame'
import {useSetup} from './useSetup'

import {useUtils} from './api/useUtils'
import {useDirections} from './api/directions'

import MoveCommand from './api/commands/move-command'
import TakeCommand from './api/commands/take-command'
import KillCommand from './api/commands/kill-command'

inquirer.registerPrompt('tree', TreePrompt)

const {game} = useGame()
useSetup()

const {gameInfo} = useUtils()
const {up, down, north, west, east, south, directions} = useDirections()

const cmdExit = Symbol('Вихід')
const cmdInfo = Symbol('Інформація про статус гри')

const cmdMove = Symbol('Рухатись')
const cmdTake = Symbol('Взяти')
const cmdKill = Symbol('Вбити')


export default class GameApp {
  constructor() {
    this.game = game
    this.takeOpen = false
    this.moveOpen = false
    this.actualCmd = undefined
    this.actualDescribe = undefined
  }

  get player() {
    return this.game.player
  }

  get actualPlace() {
    return this.game.player.place
  }

  get isFinished() {
    return this.actualCmd === cmdExit.description
  }

  look() {
    const msg = this.#createMessageFor(this.actualDescribe)
    const items = this.actualPlace.itemsList
    return `\n ${msg} \n ${!!items ? `Тут є ${items}.` : ''}`
  }

  menuChoices() {
    return [
      {
        name: cmdMove.description,
        open: this.moveOpen,
        children: [
          {name: up},
          {name: down},
          {name: north},
          {name: west},
          {name: east},
          {name: south}
        ]
      },
      {
        name: cmdTake.description,
        open: this.takeOpen,
        children: this.game.items.names.map((n) => ({name: n}))
      },
      {name: cmdKill.description},
      {name: cmdInfo.description},
      {name: cmdExit.description},
    ]
  }

  menuPrompt() {
    return {
      type: 'tree',
      name: 'cmd',
      message: this.look(),
      tree: this.menuChoices(),
      loop: false
    }
  }

  async menu() {
    const result = await inquirer.prompt(this.menuPrompt())
    return result
  }

  async actionMessage(message) {
    clear()
    console.log(message)
    await PressAnyKey('Тицьніть будь-яку клавішу для продовження')
  }

  updateDescribe() {
    this.actualDescribe = this.game.describes.getDescribeFor(this.player)
  }

  async gameAction() {
    if (directions.includes(this.actualCmd)) {
      const direction = this.actualCmd
      const move = new MoveCommand(this.game, direction)
      const result = move.execute()
      if (!result.done) {
        await this.actionMessage(result.message)
      }
    }

    if (this.game.items.names.includes(this.actualCmd)) {
      const item = this.game.items.find(this.actualCmd)
      const take = new TakeCommand(this.game, item)
      const result = take.execute()
      if (!result.done) {
        await this.actionMessage(result.message)
      }
    }

    if (this.actualCmd === cmdKill.description) {
      const kill = new KillCommand(this.game)
      const result = kill.execute()
      await this.actionMessage(result.message)
    }

    this.updateDescribe()
    return this.game.continues
  }

  async showLastMessage() {
    const msg = this.player.alive ?
      'Вітаю з перемогою! Насолоджуйся!!!' : 'Нажаль ти загинув...'
    await this.actionMessage(msg)
  }

  async run() {
    let rz = {}
    while (true) {
      const next = await this.gameAction()
      if (!next) {
        await this.showLastMessage()
        break
      }

      clear()

      this.actualCmd = undefined
      if (this.actualDescribe && this.actualDescribe.result) this.actualDescribe.result()

      rz = await this.menu()

      this.moveOpen = rz.cmd === cmdMove.description
      this.takeOpen = rz.cmd === cmdTake.description

      switch (rz.cmd) {
        case cmdInfo.description:
          await gameInfo(this.game)
          break
        default:
          this.actualCmd = rz.cmd
      }

      if (this.isFinished) break
    }
  }

  #createMessageFor({message}) {
    return !!message ? message.join('\n') : 'ніц не згенерував :('
  }
}



//
// const app = {
//   describe: undefined,
//   cmd: '',
//   moveOpen: false,
//   takeOpen: false
// }
//
//
// const getChoices = () => {
//   return [
//     {
//       name: cmdMove.description,
//       open: app.moveOpen,
//       children: [
//         {name: up},
//         {name: down},
//         {name: north},
//         {name: west},
//         {name: east},
//         {name: south}
//       ]
//     },
//     {
//       name: cmdTake.description,
//       open: app.takeOpen,
//       children: game.items.names.map((n) => ({name: n}))
//     },
//     {name: cmdKill.description},
//     {name: cmdInfo.description},
//     {name: cmdExit.description},
//   ]
// }
//
// const gameAction = async () => {
//   if (directions.includes(app.cmd)) {
//     const move = new MoveCommand(game, app.cmd)
//     const result = move.execute()
//     if (!result.done) {
//       await actionMessage(result.message)
//     }
//   }
//
//   if (game.items.names.includes(app.cmd)) {
//     const item = game.items.find(app.cmd)
//     const take = new TakeCommand(game, item)
//     const result = take.execute()
//     if (!result.done) {
//       await actionMessage(result.message)
//     }
//   }
//
//   if (app.cmd === cmdKill.description) {
//     const kill = new KillCommand(game)
//     const result = kill.execute()
//     await actionMessage(result.message)
//   }
//
//   app.describe = game.describes.getDescribeFor(game.player)
//   if (app.describe && app.describe.result) {
//     app.describe.result()
//   }
// }
//
// const getMessage = () => {
//   if (!!app.describe) {
//     const msg =  app.describe.message.join('\n')
//     const items = app.describe.place.items.map((i) => i.name).join(', ')
//     return `\n ${msg} \n ${!!items ? `Тут є ${items}.` : ''}`
//   } else {
//     return 'Нажаль ніц не згенерував ((('
//   }
// }
//
// const mainPrompt = () => {
//   return {
//     type: 'tree',
//     name: 'cmd',
//     message: getMessage(),
//     tree: getChoices(),
//     loop: false
//   }
// }
//
// const menu = async () => {
//   const result = await inquirer.prompt(mainPrompt())
//   return result
// }
//
// const actionMessage = async (message) => {
//   console.log(message)
//   await PressAnyKey('Тицьніть будь-яку клавішу для продовження')
// }
//
// ( async () => {
//   let rz = {}
//   while (rz.cmd !== cmdExit.description) {
//     clear()
//     await gameAction()
//     clear()
//     app.cmd = ''
//     rz = await menu()
//
//     app.moveOpen = rz.cmd === cmdMove.description
//     app.takeOpen = rz.cmd === cmdTake.description
//
//     clear()
//
//     switch (rz.cmd) {
//       case cmdInfo.description:
//         await gameInfo(game)
//         break
//       default:
//         app.cmd = rz.cmd
//     }
//   }
// })()

(async () => {
  const app = new GameApp()
  await app.run()
})()
