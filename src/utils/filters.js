var moment = require('moment')
const Flatpickr = require("flatpickr")
export function dateTime (time) {
  if (!time) {
    return ''
  }
  let ntime = !isNaN(Number(time)) ? Number(time) : time
  return moment(new Date(ntime)).format('YYYY-MM-DD HH:mm:ss')
}
export function flatpicker (element, option) {
  return new Flatpickr(element, option)
}
