import Kill from '../elements/kill'

export default class KillFactory {
  static create({conditions = [], message, result = null}) {
    return new Kill({
      conditions,
      message,
      result
    })
  }
}
