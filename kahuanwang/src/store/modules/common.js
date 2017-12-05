const state = {
  /**
   * 底部tabbar
   * hasFooter: 显示隐藏
   * tabBarActiveIndex: 激活序号
   */
  hasFooter: true,
  activeTabIndex: 0,
  /**
   * 是否登录
   */
  loginInfo: {
    isLogin: false,
    mobile: ''
  },
  /**
   * 个人认证
   * personalCertificateProgress: 认证进度
   * personalCertificateShow: 是否显示
   */
  personalCertificateProgress: 1,
  personalCertificateShow: true
}

const getters = {}

const mutations = {
  hasFooterSave(state, payload) {
    state.hasFooter = payload
  },
  tabBarActiveIndexSave(state, payload) {
    state.activeTabIndex = payload
  },
  loginInfoSave(state, payload) {
    state.loginInfo = payload
  },
  personalCertificateProgressSave(state, payload) {
    state.personalCertificateProgress = payload
  },
  personalCertificateShowSave(state, payload) {
    state.personalCertificateShow = payload
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
