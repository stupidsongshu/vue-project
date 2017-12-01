import Vue from 'vue'
import store from '../store'

const fileApi = {
  uploadFile (params) {
    return Vue.http.post(store.getters.config_g_apiServer + '/file/upload', params)
  },
  deleteFileById(params) {
    return Vue.http.post(store.getters.config_g_apiServer + '/file/delete', params)
  }
}

export default fileApi
