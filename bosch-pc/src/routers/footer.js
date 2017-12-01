import store from '../store'

let footerRoutes = [
  {
    name: 'terms',
    path: 'terms',
    component: require('../views/footer/terms.vue'),
  },
  {
    name: 'distribution',
    path: 'distribution',
    component: require('../views/footer/distribution.vue'),
  },
  {
    name: 'point-exchange',
    path: 'point-exchange',
    component: require('../views/footer/point-exchange.vue'),
  },
  {
    name: 'common-problem',
    path: 'common-problem',
    component: require('../views/footer/common-problem.vue'),
  },
  {
    name: 'about-us',
    path: 'about-us',
    component: require('../views/footer/about-us.vue'),
  },
  {
    name: 'manual',
    path: 'manual',
    component: require('../views/footer/manual.vue'),
  },
  {
    name: 'authorization',
    path: 'authorization',
    component: require('../views/footer/authorization.vue'),
  },
  {
    name: 'item-authorization',
    path: 'item-authorization',
    component: require('../views/footer/item-authorization.vue'),
  },
]

const footer = [
  {
    name: 'footer',
    path: '/footer',
    component: require('../views/footer/footer-main.vue'),
    children: footerRoutes
  },
]

export default footer
