import Command from './command'

export default class MoveCommand extends Command {
  constructor(game, direction) {
    super(game)
    this.paths = game.paths
    this.direction = direction
  }

  execute() {
    const path = this.paths.find({place: this.place, direction: this.direction})

    if (!path) {
      return this.createResult(false, 'Ти не можеш туди йди!')
    } else if (path.condition && !path.condition()) {
      return this.createResult(false, path.alert)
    } else {
      this.player.goto(path.to)
      return this.createResult(true, 'Виконано!')
    }
  }
}
