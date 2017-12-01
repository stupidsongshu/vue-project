import Vue from 'vue'
import store from '../store'

const userApi = {
  userLogin (params) {
    return Vue.http.post(store.getters.config_g_apiServer + '/auth/login', params);
  },
  registerSubmit(params){
    return Vue.http.post(store.getters.config_g_apiServer + '/register/submit', params)
  },
  refreshToken () {
    return Vue.http.get(store.getters.config_g_apiServer + '/auth/token/refresh');
  },
  userLogout () {
    return Vue.http.get(store.getters.config_g_apiServer + '/auth/logout');
  },
  forgotPassword(params){
    return Vue.http.post(store.getters.config_g_apiServer + '/public/reset-password', params)
  },
  sendResetPasswordVerifyCode(params){
    return Vue.http.get(store.getters.config_g_apiServer + '/public/reset-password/verify-code', {params: params})
  },
  resetPassword(params){
    return Vue.http.post(store.getters.config_g_apiServer + '/client/update-password', params)
  },
  getPoint () {
    return Vue.http.get(store.getters.config_g_apiServer + '/point/list');
  },
  getClientInfo () {
    return Vue.http.get(store.getters.config_g_apiServer + '/client/info');
  },
  updateClientGeneralInfo (params) {
    return Vue.http.post(store.getters.config_g_apiServer + '/client/update-general', params);
  },
  updateClientGeneralVerifyCode () {
    return Vue.http.get(store.getters.config_g_apiServer + '/client/update-general/verify-code');
  },
  updateClientKeyInfo (params) {
    return Vue.http.post(store.getters.config_g_apiServer + '/client/update-key', params);
  },
  updateClientAvatar (params) {
    return Vue.http.post(store.getters.config_g_apiServer + '/client/update-avatar', params);
  },
  clientActivationSubmit (params) {
    return Vue.http.post(store.getters.config_g_apiServer + '/client/activation/submit', params);
  },
  sendClientActivationCode () {
    return Vue.http.get(store.getters.config_g_apiServer + '/client/activation-code/send');
  },
  sendClientVerifyCode () {
    return Vue.http.get(store.getters.config_g_apiServer + '/client/activation/verify-code');
  },
  updateClientActivationModifyInfo (params) {
    return Vue.http.post(store.getters.config_g_apiServer + '/client/activation/modify-info', params);
  },
  updateCurrentClientAvatar (payload) {
    return Vue.http.post(store.getters.config_g_apiServer + '/client/update-avatar', payload);
  },
  queryPointHistoryList(params){
    return Vue.http.get(store.getters.config_g_apiServer + '/point/history/list', {params: params})
  },
  queryPointDetailList(params){
    return Vue.http.get(store.getters.config_g_apiServer + '/point/detail/list', {params: params})
  },
  getClientAddressList(){
    return Vue.http.get(store.getters.config_g_apiServer + '/client/address/list')
  },
  createClientAddress (params) {
    return Vue.http.post(store.getters.config_g_apiServer + '/client/address/create', params);
  },
  updateClientAddress (params) {
    return Vue.http.post(store.getters.config_g_apiServer + '/client/address/update', params);
  },
  removeClientAddress (params) {
    return Vue.http.post(store.getters.config_g_apiServer + '/client/address/remove', params);
  },
  getClientAddressVerifyCode(){
    return Vue.http.get(store.getters.config_g_apiServer + '/client/address/verify-code')
  },
  getClientSign (params) {
    return Vue.http.post(store.getters.config_g_apiServer + '/client/sign', params);
  },
  queryClientSignList (params) {
    return Vue.http.get(store.getters.config_g_apiServer + '/client/sign/list', {params: params});
  },
}
export default userApi
