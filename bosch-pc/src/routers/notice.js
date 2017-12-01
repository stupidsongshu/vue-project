import store from '../store'

let noticeRoutes = [
  {
    name: 'notice-text',
    path: 'notice-text/:noticeId',
    component: require('../views/notice/notice-text.vue'),
  },
]

const notice = [
  {
    name: 'notice',
    path: '/notice',
    component: require('../views/notice/notice-main.vue'),
    children: noticeRoutes
  },
]

export default notice
