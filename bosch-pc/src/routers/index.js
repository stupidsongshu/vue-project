import VueRouter from 'vue-router'
import {tokenUtils, userUtils} from '../utils'
import store from '../store'
import website from './website'
import platform from './userCenter'
import item from './item'
import footer from './footer'
import boschSchool from './boschSchool'
import brandInformation from './brandInformation'
import notice from './notice'
import activity from './activity'
import {MessageBox} from 'element-ui'

let routes = [
  {
    name: '',
    path: '/',
    component: require('../views/home/home-main.vue'),
    beforeEnter: (to, from, next) => {
      let userInfo = store.getters.user_g_getUserInfo;
      !!userInfo && userInfo.isActivated === 0 ? next({name: 'activation'}) : next()
    }
  },
  {
    name: 'activation',
    path: '/activation',
    component: require('../views/activation/activation.vue'),
    meta: {needLogon: true}
  },
]

const modules = [website, item, platform, footer, boschSchool, brandInformation, notice, activity];
for (let i in modules) {
  routes = routes.concat(modules[i]);
}

const basePath = '/'

const routerConfig = {
  mode: 'history',
  base: basePath,
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
}
const router = new VueRouter(routerConfig);
//路由统一预处理机制
router.beforeEach((to, from, next) => {
    store.commit('menu_m_menuSelect', to)
    let needLogon = !!to.meta ? to.meta.needLogon || false : false
    let userInfo = store.getters.user_g_getUserInfo
    if (needLogon) {
      if (!!tokenUtils.getToken(true) && !!userInfo) {
        //用户已登录
        if (userInfo.isActivated === 0 && to.name !== 'activation') {
          router.push({name: 'activation'});
        } else if (userInfo.isActivated === 1 && to.name === 'activation') {
          router.push({name: 'home'});
        } else {
          next()
        }
      } else {
        //用户未登录的处理
        MessageBox.alert('请先登录再操作', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            store.commit('user_m_clearUserInfo')
            router.push({name: 'login', query: {path: to.path}});
          }
        });
      }
    } else {
      next()
    }
  }
)

export default router;
