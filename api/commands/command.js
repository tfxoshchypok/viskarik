import CommandResultFactory from '../factories/command-result-factory'

export default class Command {
  constructor(game) {
    this.player = game.player
  }

  get place() {
    return this.player.place
  }

  execute() {

  }

  createResult(done, message) {
    return CommandResultFactory.create(done, message)
  }
}
