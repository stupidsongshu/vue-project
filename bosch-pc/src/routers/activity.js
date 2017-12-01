import store from '../store'

let activityRoutes = [
  {
    name: 'activity-list',
    path: 'activity-list/:activityType',
    component: require('../views/activity/activity-list.vue'),
    meta: {needLogon: true}
  },
  {
    name: 'activity-view',
    path: 'activity-view',
    component: require('../views/activity/activity-view.vue'),
    meta: {needLogon: true}
  },
  {
    name: 'activity-begin',
    path: 'activity-begin',
    component: require('../views/activity/activity-begin.vue'),
    meta: {needLogon: true}
  },
]

const activity = [
  {
    name: 'activity',
    path: '/activity',
    component: require('../views/activity/activity-main.vue'),
    children: activityRoutes
  },
]

export default activity
