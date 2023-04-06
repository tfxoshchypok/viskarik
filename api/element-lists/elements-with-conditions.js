import Elements from './elements'

export default class ElementsWithConditions extends Elements {
  get activeList() {
    return this.list.sort(this.fn)
  }

  #sortFn(a, b) {
    if (a.conditions.length > b.conditions.length) {
      return -1
    }
    if (a.conditions.length < b.conditions.length) {
      return 1
    } else {
      return 0
    }
  }
}
