import Vue from 'vue'
import App from './App.vue'

import VueAtTextarea from './lib/index.js'
Vue.use(VueAtTextarea)

new Vue({
  el: '#app',
  render: h => h(App)
})
