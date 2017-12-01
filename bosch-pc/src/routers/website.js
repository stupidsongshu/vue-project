import store from '../store'
const website = [
  {
    name: 'home',
    path: '/home',
    component: require('../views/home/home-main.vue'),
    beforeEnter: (to, from, next) => {
      let userInfo = store.getters.user_g_getUserInfo;
      !!userInfo && userInfo.isActivated === 0 ? next({name: 'activation'}) : next()
    }
  },
  {
    name: 'register',
    path: '/register',
    component: require('../views/register/register-main.vue')
  },
  {
    name: 'login',
    path: '/login',
    component: require('../views/login/login-main.vue')
  },
  {
    name: 'forgot-password',
    path: '/forgot-password',
    component: require('../views/forgot-password/forgot-password.vue')
  },
]

export default website
