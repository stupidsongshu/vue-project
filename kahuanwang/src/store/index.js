import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import common from './modules/common'
import identity from './modules/personalCertificate.identity'

Vue.use(Vuex)

const vuexSession = new VuexPersist({
  storage: window.sessionStorage
})

export default new Vuex.Store({
  modules: {
    common,
    identity
  },
  plugins: [vuexSession.plugin]
})
