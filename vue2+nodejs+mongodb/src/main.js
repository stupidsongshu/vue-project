// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  /*template: '<App/>',
  components: { App },*/
  // render: h => h(App),
  render: function(h) {
    return h(App);
  },
  mounted() {
    // 全局拦截器
    Vue.http.interceptors.push((request, next) => {
      console.log('request init');

      next((response) => {
        console.log('response over');
        return response;
      });
    });
  },
  http: {
    // 配置全局接口路径
    root: 'http://localhost:4200/'
  }
});
