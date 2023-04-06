export default class Place {
  constructor(name, alive = false) {
    this.name = name
    this.alive = alive
    this.items = []
  }

  isItemHere(something) {
    return this.items.findIndex((item) => something === item)
  }

  pickUp(something) {
    const index = this.isItemHere(something)
    if (index >= 0) {
      this.items.splice(index, 1)
      return true
    } else {
      return false
    }
  }

  putHere(something) {
    if (something) {
      this.items.push(something)
    }
  }

  get itemsList() {
    return this.items.map((item) => item.name).join(', ')
  }
}
