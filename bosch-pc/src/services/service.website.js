import Vue from 'vue'
import store from '../store'

const websiteApi = {
  getItemRecommendData() {
    return Vue.http.get(store.getters.config_g_apiServer + '/public/item/recommend');
  },
  getContentData() {
    return Vue.http.get(store.getters.config_g_apiServer + '/public/content');
  },
  getBrandInfoList() {
    return Vue.http.get(store.getters.config_g_apiServer + '/public/brand-info/list');
  },
}
export default websiteApi
