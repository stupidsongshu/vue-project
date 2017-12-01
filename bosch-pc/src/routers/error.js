
const error = [
    {
        name: '404',
        path: '/404',
        component: require('../views/error/404.vue')
    },
    {
        name: 'no-right',
        path: '/no-right',
        component: require('../views/error/no-right.vue')
    },
    {
        path: '*',
        component: require('../views/error/404.vue')
    },
]

export default error
