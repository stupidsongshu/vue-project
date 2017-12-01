import Vue from 'vue'
import store from '../store'

const loggedApi = {
  queryNoticeList() {
    return Vue.http.get(store.getters.config_g_apiServer + '/public/notice/list');
  },
  getNoticeInfo(params) {
    return Vue.http.get(store.getters.config_g_apiServer + '/public/notice/info/' + params);
  },
  queryRankData() {
    return Vue.http.get(store.getters.config_g_apiServer + '/exchange-ranking/list');
  },
}
export default loggedApi
