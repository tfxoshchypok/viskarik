export default class Kill {
  constructor({conditions = [], message, result = null}) {
    this.conditions = conditions
    this.message = message
    this.result = result
  }

  get isActual() {
    return this.conditions.length === 0 || this.conditions.every((c) => c())
  }
}
