import itemApi from '../../services/service.item'


const state = {}

const getters = {}

const actions = {
  item_a_queryItemList(context, payload){
    return itemApi.queryItemList(payload.params)
  },
  item_a_getItemInfo(context, payload){
    return itemApi.getItemInfo(payload.params)
  },
  item_a_getItemKeywordList(context, payload){
    return itemApi.getItemKeywordList()
  },
  item_a_getItemCategoryInfo(context, payload){
    return itemApi.getItemCategoryInfo(payload.params)
  },
  item_a_getItemKeywordAssociateList(context, payload){
    return itemApi.getItemKeywordAssociateList(payload.params)
  },
  item_a_itemFavoriteAdd(context, payload){
    return itemApi.itemFavoriteAdd(payload.params)
  },
  item_a_itemFavoriteRemove(context, payload){
    return itemApi.itemFavoriteRemove(payload.params)
  },
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}

