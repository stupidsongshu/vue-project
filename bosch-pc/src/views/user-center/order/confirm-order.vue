<style>
  .addressRadio .el-radio + .el-radio {
    margin-left: 0;
  }

  .addressRadio .el-radio {
    margin-top: 6px;
  }
</style>
<template>
  <div>
    <el-breadcrumb separator="/" class="big-title">
      <el-breadcrumb-item>我的订单</el-breadcrumb-item>
      <el-breadcrumb-item>确认订单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="text-align-center padding-top-20">
      <v-step :active="active"></v-step>
    </el-row>
    <el-row>
      <el-col :span="12">
        <h4>选择地址</h4>
      </el-col>
      <el-col :span="12" class="text-align-right">
        <!--<el-button type="primary"  @click="showDialog()">新建地址</el-button>-->
        <el-button type="primary" @click="$router.push({name:'user-address'})">管理地址</el-button>
      </el-col>
      <el-col :span="24">
        <el-form v-if="!!addressList&&addressList.length>0">
          <el-form-item label="促销品寄送地址">
            <el-radio-group v-model="addressId" class="addressRadio">
              <el-radio :label="item.addressId" v-for="item in addressList" :key="item.addressId"
                        class="block">
                {{(item.provinceName || '') + (item.cityName || '') + (item.countyName || '') + item.detailAddress}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.contactPerson}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.contactMobile}}<span
                v-if="item.isDefault===1" class="color-green margin-left-10">(默认地址)</span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <h4>备注信息(选填)</h4>
        <el-form label-width="35px">
          <el-form-item label="备注">
            <el-input v-model="orderRemark" placeholder="请输入想要备注的内容"></el-input>
          </el-form-item>
        </el-form>
        <h4>礼品清单</h4>
        <el-table :data="orderItems" border>
          <el-table-column label="图片" width="90">
            <template scope="scope">
              <img :src="getImageUrl(scope.row.itemImageUri)" class="width-50 height-50" style="margin-top:10px"/>
            </template>
          </el-table-column>
          <el-table-column prop="itemName" label="名称" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column prop="itemCode" label="编码" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column label="积分" show-overflow-tooltip width="120">
            <template scope="scope">{{scope.row.pointValue + '(' + scope.row.pointTypeName + ')'}}</template>
          </el-table-column>
          <el-table-column prop="itemQuantity" label="数量" show-overflow-tooltip width="90"></el-table-column>
          <el-table-column label="兑换详情" show-overflow-tooltip>
            <template scope="scope">
              <div v-for="item in scope.row.usePoint" :key="item.pointType">
                {{item.pointTypeName}}:{{item.pointValue}}<span v-if="item.isSpecial===1">(特殊)</span></div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="padding-top-20">
      <el-col class="clearfix">
        <div class="v-right">
          <span v-for="item in orderPoint">应付{{item.pointTypeName}}: <span
            class="padding-right-20 color-green font-size-22">{{item.pointValue}}</span>
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row class="padding-top-10">
      <el-col class="clearfix">
        <div class="v-right">
          <span class="padding-right-20">促销品寄送至 : {{getAddressText}}</span>
          <span class="padding-right-10">联系人 : {{getContactPerson}}</span>
          <span class="padding-right-20">{{getContactMobile}}</span>
        </div>
      </el-col>
    </el-row>
    <div class="padding-top-50 text-align-center">
      <el-button class="margin-right-20" @click="goBack()">返回</el-button>
      <el-button type="primary margin-right-20" @click="orderCreate()">提交订单</el-button>
    </div>
    <user-address-dialog ref="user-address-dialog" @refresh="refreshPage"></user-address-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import userAddressDialog from '../address/components/user-address-dialog.vue'
  import vStep from '../../components/step.vue'
  export default{
    mounted() {
      this.queryaddressData();
      this.init();
    },
    components: {
      'v-step': vStep,
      'user-address-dialog': userAddressDialog,
    },
    computed: {
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
        fileServer: 'config_g_fileServer'
      }),
      getAddressText(){
        for (let item in  this.addressList) {
          if (this.addressList[item].addressId === this.addressId) {
            return (this.addressList[item].provinceName || '') + (this.addressList[item].cityName || '') + (this.addressList[item].countyName || '') + this.addressList[item].detailAddress;
          }
        }
      },
      getContactPerson(){
        for (let item in  this.addressList) {
          if (this.addressList[item].addressId === this.addressId) {
            return this.addressList[item].contactPerson;
          }
        }
      },
      getContactMobile(){
        for (let item in  this.addressList) {
          if (this.addressList[item].addressId === this.addressId) {
            return this.addressList[item].contactMobile;
          }
        }
      },
    },
    data(){
      return {
        active: 1,
        orderItems: [],
        orderPoint: [],
        orderList: [],
        addressId: '',
        orderRemark: '',
        isSpecial: '',
        addressList: [],
        defaultItemImage: require('../../../assets/images/image-not-found.png'),
      }
    },
    methods: {
      init(){
        this.$store.dispatch('order_a_orderCreateInit').then((response) => {
          if (response.data.resultCode == 0) {
            this.orderItems = response.data.resultData.orderItems;
            this.orderPoint = response.data.resultData.orderPoint;
          }
        })
      },
      showDialog(){
        this.$refs['user-address-dialog'].showUserAddressDialog();
      },
      refreshPage(val){
        if (!!val) {
          this.queryaddressData();
        }
      },
      queryaddressData(){
        this.$store.dispatch('user_a_getClientAddressList').then((response) => {
          if (response.data.resultCode == 0) {
            this.addressList = response.data.resultData.addressList || [];
            if (this.addressList.length > 0) {
              for (let item in  this.addressList) {
                if (this.addressList[item].isDefault === 1) {
                  this.addressId = this.addressList[item].addressId;
                }
              }
              if (this.addressId === '') {
                this.addressId = this.addressList[0].addressId;
              }
            }
          }
        })
      },
      getImageUrl (imageUri){
        return !!imageUri ? this.fileServer + imageUri : this.defaultItemImage
      },
      goBack(){
        this.$router.go(-1);
      },
      goToWeb(){
        this.$router.push({name: 'user-address'});
      },
      orderCreate(){
        if (this.addressList.length === 0) {
          this.$message({type: 'error', message: '还没有地址,请新建收货地址再订购!'});
          return;
        }
        this.orderList = [];
        for (let item in this.orderItems) {
          this.orderList.push({itemId: this.orderItems[item].itemId, itemQuantity: this.orderItems[item].itemQuantity})
        }
        let params = {
          addressId: this.addressId,
          orderRemark: this.orderRemark,
          detailList: this.orderList,
        };
        this.$store.dispatch('order_a_orderCreate', {params: params}).then((response) => {
          if (response.data.resultCode == 0) {
            this.$store.commit('order_m_removeCartListData', this.orderList)
            this.$message({type: 'success', message: '创建订单成功!'});
            this.$router.push({name: 'order-info', params: {orderId: response.data.resultData.orderInfo.orderId}});
          }
        })
      },
    }
  }
</script>
<style>
</style>