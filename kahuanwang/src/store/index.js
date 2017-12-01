import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import identity from './modules/personalCertificate.identity'

Vue.use(Vuex)

const vuexSession = new VuexPersist({
  storage: window.sessionStorage
})

export default new Vuex.Store({
  modules: {
    identity
  },
  plugins: [vuexSession.plugin]
})
