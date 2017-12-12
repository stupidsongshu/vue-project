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
   * fix 输入框被输入法遮住
   * status 输入法是否弹起
   * target 输入法弹起后需隐藏的dom结点数组
   */
  toggleView: {
    status: false,
    target: []
  }
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
  toggleViewSave(state, payload) {
    state.toggleView = payload
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
