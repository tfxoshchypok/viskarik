import PlaceFactory from "../factories/place-factory";

export default class Places {
  constructor() {
    this.list = []
  }

  create(params) {
    const place = PlaceFactory.createPlace(params)
    this.list.push(place)
    return place
  }

  get count() {
    return this.list.length
  }

  findByName(name) {
    return this.list.find((item) => item.name.toLowerCase() == name.toLowerCase())
  }
}
