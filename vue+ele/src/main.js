// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    todos: [
      {
        id: 1,
        done: true
      },
      {
        id: 2,
        done: false
      },
      {
        id: 3,
        done: true
      }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    // Getter 也可以接受其他 getter 作为第二个参数
    doneLength: (state, getters) => {
      return getters.doneTodos.length
    },
    // 通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。
    getTodoById: (state) => (id) => {
      console.log(id)
      let ids = parseInt(id)
      return state.todos.find(todo => todo.id === ids)
    }
  },
  // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation，mutation 必须是同步函数
  mutations: {
    incrementTest(state, payload) {
      console.log(payload)
      if (payload !== undefined && payload.step) {
        state.count += payload.step
        return
      }
      state.count ++
    },
    decrementTest(store) {
      store.count --
    }
  },
  // mutation 必须同步执行，Action 提交的是 mutation，Action 可以包含任意异步操作
  actions: {
    // Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
    incrementAsync(context, payload) {
      console.log(context)
      // setTimeout(() => context.commit('incrementTest'), 1000)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit('incrementTest', payload)
          resolve()
        }, 1000)
      })
    },
    // 参数解构
    incrementSync({commit}, payload) {
      commit('incrementTest', payload)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
