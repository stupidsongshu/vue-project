import Vue from 'vue'
import store from '../store'

const itemApi = {
  queryItemList(params) {
    return Vue.http.get(store.getters.config_g_apiServer + '/item/list', {params: params});
  },
  getItemInfo(params) {
    return Vue.http.get(store.getters.config_g_apiServer + '/item/info/' + params);
  },
  getItemKeywordList() {
    return Vue.http.get(store.getters.config_g_apiServer + '/item/keyword/show/list');
  },
  getItemCategoryInfo(params) {
    return Vue.http.get(store.getters.config_g_apiServer + '/item/category/info/' + params);
  },
  getItemKeywordAssociateList(params) {
    return Vue.http.get(store.getters.config_g_apiServer + '/item/keyword/associate/list', {params: params});
  },
  itemFavoriteAdd(params) {
    return Vue.http.post(store.getters.config_g_apiServer + '/favorite/add', params);
  },
  itemFavoriteRemove(params) {
    return Vue.http.post(store.getters.config_g_apiServer + '/favorite/remove', params);
  },
}
export default itemApi
