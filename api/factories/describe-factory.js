import Describe from '../elements/describe'
export default class DescribeFactory {
  static createDescribe({place, message, conditions = [], result = null}) {
    return new Describe({place, conditions, message, result})
  }
}
