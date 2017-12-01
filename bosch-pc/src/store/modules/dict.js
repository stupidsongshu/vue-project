import dictApi from '../../services/service.dict'
import Vue from 'vue'

const state = {
  /*省份城市信息*/
  provinceArray: [],
  cityArray: [],
  countyArray: [],
  itemCategoryList: [],
  splitStatusMap: [],
  itemTagCategoryList: [],
  clientVerifyStatusMap:[],
  orderStatusMap:[],
  orderDetailReturnReasonMap:[],
  activityTypeMap:[],
}

const getters = {}

const actions = {
  dict_a_queryItemCategoryData ({commit}, payload) {
    var params = !!payload ? payload.params : {}
    dictApi.queryItemCategoryData(params).then(
      (response) => {
        commit('dict_m_updateItemCategoryData', response.data.resultData)
      }
    )
  },
  dict_a_queryItemTagCategoryData ({commit}, payload) {
    var params = !!payload ? payload.params : {}
    dictApi.queryItemTagCategoryData(params).then(
      (response) => {
        commit('dict_m_updateItemTagCategoryData', response.data.resultData)
      }
    )
  },
  dict_a_provinceData({commit}) {
    return new Promise((resolve) => {
      dictApi.queryProvinceData().then(
        (response) => {
          commit('dict_m_provinceData', response.data.resultData.provinceList)
          resolve()
        },
        () => {resolve()}
      )
    })

  },
  dict_a_cityData({commit}, payload) {
    if (!payload.params.provinceCode) {
      commit('dict_m_cityData', [])
      commit('dict_m_countyData', [])
      return
    }
    return new Promise((resolve) => {
      dictApi.queryCityData(payload.params).then(
        (response) => {
          commit('dict_m_cityData', response.data.resultData.cityList)
          resolve()
        },
        () => { resolve() }
      )
    })

  },
  dict_a_countyData({commit}, payload) {
    if (!payload.params.cityCode) {
      commit('dict_m_countyData', [])
      return
    }
    return new Promise((resolve) => {
      dictApi.queryCountyData(payload.params).then(
        (response) => {
          commit('dict_m_countyData', response.data.resultData.countyList)
          resolve()
        },
        () => { resolve() }
      )
    })

  },
  dict_a_queryDictByName({commit, state}, dictName) {
    if (!dictName) {
      return
    }
    if (state[dictName] && state[dictName].length > 0) {
      return
    }
    dictApi.queryDictData({name: dictName}).then(
      (response) => {
        if (response.data.resultCode == '0' && response.data.resultData[dictName]) {
          commit('dict_m_updateDictByName', {
            data: response.data.resultData[dictName],
            name: dictName
          })
        }
      }
    )
  },
}

const mutations = {
  dict_m_updateItemCategoryData (state, resultData) {
    state.itemCategoryList = resultData.categoryList
  },
  dict_m_updateItemTagCategoryData (state, resultData) {
    state.itemTagCategoryList = resultData.tagList
  },
  dict_m_provinceData(state, provinceList) {
    state.provinceArray = provinceList
  },
  dict_m_cityData(state, cityList) {
    state.cityArray = cityList;
  },
  dict_m_countyData(state, countyList) {
    state.countyArray = countyList;
  },
  dict_m_updateDictByName(state, dictObj) {
    const dictName = dictObj.name
    const dictData = dictObj.data
    if (!!dictName && !!dictData && dictData.length > 0) {
      Vue.set(state, dictName, dictData)
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
