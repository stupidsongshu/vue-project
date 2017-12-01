import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations'
import config from './modules/config'
import user from './modules/user'
import dict from './modules/dict'
import menu from './modules/menu'
import website from './modules/website'
import order from './modules/order'
import logged from './modules/logged'
import item from './modules/item'
import activity from './modules/activity'

// const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)
export default new Vuex.Store({
  mutations,
  modules:{
    order,
    website,
    config,
    user,
    dict,
    menu,
    logged,
    item,
    activity
  }
})
