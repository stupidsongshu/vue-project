import fileApi from '../../services/service.file'

const state = {
  env: {
    dev: {
      name:'dev',
      // apiServer: 'http://127.0.0.1:8081/site-service/api',
      // apiServer: 'http://192.168.100.210:9080/site-service/api',
      // fileServer: 'http://192.168.100.210:8081'
      apiServer: 'http://extra-service.chinanorth.cloudapp.chinacloudapi.cn:8000/site-service/api',
      fileServer: 'http://extra-img.chinanorth.cloudapp.chinacloudapi.cn:8000'
    },
    stg: {
      name:'stg',
      apiServer: 'http://192.168.100.210:9080/site-service/api',
      fileServer: 'http://192.168.100.210:8081'
    },
    demo: {
      name:'demo',
      apiServer: 'http://ipn02.chinanorth.cloudapp.chinacloudapi.cn:9080/site-service/api',
      fileServer: 'http://ipn02.chinanorth.cloudapp.chinacloudapi.cn:8082'
    },
    test: {
      name:'test',
      apiServer: 'http://extra-service.chinanorth.cloudapp.chinacloudapi.cn:8000/site-service/api',
      fileServer: 'http://extra-img.chinanorth.cloudapp.chinacloudapi.cn:8000'
    },
    prod: {
      name:'prod',
      apiServer: 'http://extra-service.chinanorth.cloudapp.chinacloudapi.cn/site-service/api',
      fileServer: 'http://extra-img.chinanorth.cloudapp.chinacloudapi.cn'
    }
  },
}
const getters = {
  config_g_apiServer (state) {
    var curEnv = process.env.NODE_ENV
    if (curEnv == 'production') {
      return state.env.prod.apiServer
    } else if (curEnv == 'test') {
      return state.env.test.apiServer
    }else if (curEnv == 'stage') {
      return state.env.stg.apiServer
    } else if (curEnv == 'demo') {
      return state.env.demo.apiServer
    } else {
      return state.env.dev.apiServer
    }
  },
  config_g_curEnv (state) {
    let curEnv = process.env.NODE_ENV
    if (curEnv == 'production') {
      return state.env.prod.name
    } else if (curEnv == 'test') {
      return state.env.test.name
    } else if (curEnv == 'stage') {
      return state.env.stg.name
    } else if (curEnv == 'demo') {
      return state.env.demo.name
    } else {
      return state.env.dev.name
    }
  },
  config_g_fileServer (state) {
    var curEnv = process.env.NODE_ENV
    if (curEnv == 'production') {
      return state.env.prod.fileServer
    } else if (curEnv == 'test') {
      return state.env.test.fileServer
    } else if (curEnv == 'stage') {
      return state.env.stg.fileServer
    } else if (curEnv == 'demo') {
      return state.env.demo.fileServer
    } else {
      return state.env.dev.fileServer
    }
  },
  config_g_fileUploadTarget (state, getters) {
    return getters.config_g_apiServer + '/file/upload'
  },
  config_g_fileUploadTargetPublic (state, getters) {
    return getters.config_g_apiServer + '/public/file/upload'
  }
}

const actions = {
  file_a_deleteById(context, payload){
    return fileApi.deleteFileById({fileId: payload.fileId})
  }
}
export default {
  state,
  getters,
  actions
}
