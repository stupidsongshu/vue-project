import store from '../store'

let brandInformationRoutes = [

  {
    name: 'brand-information-text',
    path: 'brand-information-text/:noticeId',
    component: require('../views/brand-information/brand-information-text.vue'),
  },
]

const brandInformation = [
  {
    name: 'brand-information',
    path: '/brand-information',
    component: require('../views/brand-information/brand-information-main.vue'),
    children: brandInformationRoutes
  },
]

export default brandInformation
