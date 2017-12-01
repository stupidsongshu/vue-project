import activityApi from '../../services/service.activity'


const state = {}

const getters = {}

const actions = {
  activity_a_queryActivityList(context, payload){
    return activityApi.queryActivityList(payload.params)
  },
  activity_a_getActivityInfo(context, payload){
    return activityApi.getActivityInfo(payload.params)
  },
  activity_a_queryActivityQuestionList(context, payload){
    return activityApi.queryActivityQuestionList(payload.params)
  },
  activity_a_queryActivityQuestionCheck(context, payload){
    return activityApi.queryActivityQuestionCheck(payload.params)
  },
  activity_a_queryActivityQuestionSubmit(context, payload){
    return activityApi.queryActivityQuestionSubmit(payload.params)
  },
  activity_a_queryActivityQuestionAnswer(context, payload){
    return activityApi.queryActivityQuestionAnswer(payload.params)
  },
  activity_a_obtainRedPacket(context, payload){
    return activityApi.obtainRedPacket(payload.params)
  },
  activity_a_queryActivitySeckillList(context, payload){
    return activityApi.queryActivitySeckillList(payload.params)
  },
  activity_a_queryActivitySeckillSubmit(context, payload){
    return activityApi.queryActivitySeckillSubmit(payload.params)
  },
}

const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations
}
