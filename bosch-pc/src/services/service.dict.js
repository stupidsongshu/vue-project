import Vue from 'vue'
import store from '../store'

const dictApi = {
  queryProvinceData() {
    return Vue.http.get(store.getters.config_g_apiServer + '/public/district/province/list');
  },
  queryCityData(params) {
    return Vue.http.get(store.getters.config_g_apiServer + '/public/district/city/list', {params: params});
  },
  queryCountyData(params) {
    return Vue.http.get(store.getters.config_g_apiServer + '/public/district/county/list', {params: params});
  },
  queryDictData(params) {
    return Vue.http.get(store.getters.config_g_apiServer + '/dictionary/get', {params: params});
  },
  queryItemCategoryData(params) {
    return Vue.http.get(store.getters.config_g_apiServer + '/item/category/list', {params: params});
  },
  queryItemTagCategoryData(params) {
    return Vue.http.get(store.getters.config_g_apiServer + '/item/tag/show-in-category/list', {params: params});
  },
}
export default dictApi
