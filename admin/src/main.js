import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
//样式
import './style.css'

Vue.config.productionTip = false //阻止了生产模式，此时是以开发模式运行的

import http from './http'
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
