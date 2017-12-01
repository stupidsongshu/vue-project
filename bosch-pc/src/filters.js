import {mathUtils, dateUtils,statusUtils} from './utils'

var filters = [
    {
        name: 'dateToString',
        func: dateUtils.dateToString
    },
    {
        name: 'exactTime',
        func: dateUtils.exactTime
    },
    {
        name: 'getDate',
        func: dateUtils.getDate
    },
    {
        name: 'getDateTime',
        func: dateUtils.getDateTime
    },
    {
        name: 'amountFormat',
        func: mathUtils.amountFormat
    },
  {
    name: 'nl2br',
    func: function (val) {
      let input = val || ''
      return input.replace(/\n/g,"<br/>")
    }
  }
]
export default filters;
