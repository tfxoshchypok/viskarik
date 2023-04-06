import PathFactory from "../factories/path-factory";

export default class Paths {
  constructor() {
    this.list = []
  }

  create(params) {
    const path = PathFactory.createPath(params)
    this.list.push(path)
    return path
  }

  get count() {
    return this.list.length
  }

  find({place, direction}) {
    if (!!place && !!direction) {
      return this.list.find((p) => p.from === place && p.direction === direction)
    } else {
      return undefined
    }
  }
}
