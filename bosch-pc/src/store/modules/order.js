import orderApi from '../../services/service.order'
import  {commonUtils} from '../../utils'


const state = {
  cartList:[],

}

const getters = {

}

const actions = {
  order_a_getCartList ({commit}, payload) {
    var params = !!payload ? payload.params : {}
    orderApi.order_a_shoppingCartList(payload.params).then(
      (response) => {
        commit('order_m_updateCartList', response.data.resultData)
      }
    )
  },
  order_a_shoppingCartAdd(context, payload){
    return orderApi.shoppingCartAdd(payload.params)
  },
  order_a_shoppingCartList(context, payload){
    return orderApi.order_a_shoppingCartList(payload.params)
  },
  order_a_shoppingCartDelete(context, payload){
    return orderApi.shoppingCartDelete(payload.params)
  },
  order_a_shoppingCartItemQuantityUpdate(context, payload){
    return orderApi.shoppingCartItemQuantityUpdate(payload.params)
  },
  order_a_shoppingCartItemSettlementCheck(context, payload){
    return orderApi.shoppingCartItemSettlementCheck(payload.params)
  },
  order_a_favoriteAdd(context, payload){
    return orderApi.favoriteAdd(payload.params)
  },
  order_a_favoriteRemove(context, payload){
    return orderApi.favoriteRemove(payload.params)
  },
  order_a_favoriteList(){
    return orderApi.favoriteList()
  },
  order_a_orderCreateInit(){
    return orderApi.orderCreateInit()
  },
  order_a_orderCreate(context, payload){
    return orderApi.orderCreate(payload.params)
  },
  order_a_getOrderInfo(context, payload){
    return orderApi.getOrderInfo(payload.params)
  },
  order_a_shoppingCartBuy(context, payload){
    return orderApi.shoppingCartBuy(payload.params)
  },
  order_a_orderItemReturn(context, payload){
    return orderApi.orderItemReturn(payload.params)
  },
  order_a_queryOrderList(context, payload){
    return orderApi.queryOrderList(payload.params)
  },
  order_a_commitmentUpload(context, payload){
    return orderApi.commitmentUpload(payload.params)
  },
  order_a_queryLogistics(context, payload){
    return orderApi.queryLogistics(payload.params)
  },
}

const mutations = {
  order_m_updateCartList (state, resultData) {
    state.cartList = resultData.cartList;
  },
  order_m_AddCartListData (state, payload){
    if(!!state.cartList){
      for(let item in payload){
        state.cartList.push(payload[item])
      }
      for(var i = 0 ; i<state.cartList.length;i++){
        for(var j = i+1; j<state.cartList.length;j++){
          if(state.cartList[i].itemId===state.cartList[j].itemId){
            state.cartList.splice(j,1);
          }
        }
      }
    }
  },
  order_m_removeCartListData (state, payload){
    if(!!state.cartList){
      for(var i = 0 ; i<state.cartList.length;i++){
        for(var j = 0; j<payload.length;j++){
          if(state.cartList[i].itemId===payload[j].itemId){
            state.cartList.splice(i,1);
            payload.splice(j,1);
            i--;
            break;
          }
        }
      }
    }
  },
  }

export default {
  state,
  getters,
  actions,
  mutations
}
