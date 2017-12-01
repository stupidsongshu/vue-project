import store from '../store'

let userCenterRoutes = [
  {
    name: 'userCenter',
    path: '',
    component: require('../views/user-center/user/user-info.vue'),

  },
//user-info
  {
    name: 'user-info',
    path: 'user/info',
    component: require('../views/user-center/user/user-info.vue'),
    meta: {menuName: 'user-info', needLogon: true}
  },
  {
    name: 'update-general',
    path: 'update/general',
    component: require('../views/user-center/user/update-general.vue'),
    meta: {menuName: 'user-info', needLogon: true}
  },
  {
    name: 'update-key',
    path: 'update/key',
    component: require('../views/user-center/user/update-key.vue'),
    meta: {menuName: 'user-info', needLogon: true}
  },
  //my-sign
  {
    name: 'my-sign',
    path: 'my/sign',
    component: require('../views/user-center/sign/my-sign.vue'),
    meta: {menuName: 'my-sign', needLogon: true}
  },
  //reset-password
  {
    name: 'reset-password',
    path: 'reset/password',
    component: require('../views/user-center/password/reset-password.vue'),
    meta: {menuName: 'reset-password', needLogon: true}
  },
  //user-address
  {
    name: 'user-address',
    path: 'user/address',
    component: require('../views/user-center/address/user-address.vue'),
    meta: {menuName: 'user-address', needLogon: true}
  },
  //point-query
  {
    name: 'point-query',
    path: 'point/query',
    component: require('../views/user-center/point/point-query.vue'),
    meta: {menuName: 'point-query', needLogon: true}
  },
  //point-detail-query
  {
    name: 'point-detail-query',
    path: 'point/detail/query',
    component: require('../views/user-center/point/point-detail-query.vue'),
    meta: {menuName: 'point-detail-query', needLogon: true}
  },
  //my-order
  {
    name: 'my-order',
    path: 'my/order',
    component: require('../views/user-center/order/my-order.vue'),
    meta: {menuName: 'my-order', needLogon: true}
  },
  {
    name: 'confirm-order',
    path: 'confirm/order',
    component: require('../views/user-center/order/confirm-order.vue'),
    meta: {menuName: 'my-order', rights: []}
  },
  {
    name: 'order-info',
    path: 'order/info/:orderId',
    component: require('../views/user-center/order/order-info.vue'),
    meta: {menuName: 'my-order', rights: []}
  },
  //shopping-cart
  {
    name: 'shopping-cart',
    path: 'shopping/cart',
    component: require('../views/user-center/shopping/shopping-cart.vue'),
    meta: {menuName: 'shopping-cart',needLogon: true}
  },
  {
    name: 'shopping-cart-single',
    path: 'shopping/cart/single/:itemId',
    component: require('../views/user-center/shopping/shopping-cart-single.vue'),
    meta: {menuName: 'shopping-cart',needLogon: true}
  },
  //favorite-item
  {
    name: 'favorite-item',
    path: 'favorite/item',
    component: require('../views/user-center/favorite/favorite-item.vue'),
    meta: {menuName: 'favorite-item', rights: []}
  },
  //card-coupons
  {
    name: 'card-coupons',
    path: 'card/coupons',
    component: require('../views/user-center/card/card-coupons.vue'),
    meta: {menuName: 'card-coupons', needLogon: true}
  },


]

const userCenter = [
  {
    name: '',
    path: '/userCenter',
    component: require('../views/user-center/user-center-main.vue'),
    children: userCenterRoutes
  },
]

export default userCenter
