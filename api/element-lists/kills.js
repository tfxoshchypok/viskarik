import ElementsWithConditions from './elements-with-conditions'
import KillFactory from '../factories/kill-factory'

export default class Kills extends ElementsWithConditions {
  get elementFactory() {
    return KillFactory
  }

  get actualKill() {
    return this.activeList.find((k) => k.isActual)
  }
}
