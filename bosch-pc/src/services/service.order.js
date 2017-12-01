import Vue from 'vue'
import store from '../store'

const orderApi = {
  shoppingCartAdd(params){
    return Vue.http.post(store.getters.config_g_apiServer + '/cart/add', params)
  },
  order_a_shoppingCartList(params){
    return Vue.http.get(store.getters.config_g_apiServer + '/cart/list', {params: params})
  },
  shoppingCartDelete(params){
    return Vue.http.post(store.getters.config_g_apiServer + '/cart/remove', params)
  },
  shoppingCartItemQuantityUpdate(params){
    return Vue.http.post(store.getters.config_g_apiServer + '/cart/update', params)
  },
  shoppingCartItemSettlementCheck(params){
    return Vue.http.post(store.getters.config_g_apiServer + '/cart/settlement-check', params)
  },
  favoriteAdd(params){
    return Vue.http.post(store.getters.config_g_apiServer + '/favorite/add', params)
  },
  favoriteRemove(params){
    return Vue.http.post(store.getters.config_g_apiServer + '/favorite/remove', params)
  },
  favoriteList(){
    return Vue.http.get(store.getters.config_g_apiServer + '/favorite/list')
  },
  orderCreateInit(){
    return Vue.http.get(store.getters.config_g_apiServer + '/order/create/init')
  },
  orderCreate(params){
    return Vue.http.post(store.getters.config_g_apiServer + '/order/create', params)
  },
  getOrderInfo(params){
    return Vue.http.get(store.getters.config_g_apiServer + '/order/info/' + params)
  },
  shoppingCartBuy(params){
    return Vue.http.post(store.getters.config_g_apiServer + '/cart/buy', params)
  },
  orderItemReturn(params){
    return Vue.http.post(store.getters.config_g_apiServer + '/order/item/return', params)
  },
  queryOrderList(params){
    return Vue.http.get(store.getters.config_g_apiServer + '/order/list', {params: params})
  },
  commitmentUpload(params){
    return Vue.http.post(store.getters.config_g_apiServer + '/order/commitment', params)
  },
  queryLogistics(params){
    return Vue.http.get(store.getters.config_g_apiServer + '/order/logistics/query', {params: params})
  },
}
export default orderApi
