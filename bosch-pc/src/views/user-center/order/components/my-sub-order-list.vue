<template>
  <div>
    <el-row class="table-left-0">
      <div style="background-color:#f1f1f1;border:1px solid #e5e4e4;border-bottom:none;" >
        <el-form label-width="80px" :inline="true" class="clearfix">
          <div class="v-left">
            <el-form-item label="订单编号 : " class="margin-bottom-0">{{orderInfo.baseInfo.orderNumber}}</el-form-item>
            <el-form-item label="订单拆分 : " class="margin-bottom-0">{{orderInfo.baseInfo.splitStatusName}}</el-form-item>
            <el-form-item label="创建时间 : " class="margin-bottom-0">{{orderInfo.baseInfo.orderDate | getDate}}
            </el-form-item>
          </div>
          <div class="v-right">
            <span class="hover pointer padding-right-10" style="line-height:30px;"
                  @click="goToOrderInfo(orderInfo.baseInfo.orderId)">查看详情</span>
          </div>
        </el-form>
      </div>
      <div v-for="item in orderInfo.subOrderList">
        <div  style="background-color:#f1f1f1;border-right:1px solid #e5e4e4;border-left:1px solid #e5e4e4;" class="clearfix">
          <el-form label-width="90px" :inline="true">
            <div class="v-left">
              <el-form-item label="子订单编号 : " class="margin-bottom-0">{{item.baseInfo.orderNumber}}
              </el-form-item>
              <el-form-item label="子订单状态 : " class="margin-bottom-0">{{item.baseInfo.orderStatusName}}</el-form-item>
            </div>
            <div class="v-right" v-if="!!item.baseInfo.logisticsNumber">
              <el-form-item label="物流状态 : " class="margin-bottom-0">
                <span class="hover pointer"  @click="showLogisticsDialog(item.baseInfo)">物流查看</span>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <el-table :data="getDetailList(item.detailList)" class="width--100" :show-header="false">
          <el-table-column label="礼品" width="220">
            <template scope="scope">
              <el-row class="padding-top-10 padding-bottom-10 table-column">
                <el-col :span="6">
                  <div class="padding-top-10">
                    <img :src="getImageUrl(scope.row.itemImageUri)" style="width:50px;height:50px;"/>
                  </div>
                </el-col>
                <el-col :span="18">
                  <el-form label-width="50px" class="table-form constraint-length" style="margin-top:5px;">
                    <div class="font-weight pointer" style="padding-left:15px" @click="goToItemInfo(scope.row)"> {{scope.row.itemName}}</div>
                    <el-form-item label="编码:" class="margin-bottom-0">{{scope.row.itemCode}}</el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label="积分" width="150">
            <template scope="scope">{{scope.row.pointValue + '(' + scope.row.pointTypeName + ')'}}</template>
          </el-table-column>
          <el-table-column prop='itemQuantity' label="数量" width="90"></el-table-column>
          <el-table-column label="兑换详情" width="150">
            <template scope="scope">
              <div v-for="item in scope.row.detailPoint" :key="item.pointType">
                {{item.pointTypeName}}:{{item.pointValue}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button size="small" type="text" @click="returnItem(scope.row)" class="button-border"
                         v-if="showCancelOrder(scope.row,item.baseInfo)">取消订购
              </el-button>
              <el-button size="small" type="text" @click="returnReason(scope.row)" class="button-border"
                         v-if="scope.row.returnStatus===1">取消详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="moreList" class="width--100" :show-header="false" style="margin-top:-1px" v-if="item.detailList.length > 5">
          <el-table-column prop='text'></el-table-column>
        </el-table>
      </div>
    </el-row>
    <return-item-dialog ref="return-item-dialog" @refresh="refreshPage"></return-item-dialog>
    <return-reason-dialog ref="return-reason-dialog"></return-reason-dialog>
    <logistics-dialog ref="logistics-dialog"></logistics-dialog>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  import returnItemDialog from './return-item-dialog.vue'
  import returnReasonDialog from './return-reason-dialog.vue'
  import logisticsDialog from './logistics-dialog.vue'
  export default{
    components: {
      'return-item-dialog': returnItemDialog,
      'return-reason-dialog': returnReasonDialog,
      'logistics-dialog': logisticsDialog,
    },
    props: {
      orderInfo: Object,
    },
    mounted() {
      this.$store.dispatch('dict_a_queryDictByName', 'orderStatusMap')
    },
    computed: {
      ...mapGetters({
        fileServer: 'config_g_fileServer'
      }),
      ...mapState({
        orderStatusMap: state => state.dict.orderStatusMap,
      }),
    },
    data(){
      return {
        list: [],
        defaultItemImage: require('../../../../assets/images/image-not-found.png'),
        moreList: [
          {
            text: '礼品有点多,请点击右上方查看详情'
          }
        ]
      }
    },
    methods: {
      getImageUrl (imageUri){
        return !!imageUri ? this.fileServer + imageUri : this.defaultItemImage
      },
      returnItem(row){
        this.$refs['return-item-dialog'].showDialog(row);
      },
      returnReason(row){
        this.$refs['return-reason-dialog'].showDialog(row);
      },
      getOrderStatus(orderStatus){
        if (!!this.orderStatusMap) {
          for (let item in this.orderStatusMap) {
            if (this.orderStatusMap[item].key === orderStatus) {
              return this.orderStatusMap[item].value;
            }
          }
        }
      },
      showCancelOrder(row,baseInfo){
        return row.returnStatus === 0 && baseInfo.orderStatus === '10' ? true : false;
      },
      goToOrderInfo(orderId){
        this.$router.push({name: 'order-info', params: {orderId: orderId}});
      },
      goToItemInfo(item){
        this.setRecentlyViewed(item);
        this.$router.push({name: 'item-info', params: {itemId: item.itemId}});
      },
      setRecentlyViewed(item){
        var params = {
          itemName: item.itemName,
          exchangePoint: item.pointValue,
          itemImageUri: item.itemImageUri,
          itemId: item.itemId,
        };
        this.$store.dispatch('user_a_updateRecentlyViewed', {params: params})
      },
      showLogisticsDialog(baseInfo){
        this.$refs['logistics-dialog'].showDialog(baseInfo);
      },
      refreshPage(val){
        if (!!val) {
          this.$emit('refresh', true);
        }
      },
      getDetailList(list){
        let detailList = [];
        if (list.length > 5) {
          for (let i = 0; i < 5; i++) {
            detailList.push(list[i])
          }
        } else {
          detailList = list
        }
        return detailList;
      }
    }
  }
</script>
<style>
</style>