export default class CommandResultFactory {
  static create(done, message) {
    return {
      done,
      message
    }
  }
}
