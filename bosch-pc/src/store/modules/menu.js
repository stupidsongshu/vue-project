const state = {
  userCenterMenu: {
    currentMenu: '',
    menuList: [
      {
        name: 'user-info',
        path: '/userCenter/user/info',
        label: '个人资料',
        icon: 'el-icon-arrow-right'
      },
      {
        name: 'my-sign',
        path: '/userCenter/my/sign',
        label: '我的签到',
        icon: 'el-icon-arrow-right'
      },
      {
        name: 'reset-password',
        path: '/userCenter/reset/password',
        label: '修改密码',
        icon: 'el-icon-arrow-right'
      },
      {
        name: 'user-address',
        path: '/userCenter/user/address',
        label: '收货地址',
        icon: 'el-icon-arrow-right'
      },
      {
        name: 'point-query',
        path: '/userCenter/point/query',
        label: '积分历史查询',
        icon: 'el-icon-arrow-right'
      },
      {
        name: 'point-detail-query',
        path: '/userCenter/point/detail/query',
        label: '积分有效期',
        icon: 'el-icon-arrow-right'
      },
      {
        name: 'my-order',
        path: '/userCenter/my/order',
        label: '我的订单',
        icon: 'el-icon-arrow-right'
      },
      {
        name: 'shopping-cart',
        path: '/userCenter/shopping/cart',
        label: '购物车',
        icon: 'el-icon-arrow-right'
      },
      {
        name: 'favorite-item',
        path: '/userCenter/favorite/item',
        label: '收藏夹',
        icon: 'el-icon-arrow-right'
      },
      // {
      //   name: 'card-coupons',
      //   path: '/userCenter/card/coupons',
      //   label: '我的卡券',
      //   icon: 'el-icon-arrow-right'
      // },
    ]
  }

}

const getters = {}

const actions = {}

const mutations = {
  menu_m_menuSelect(state, to) {
    state.userCenterMenu.currentMenu = ''
    for (var i in state.userCenterMenu.menuList) {
      if (!!to.meta && !!to.meta.menuName && state.userCenterMenu.menuList[i].name === to.meta.menuName) {
        state.userCenterMenu.currentMenu = state.userCenterMenu.menuList[i].path
        break
      }
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
