import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  key: ''
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state
})
