import DescribeFactory from "../factories/describe-factory";

export default class Describes {
  constructor() {
    this.list = []
  }

  create(params) {
    const describe = DescribeFactory.createDescribe(params)
    this.list.push(describe)
    return describe
  }

  get count() {
    return this.list.length
  }

  getDescribeFor(player) {
    return this.list.sort(fn).find((d) => d.isActualFor(player))
  }
}

const fn = (a, b) => {
  if (a.conditions.length > b.conditions.length) {
    return -1
  } if (a.conditions.length < b.conditions.length) {
    return 1
  } else {
    return 0
  }
}
