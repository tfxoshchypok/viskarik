import Command from './command'

export default class KillCommand extends Command {
  constructor(game) {
    super(game)
    this.kills = game.kills
  }

  execute() {
    const kill = this.kills.actualKill
    if (kill.result) {
      kill.result()
    }
    return this.createResult(true, kill.message.join('\n'))
  }
}
