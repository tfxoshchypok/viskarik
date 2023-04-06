export default class Describe {
  constructor({place, conditions = [], message, result = null}) {
    this.place = place
    this.conditions = conditions
    this.message = message
    this.result = result
  }

  isActualFor(player) {
    if (player.place === this.place) {
      return this.conditions.length === 0 || this.conditions.every((c) => c())
    } else {
      return false
    }
  }
}
