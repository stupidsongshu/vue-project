import userApi from '../../services/service.user'
import {tokenUtils, localStorageUtils} from '../../utils'
import Vue from 'vue'

const state = {
  userInfo: null,
  recentlyViewed: null,
}

const getters = {

  user_g_getUserInfo(state) {
    // let userInfo = state.userInfo;
    if (!state.userInfo || !state.userInfo.clientId) {
      let strUserInfo = localStorageUtils.get('bosch-extra-front-user-info');
      if (!!strUserInfo && strUserInfo !== "undefined") {
        state.userInfo = JSON.parse(strUserInfo)
      }
    }
    return state.userInfo
  },
  user_g_getRecentlyViewed(state) {
    let recentlyViewed = state.recentlyViewed;
    if (!recentlyViewed || !recentlyViewed.itemId) {
      let strRecentlyViewed = localStorageUtils.get('recently-viewed');
      if (!!strRecentlyViewed && strRecentlyViewed != "undefined") {
        recentlyViewed = JSON.parse(strRecentlyViewed)
      }
    }
    return recentlyViewed;
  },
}

const actions = {
  user_a_login ({commit}, payload) {
    return new Promise((resolve) => {
      userApi.userLogin(payload.params).then(
        (response) => {
          if (response.data.resultCode == '0') {
            commit('user_m_updateUserInfo', response.data.resultData)
            tokenUtils.setToken(response.data.resultData.clientToken, response.data.resultData.tokenExpireTime)
          }
          resolve(response)
        },
        (response) => resolve(response)
      )
    });
  },
  user_a_registerSubmit(context, payload){
    return userApi.registerSubmit(payload.params)
  },
  user_a_sendResetPasswordVerifyCode(context, payload){
    return userApi.sendResetPasswordVerifyCode(payload.params)
  },
  user_a_resetPassword(context, payload){
    return userApi.resetPassword(payload.params)
  },
  user_a_forgotPassword(context, payload){
    return userApi.forgotPassword(payload.params)
  },
  user_a_logout () {
    return userApi.userLogout();
  },
  user_a_getPoint () {
    return userApi.getPoint();
  },
  user_a_getClientInfo () {
    return userApi.getClientInfo();
  },
  user_a_updateClientGeneralInfo (context, payload) {
    return userApi.updateClientGeneralInfo(payload.params);
  },
  user_a_updateClientGeneralVerifyCode () {
    return userApi.updateClientGeneralVerifyCode();
  },
  user_a_updateClientKeyInfo (context, payload) {
    return userApi.updateClientKeyInfo(payload.params);
  },
  user_a_updateClientAvatar (context, payload) {
    return userApi.updateClientAvatar(payload.params);
  },
  user_a_updateClientActivationModifyInfo (context, payload) {
    return userApi.updateClientActivationModifyInfo(payload.params);
  },
  user_a_clientActivationSubmit (context, payload) {
    return userApi.clientActivationSubmit(payload.params);
  },
  user_a_sendClientActivationCode () {
    return userApi.sendClientActivationCode();
  },
  user_a_sendClientVerifyCode () {
    return userApi.sendClientVerifyCode();
  },
  user_a_queryPointHistoryList (context, payload) {
    return userApi.queryPointHistoryList(payload.params);
  },
  user_a_queryPointDetailList (context, payload) {
    return userApi.queryPointDetailList(payload.params);
  },
  user_a_getClientAddressList () {
    return userApi.getClientAddressList();
  },
  user_a_createClientAddress (context, payload) {
    return userApi.createClientAddress(payload.params);
  },
  user_a_updateClientAddress (context, payload) {
    return userApi.updateClientAddress(payload.params);
  },
  user_a_removeClientAddress (context, payload) {
    return userApi.removeClientAddress(payload.params);
  },
  user_a_getClientAddressVerifyCode () {
    return userApi.getClientAddressVerifyCode();
  },
  user_a_getClientSign (context, payload) {
    return userApi.getClientSign(payload.params);
  },
  user_a_queryClientSignList (context, payload) {
    return userApi.queryClientSignList(payload.params);
  },

  user_a_refreshToken () {
    userApi.refreshToken().then((response) => {
      if (response.data.resultCode == '0') {
        tokenUtils.setToken(response.data.resultData.clientToken, response.data.resultData.tokenExpireTime)
      }
    })
  },
  user_a_updateCurrentClientAvatar({commit}, payload) {
    return new Promise((resolve) => {
      userApi.updateCurrentClientAvatar(payload).then(
        (response) => {
          commit('user_m_updateUserInfoData', response.data.resultData)
          resolve(response)
        },
        (response) => resolve(response)
      )
    });
  },

  user_a_updateRecentlyViewed({commit}, payload){
    return new Promise((resolve) => {
      if (!localStorageUtils.get('recently-viewed')) {
        localStorageUtils.set('recently-viewed', JSON.stringify(new Array()));
        let viewed = JSON.parse(localStorageUtils.get('recently-viewed'));
        viewed.unshift(payload.params);
        commit('user_m_updateRecentlyViewed', viewed);
//          console.log(JSON.parse(localStorageUtils.get('recently-viewed')))
      } else if (!!localStorageUtils.get('recently-viewed')) {
        let viewed = JSON.parse(localStorageUtils.get('recently-viewed'));
        viewed.unshift(payload.params);
        for (var i = 0; i < viewed.length; i++) {
          for (var j = i + 1; j < viewed.length; j++) {
            if (viewed[i].itemId === viewed[j].itemId) {
              viewed.splice(j, 1);
            }
          }
        }
        if (viewed.length > 3) {
          viewed.pop();
        }
        commit('user_m_updateRecentlyViewed', viewed)
//          console.log(JSON.parse(localStorageUtils.get('recently-viewed')))
      }
    });
  },


}

const mutations = {
  user_m_updateUserInfo (state, payload){
    state.userInfo = payload.clientInfo;
    if (!!payload.clientInfo) {
      localStorageUtils.set('bosch-extra-front-user-info', JSON.stringify(payload.clientInfo))
    }
  },
  user_m_updateUserInfoData (state, payload){
    for (let item in payload) {
      var value = payload[item];
      var name = item;
      Vue.set(state.userInfo, name, value)
    }
    if (!!state.userInfo) {
      localStorageUtils.set('bosch-extra-front-user-info', JSON.stringify(state.userInfo))
    }
  },
  user_m_clearUserInfo (state){
    // console.log('user_m_clearUserInfo')
    state.userInfo = null
    tokenUtils.clearToken()
    localStorageUtils.remove('bosch-extra-front-user-info')
  },
  user_m_updateRecentlyViewed (state, payload){
    state.recentlyViewed = payload
    localStorageUtils.set('recently-viewed', JSON.stringify(payload))
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}

