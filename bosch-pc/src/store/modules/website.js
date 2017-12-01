import websiteApi from '../../services/service.website'


const state = {}

const getters = {}

const actions = {
  websitie_a_getItemRecommendData(context, payload){
    return websiteApi.getItemRecommendData()
  },
  websitie_a_getContentData(context, payload){
    return websiteApi.getContentData()
  },
  websitie_a_getBrandInfoList(context, payload){
    return websiteApi.getBrandInfoList()
  },
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}

