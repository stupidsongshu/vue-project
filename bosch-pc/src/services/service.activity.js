import Vue from 'vue'
import store from '../store'

const activityApi = {
  queryActivityList(params) {
    return Vue.http.get(store.getters.config_g_apiServer + '/activity/list', {params: params});
  },
  getActivityInfo(params) {
    return Vue.http.get(store.getters.config_g_apiServer + '/activity/info/' + params.activityId);
  },
  queryActivityQuestionList(params) {
    return Vue.http.get(store.getters.config_g_apiServer + '/activity/question/list', {params: params});
  },
  queryActivityQuestionCheck(params) {
    return Vue.http.post(store.getters.config_g_apiServer + '/activity/question/check', params);
  },
  queryActivityQuestionSubmit(params) {
    return Vue.http.post(store.getters.config_g_apiServer + '/activity/question/submit', params);
  },
  queryActivityQuestionAnswer(params) {
    return Vue.http.get(store.getters.config_g_apiServer + '/activity/question/answer/query', {params: params});
  },
  obtainRedPacket(params) {
    return Vue.http.post(store.getters.config_g_apiServer + '/activity/red-packet/obtain', params);
  },
  queryActivitySeckillList(params) {
    return Vue.http.get(store.getters.config_g_apiServer + '/activity/seckill/list', {params: params});
  },
  queryActivitySeckillSubmit(params) {
    return Vue.http.post(store.getters.config_g_apiServer + '/activity/seckill/submit', params);
  },
}
export default activityApi
