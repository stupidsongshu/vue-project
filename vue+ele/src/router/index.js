import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import EleUi from '@/components/eleUi'
import AssistantFn from '@/components/assistantFn'

Vue.use(Router)

export default new Router({
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/',
      // name: 'Hello',
      component: HelloWorld,
      children: [
        {
          path: '',
          component: EleUi
        },
        {
          path: 'assistantFn',
          component: AssistantFn
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
