import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Register from '@/components/register'
import Login from '@/components/login'
import ApplyCash from '@/components/applyCash'
import ApplyDeal from '@/components/applyDeal'
import RepaymentDetail from '@/components/repaymentDetail'
import RepaymentDeal from '@/components/repaymentDeal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/applyCash',
      name: 'applyCash',
      component: ApplyCash
    },
    {
      path: '/applyDeal',
      name: 'applyDeal',
      component: ApplyDeal
    },
    {
      path: '/repaymentDetail',
      name: 'repaymentDetail',
      component: RepaymentDetail
    },
    {
      path: '/repaymentDeal',
      name: 'repaymentDeal',
      component: RepaymentDeal
    }
  ]
})
