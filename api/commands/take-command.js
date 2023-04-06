import Command from './command'

export default class TakeCommand extends Command {
  constructor(game, item) {
    super(game)
    this.item = item
  }

  execute() {
    if (this.player.haveIt(this.item)) {
      return this.createResult(false, `${this.item.name} вже в тебе.`)
    } else {
      const r = this.place.pickUp(this.item)
      if (r) {
        this.player.take(this.item)
        return this.createResult(true, 'Успіх!')
      } else {
        return this.createResult(false, `Ти не можеш це взяти. ${this.item.name} десь в іншому місці.`)
      }
    }
  }
}
