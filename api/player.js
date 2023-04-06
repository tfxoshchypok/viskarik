export default class Player {
  constructor() {
    this.game = undefined
    this.alive = true
    this.inHands = []
    this.place = undefined
  }

  get hasSomethingInHands() {
    return this.inHands.length > 0
  }

  get areHandsEmpty(){
    return this.inHands.length === 0
  }

  haveIt(something) {
    return this.inHands.find((item) => item === something)
  }

  take(something) {
    this.inHands.push(something)
  }

  goto(place) {
    this.place = place
  }

  die() {
    this.alive = false
  }

  isHere(place) {
    return this.place === place || this.place.name === place
  }
}
