import Vue from 'vue'
import LgNotify from './notification'
const NotifyConstructor = Vue.extend(LgNotify)

let instance
let instances = []
let seed = 1

var Notification = function (options) {
  console.log('options', options)
  if (Vue.prototype.$isServer) return
  options = options || {}
  let userOnClose = options.onClose
  let id = 'notification_' + seed++

  options.onClose = () => {
    Notification.close(id, userOnClose)
  }
  instance = new NotifyConstructor({
    data: options
  })
  console.log('instance', instance)
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true
  instance.dom = instance.vm.$el
  instances.push(instance)
  return instance.vm
}
var arr = ['success', 'warning', 'info', 'error']
arr.forEach(type => {
  Notification[type] = options => {
    console.log('NotifyConstructor', options)
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = options.type
    return Notification(options)
  }
})

Notification.close = function (id, userOnClose) {
  for (var i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i])
      }
      instances.splice(i, 1)
      break
    }
  }
}

export default Notification

