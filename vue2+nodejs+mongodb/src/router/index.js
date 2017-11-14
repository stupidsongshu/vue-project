import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

import HelloWorld from '@/components/HelloWorld'
import Goods from './../components/goods'
import GoodsTitle from '@/components/goodsTitle'
import GoodsImage from '../components/goodsImage'
import GoodsDetail from '../components/goodsDetail'
import Cart from '@/components/cart'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Hello',
      // component: HelloWorld
      components: {
        default: HelloWorld,
        title: GoodsTitle,
        image: GoodsImage
      }
    },
    {
      path: '/goods',
      name: 'goodsname',
      component: Goods,
      children: [
        {
          path: 'title',
          name: 'goodsTitle',
          component: GoodsTitle
        },
        {
          path: 'image',
          name: 'goodsImage',
          component: GoodsImage
        }
      ]
    },
    {
      path: '/goodsDetail/:goodsId',
      name: 'goodsDetail',
      component: GoodsDetail
    },
    {
      // path: '/cart',
      path: '/cart/:id',
      name: 'cartName',
      component: Cart
    }
  ]
})
