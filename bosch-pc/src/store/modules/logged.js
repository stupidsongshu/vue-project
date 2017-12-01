import loggedApi from '../../services/service.logged'


const state = {}

const getters = {}

const actions = {
  logged_a_queryNoticeList(context, payload){
    return loggedApi.queryNoticeList()
  },
  logged_a_getNoticeInfo(context, payload){
    return loggedApi.getNoticeInfo(payload.params)
  },
  logged_a_queryRankData(context, payload){
    return loggedApi.queryRankData()
  },
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}