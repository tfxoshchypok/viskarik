import Path from '../elements/path'

export default class PathFactory {
  static createPath({from, direction, to, condition = null, alert = ''}) {
    return new Path(from, direction, to, condition, alert)
  }
}
