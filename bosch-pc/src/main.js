import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import {interceptor} from './utils'
import filters from './filters'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/css/bosch-extra-style.css'
import './assets/css/quill.core.css'
import store from './store'
import router from './routers'
import Vuebar from 'vuebar'

//开启debug模式
Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Element);
Vue.use(Vuebar)

//加入过滤器
for(var i in filters){Vue.filter(filters[i].name,filters[i].func)}
// 初始化router

// 初始化HTTP全局配置
Vue.http.interceptors.push(interceptor);
const app = new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
export {router}

