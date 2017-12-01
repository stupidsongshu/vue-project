import store from '../store'

let boschSchoolRoutes = [

  {
    name: 'catalog',
    path: 'catalog',
    component: require('../views/bosch-school/catalog.vue'),
  },
  {
    name: 'method',
    path: 'method',
    component: require('../views/bosch-school/method.vue'),
  },
  {
    name: 'bosch-school-manual',
    path: 'bosch-school-manual',
    component: require('../views/bosch-school/manual.vue'),
  },
]

const boschSchool = [
  {
    name: 'bosch-school',
    path: '/bosch-school',
    component: require('../views/bosch-school/bosch-school-main.vue'),
    children: boschSchoolRoutes
  },
]

export default boschSchool
