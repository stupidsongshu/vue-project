<style>
  .shopping-cart-number-small .el-input__inner {
    height: 25px;
    padding-right: 0 !important;
    padding-left: 0;
    text-align: center;
  }

  .shopping-cart-number-small {
    width: 88px;
  }

  .shopping-cart-number-small .el-input-number__decrease, .shopping-cart-number-small .el-input-number__increase {
    width: 25px;
    line-height: 25px;
    height: 25px;
    top: 0;
  }

  .shopping-cart-number-small .el-input-number__decrease {
    border-left: none;
    border-right: 1px solid #bfcbd9;
  }

  .shopping-cart-number-small .el-input-number__increase {
    right: 0
  }

  .shopping-cart-number-small .el-input-number__decrease {
    right: 61px !important;
  }
</style>
<template>
  <div>
    <el-breadcrumb separator="/" class="big-title">
      <el-breadcrumb-item>购物车(立即兑换)</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-loading="loading">
      <el-row class="text-align-center padding-top-20">
        <v-step :active="active"></v-step>
      </el-row>
      <el-row class="padding-top-20 table-style-none">
        <el-table :data="cartList" class="width--100" ref="cartList" @selection-change="getSelectList"
                  :row-style="getTableDisable">
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column label="礼品" width="220">
            <template scope="scope">
              <el-row class="padding-top-10 padding-bottom-10 table-column">
                <el-col :span="6">
                  <div class="padding-top-10">
                    <img :src="getImageUrl(scope.row.itemImageUri)" style="width:50px;height:50px;"/>
                  </div>
                </el-col>
                <el-col :span="18">
                  <el-form label-width="30px" class="table-form constraint-length" style="margin-top:5px;">
                    <div class="font-weight pointer" @click="goToItemInfo(scope.row)"> {{scope.row.itemName}}</div>
                    <el-form-item label="编码:" class="margin-bottom-0">{{scope.row.itemCode}}</el-form-item>
                    <el-form-item label="库存:" class="margin-bottom-0">
                      <div v-if="scope.row.publishStatus===0||scope.row.activeStatus===0">
                        0<span class="color-green">(礼品已下架,无法兑换)</span>
                      </div>
                      <div v-if="scope.row.publishStatus===1&&scope.row.activeStatus===1">
                        {{!!scope.row.logicalStock && scope.row.logicalStock > 0 ? scope.row.logicalStock : scope.row.usableStock}}
                        <span class="color-green"
                              v-if="(!!scope.row.logicalStock&&scope.row.logicalStock>0?scope.row.logicalStock:scope.row.usableStock)===0&&scope.row.isPreOrder === 0">(库存为0,无法兑换)</span>
                        <span class="color-green"
                              v-if="(!!scope.row.logicalStock&&scope.row.logicalStock>0?scope.row.logicalStock:scope.row.usableStock)===0&&scope.row.isPreOrder === 1">(预订商品,可兑换)</span>
                      </div>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label="积分" width="90">
            <template scope="scope">
              {{scope.row.exchangePoint}}
            </template>
          </el-table-column>
          <el-table-column label="类型" width="100">
            <template scope="scope">
              {{scope.row.pointTypeName}}
              <span v-if="scope.row.isSpecial===1">(特殊)</span>
            </template>
          </el-table-column>
          <el-table-column label="数量" width="100">
            <template scope="scope">
              <el-input-number v-model="scope.row.itemQuantity" :min="1"
                               :max="9999"
                               @change="getSelectListPoint(selectList,scope.row)"
                               class="shopping-cart-number-small" size="small"
                               :disabled="scope.row.publishStatus===0||scope.row.activeStatus===0?true:false"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="小计" width="90">
            <template scope="scope">
              {{scope.row.exchangePoint * scope.row.itemQuantity}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button size="small" type="text" @click="goToItemInfo(scope.row)" class="button-border">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <el-col class="clearfix margin-top-20">
          <div class="v-right">
          <span v-for="item in settlementPointList">{{item.pointTypeName}}: <span
            class="padding-right-10 color-green font-size-22">{{item.pointValue}}</span></span>
            <el-button type="primary" class="width-100" @click="getSettlementInfo()" :disabled="checkVerifyStatus">去结算
            </el-button>
          </div>
        </el-col>
        <el-col>
          <div class="text-align-right padding-top-10 color-gray">
            我的积分:<span v-for="item in pointList">{{item.pointTypeName}}: <span
            class="padding-right-10">{{item.pointValue}} <span v-if="item.specialPoint>0">(特殊积分:{{getSpecialPoint(item)}})</span></span></span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import vStep from '../../components/step.vue'
  export default{
    mounted() {
      this.itemId = this.$route.params.itemId;
      this.getCartList();
      this.getPoint();
    },
    components: {
      'v-step': vStep,
    },
    computed: {
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
        fileServer: 'config_g_fileServer'
      }),
      checkVerifyStatus(){
        return this.userInfo.verifyStatus === '01' ? true : false;
      },
    },
    data(){
      return {
        active: 0,
        clientId: '',
        cartList: [],
        defaultItemImage: require('../../../assets/images/image-not-found.png'),
        selectList: [],
        tableDisable: {
          backgroundColor: '#f1f1f1'
        },
        loading: false,
        pointList: [],
        settlementPointList: [],
        itemId: '',
      }
    },
    methods: {
      getCartList(){
        this.loading = true;
        this.clientId = this.userInfo.clientId;
        this.$store.dispatch('order_a_shoppingCartList', {params: {clientId: this.clientId}}).then((response) => {
          if (response.data.resultCode == 0) {
            for (let item in response.data.resultData.cartList) {
              if (response.data.resultData.cartList[item].itemId == this.itemId) {
                this.cartList.push(response.data.resultData.cartList[item])
              }
            }
            this.$nextTick(function () {
              for (let item in this.cartList) {
                this.$refs.cartList.toggleRowSelection(this.cartList[item], true);
              }
            })
            this.loading = false;
          } else {
            this.loading = false;
          }
        }, () => {
          this.loading = false;
        })
      },
      getImageUrl (imageUri){
        return !!imageUri ? this.fileServer + imageUri : this.defaultItemImage
      },
      getSelectList(val){
        this.selectList = val;
        for (let item in this.selectList) {
          this.selectList[item].selected = 1;
        }
        this.getSelectListPoint(this.selectList);

      },
      getSelectListPoint(selectList, row){
        this.$nextTick(function () {
          if (!!row) {
            if (row.itemQuantity > 9999) {
              row.itemQuantity = 9999;
            }
            let params = {
              itemId: row.itemId,
              itemQuantity: row.itemQuantity,
            }
            this.$store.dispatch('order_a_shoppingCartItemQuantityUpdate', {params: params}).then((response) => {
              if (response.data.resultCode == 0) {
              }
            })
          }
          for (let item in this.settlementPointList) {
            this.settlementPointList[item].pointValue = 0;
          }
          for (let item in selectList) {
            for (let item2 in this.settlementPointList) {
              if (selectList[item].pointType === this.settlementPointList[item2].pointType) {
                this.settlementPointList[item2].pointValue += selectList[item].itemQuantity * selectList[item].exchangePoint;
              }
            }
          }
        })
      },
      getTableDisable(row){
        if (row.publishStatus === 0 || row.activeStatus === 0) {
          return this.tableDisable;
        } else {
          return;
        }
      },
      getSettlementInfo(){
        for (let item in this.selectList) {
          if (this.selectList[item].publishStatus === 0 || this.selectList[item].activeStatus === 0) {
            this.$message.error("存在已下架或被删除的礼品,无法下单");
            return;
          }
          if (this.selectList[item].usableStock === 0) {
            if (!!this.selectList[item].isPreOrder && this.selectList[item].isPreOrder === 0) {
              this.$message.error("存在数量为0的礼品,且该商品不可预订,无法下单");
              return;
            }
          }
        }
        if (this.selectList.length === 0) {
          this.$message.error("您还没有选择任何礼品,无法下单");
          return;
        }
        let paramsList = [];
        for (var item in this.selectList) {
          paramsList.push({selected: this.selectList[item].selected, itemId: this.selectList[item].itemId})
        }
        this.$store.dispatch('order_a_shoppingCartItemSettlementCheck', {params: paramsList}).then((response) => {
          if (response.data.resultCode == 0) {
            if (!!response.data.resultData && !!response.data.resultData.useSecond && !!response.data.resultData.useSecondRemark) {
              this.$confirm(response.data.resultData.useSecondRemark, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$router.push({name: 'confirm-order'});
              }).catch(() => {
              });
            } else {
              this.$router.push({name: 'confirm-order'});
            }
          }
        })
      },
      getPoint(){
        this.$store.dispatch('user_a_getPoint').then((response) => {
          if (response.data.resultCode == 0) {
            this.pointList = response.data.resultData.pointList;
            for (let item in this.pointList) {
              this.settlementPointList.push({
                pointTypeName: this.pointList[item].pointTypeName,
                pointType: this.pointList[item].pointType,
                pointValue: 0,
              })
            }
          }
        })
      },
      goToItemInfo(item){
        this.setRecentlyViewed(item);
        this.$router.push({name: 'item-info', params: {itemId: item.itemId}});
      },
      setRecentlyViewed(item){
        var params = {
          itemName: item.itemName,
          exchangePoint: item.exchangePoint,
          itemImageUri: item.itemImageUri,
          itemId: item.itemId,
        };
        this.$store.dispatch('user_a_updateRecentlyViewed', {params: params})
      },
      getSpecialPoint(item){
        if (item.specialPoint <= item.pointValue) {
          return item.specialPoint
        } else {
          return item.pointValue
        }
      },
    }
  }
</script>
<style>
</style>