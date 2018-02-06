import Vue from 'vue'
import Vuex from 'vuex'
import vueResource from 'vue-resource'
import App from './App'
import router from './router'
import store from './store'
import notifications from 'vue-notification'

Vue.use(vueResource)
Vue.use(Vuex)
Vue.use(notifications)

Vue.config.productionTip = false

Vue.component('modal', {
  template: '#modal-template'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    showModal: false
  },
  router,
  store,
  render: h => h(App)
})
