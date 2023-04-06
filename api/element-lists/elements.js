export default class Elements {
  constructor() {
    this.list = []
  }

  get elementFactory() {}

  create(params) {
    const element = this.elementFactory.create(params)
    this.list.push(element)
    return element
  }
}
