import ItemFactory from "../factories/item-factory";

export default class Items {
  constructor() {
    this.list = []
  }

  create(params) {
    const item = ItemFactory.createItem(params)
    this.list.push(item)
    return item
  }

  get count() {
    return this.list.length
  }

  get names() {
    return this.list.map((item) => item.name)
  }

  find(name) {
    return this.list.find((item) => item.name.toLowerCase() === name.toLowerCase())
  }
}
