import Vue from 'vue'
import App from './App'
import { createStore } from './store'
import VueResource from 'vue-resource'
import router from './router'
import * as filters from './utils/filters'
import Notice from '@/components/notification'
import { Dialog, Button, InputNumber } from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
//import ElementUI from 'element-ui'
// import '../node_modules/element-ui/lib/theme-default/index.css'
Vue.config.productionTip = false
//Vue.use(ElementUI)

const Lg = {
  Notice
}
const install = function (Vue, option = {}) {
  Object.keys(Lg).forEach((key) => {
    Vue.component(key, Lg[key])
  })

  Vue.prototype.$notify = Notice
}
Vue.use(install)
// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
Vue.use(VueResource)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(InputNumber)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
const store = createStore()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
