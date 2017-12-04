const state = {
  /**
   * 底部tabbar显示隐藏
   */
  hasFooter: true,
  /**
   * 是否登录
   */
  loginInfo: {
    isLogin: false,
    mobile: ''
  }
}

const getters = {}

const mutations = {
  hasFooterSave(state, payload) {
    state.hasFooter = payload
  },
  loginInfoSave(state, payload) {
    state.loginInfo = payload
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
