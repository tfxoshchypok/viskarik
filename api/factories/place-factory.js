import Place from '../elements/place'

export default class PlaceFactory {
  static createPlace({name, alive = false}) {
    return new Place(name, alive)
  }
}
