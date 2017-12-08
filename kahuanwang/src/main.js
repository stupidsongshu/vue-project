// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/index'
import MintUI, {Indicator} from 'mint-ui'
// import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'normalize.css'
import './assets/css/common.css'
import './assets/css/base.styl'
import './assets/font-awesome-4.7.0/css/font-awesome.min.css'

Vue.config.productionTip = false
Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
  created() {
    // axios.create({
    //   baseURL: 'http://xfjr.ledaikuan.cn:9191/'
    // })
    // axios.interceptors.request.use((config) => {
    //   Indicator.open({
    //     text: '加载中...',
    //     spinnerType: 'fading-circle'
    //   })
    //   return config
    // }, function(error) {
    //   return Promise.reject(error)
    // })
    // axios.interceptors.response.use(function(response) {
    //   Indicator.close()
    //   return response
    // }, function(error) {
    //   return Promise.reject(error)
    // })
  }
})
Vue.prototype.goHome = function() {
  this.$router.push('/')
}
Vue.prototype.$http = axios

/* eslint-disable no-undef */
Vue.prototype.app = app

app.back = function() {
  window.history.go(-1)
  let loginInfo = JSON.parse(this.isLogin())
  if (loginInfo.Step === 0 && loginInfo.Result === 0) { // 已登录
    // alert('已登录')
  } else if (loginInfo.Step === 0 && loginInfo.Result !== 0) { // 未登录
    // alert('未登录')
    // Vue.prototype.goHome = function() {
    //   console.log(this)
    // }
  }
}
Vue.prototype.goback = function() {
  this.$router.go(-1)
}

Vue.prototype.loading = function(txt) {
  Indicator.open({
    text: txt,
    spinnerType: 'fading-circle'
  })
}
Vue.prototype.closeLoading = function() {
  Indicator.close()
}

window.addEventListener('resize', function() {
  // alert(1)
  if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
    // alert(2)
    window.setTimeout(function() {
      // alert(3)
      document.activeElement.scrollIntoViewIfNeeded()
    }, 0)
  }
})
