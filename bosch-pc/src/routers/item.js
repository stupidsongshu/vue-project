import store from '../store'

let itemRoutes = [
  {
    name: 'item-list',
    path: 'item-list',
    component: require('../views/item/item-list.vue'),
    meta: {needLogon: true}
  },
  {
    name: 'item-search-all-list',
    path: 'item-search-all-list',
    component: require('../views/item/item-search-all-list.vue'),
    meta: {needLogon: true}
  },
  {
    name: 'item-info',
    path: 'item-info/:itemId',
    component: require('../views/item/item-info.vue'),
    meta: {needLogon: true}
  },

]

const item = [
  {
    name: 'item',
    path: '/item',
    component: require('../views/item/item-main.vue'),
    children: itemRoutes
  },
]

export default item
