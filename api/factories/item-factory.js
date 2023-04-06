import Item from '../elements/item'

export default class ItemFactory {
  static createItem({name}) {
    return new Item(name)
  }
}
