<template>
  <div>
    <el-breadcrumb separator="/" class="big-title">
      <el-breadcrumb-item>我的订单</el-breadcrumb-item>
      <el-breadcrumb-item v-if="orderInfo.baseInfo.orderStatus==='10'|| orderInfo.baseInfo.orderStatus==='20'">等待发货
      </el-breadcrumb-item>
      <el-breadcrumb-item v-if="orderInfo.baseInfo.orderStatus==='30'">货物送达</el-breadcrumb-item>
      <el-breadcrumb-item v-if="orderInfo.baseInfo.orderStatus==='50'">订单完成</el-breadcrumb-item>
      <el-breadcrumb-item v-if="orderInfo.baseInfo.orderStatus==='90'">客户取消</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="text-align-center padding-top-20" v-if="orderInfo.baseInfo.orderStatus!=='90'">
      <v-step :active="getActive"></v-step>
    </el-row>
    <el-row>
      <h4>基本信息</h4>
      <el-form label-width="60px">
        <el-col :span="12">
          <el-form-item label="订单编号" class="margin-bottom-0">{{orderInfo.baseInfo.orderNumber}}</el-form-item>
          <el-form-item label="订单拆分" class="margin-bottom-0">{{orderInfo.baseInfo.splitStatusName}}</el-form-item>
          <el-form-item label="创建日期" class="margin-bottom-0">{{orderInfo.baseInfo.orderDate | getDate}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单状态" class="margin-bottom-0">{{orderInfo.baseInfo.orderStatusName}}</el-form-item>
          <el-form-item :label="item.pointTypeName" v-for="item in orderInfo.orderPoint" :key='item.pointType'
                        class="margin-bottom-0">
            {{item.pointValue}}<span v-if="item.isSpecial===1">(特殊积分)</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注详情" class="margin-bottom-0">{{orderInfo.baseInfo.orderRemark || '无备注'}}</el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
      <h4>收货人信息</h4>
      <el-form label-width="60px">
        <el-col :span="12">
          <el-form-item label="联系人" class="margin-bottom-0">{{orderInfo.baseInfo.receivePerson}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" class="margin-bottom-0">{{orderInfo.baseInfo.receivePhone}}</el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="收货地址" class="margin-bottom-0">
            {{(orderInfo.baseInfo.provinceName || '') + (orderInfo.baseInfo.cityName || '') + (orderInfo.baseInfo.countyName || '') + orderInfo.baseInfo.detailAddress}}
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row v-if="isSpecial===1">
      <h4>兑换承诺书</h4>
      <el-form label-width="60px">
        <el-col :span="12" v-if="orderInfo.baseInfo.orderStatus === '10'&&(orderInfo.baseInfo.splitStatus!=='03')">
          <el-form-item label="下载文件" class="margin-bottom-10">
            <el-button type="primary" v-if="true">
              <a :href="authorizationFile" target="_blank" style="color:#fff;text-decoration:none;">下载终端支持类礼品兑换承诺书</a>
            </el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="承诺书" class="margin-bottom-10">
            <file-upload ref="dataFileUpload" showType="text" @uploaded="getDataFile" @removed="clearDataFile"
                         class="inline-block" :showFileList="false"
                         v-if="!orderInfo.baseInfo.commitmentFileUri"></file-upload>
            <el-button type="primary" @click="download(orderInfo.baseInfo.commitmentFileUri)"
                       v-if="!!orderInfo.baseInfo.commitmentFileUri">查看文件
            </el-button>
            <el-button @click="removeFile()"
                       v-if="!!orderInfo.baseInfo.commitmentFileUri&&orderInfo.baseInfo.orderStatus === '10'&&(orderInfo.baseInfo.splitStatus!=='03')">清除文件
            </el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <order-list v-if="!orderInfo.subOrderList||orderInfo.subOrderList.length===0" :orderInfo="orderInfo"
                @refresh="refreshPage"></order-list>
    <sub-order-list v-if="!!orderInfo.subOrderList&&!!orderInfo.subOrderList.length>0"
                    :orderInfo="orderInfo" @refresh="refreshPage"></sub-order-list>
    <div class="text-align-center margin-top-20">
      <el-button @click="goToWeb()">返回</el-button>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import vStep from '../../components/step.vue'
  import orderList from './components/order-list.vue'
  import subOrderList from './components/sub-order-list.vue'
  import FileUpload from '../../components/file-upload.vue'
  export default{
    mounted() {
      this.orderId = this.$route.params.orderId;
      this.getOrderInfo();
    },
    components: {
      'v-step': vStep,
      'sub-order-list': subOrderList,
      'order-list': orderList,
      'file-upload': FileUpload,
    },
    computed: {
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
        fileServer: 'config_g_fileServer',
      }),
      getActive(){
        if (!!this.orderInfo && this.orderInfo.baseInfo.orderStatus === '10' || this.orderInfo.baseInfo.orderStatus === '20') {
          return 2;
        } else if (!!this.orderInfo && this.orderInfo.baseInfo.orderStatus === '30') {
          return 3;
        } else if (!!this.orderInfo && this.orderInfo.baseInfo.orderStatus === '50') {
          return 4;
        }
      },
    },
    data(){
      return {
        orderId: '',
        orderInfo: {
          baseInfo: {},
          orderPoint: [],
          detailList: [],
          subOrderList: [],
        },
        importForm: {
          dataFileId: '',
        },
        isSpecial: '',
        fileList: [],
        authorizationFile: require('../../../assets/files/终端活动承诺书.pdf'),
        loading: false,
      }
    },
    methods: {
      goToWeb(){
        this.$router.push({name: 'my-order'});
      },
      getOrderInfo(){
        this.loading = true;
        this.$store.dispatch('order_a_getOrderInfo', {params: this.orderId}).then((response) => {
          this.loading = false;
          if (response.data.resultCode == 0) {
            this.orderInfo = response.data.resultData.orderInfo;
            if (!!this.orderInfo.detailList && this.orderInfo.detailList.length > 0) {
              if (this.orderInfo.detailList[0].isSpecial === 1) {
                this.isSpecial = 1;
                let vm = this;
                setTimeout(function () {
                  vm.$nextTick(function () {
                    if (!vm.orderInfo.baseInfo.commitmentFileUri) {
                      vm.$nextTick(function () {
                        vm.promptInfo();
                      })
                    }
                  })
                }, 1000)
              } else {
                this.isSpecial = 0;
              }
            }
          }
        }, () => {
          this.loading = false;
        })
      },
      promptInfo(){
        this.$alert('您所兑换的商品为终端支持类礼品请先下载‘ 终端支持类礼品兑换承诺书’，完成填写和盖章后再次上传，客服仅在收到核对无误的承诺书才会通知仓库配送发货，如您有任何疑问请直接联系客服', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            console.log('ok')
          }
        });
      },
      getDataFile(file){
        this.importForm.dataFileId = file.fileId;
        let params = {
          orderId: this.orderId,
          commitmentFileId: this.importForm.dataFileId
        };
        this.$store.dispatch('order_a_commitmentUpload', {params: params}).then((response) => {
          this.loading = false;
          if (response.data.resultCode == 0) {
            this.$message.success('兑换授权书上传成功')
            this.getOrderInfo();
          }
        })
      },
      clearDataFile(){
        this.importForm.dataFileId = '';
      },
      removeFile(){
        this.$confirm('是否要删除该文件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            orderId: this.orderId,
            commitmentFileId: ''
          };
          this.$store.dispatch('order_a_commitmentUpload', {params: params}).then((response) => {
            this.loading = false;
            if (response.data.resultCode == 0) {
              this.$message.success('兑换授权书删除成功')
              this.getOrderInfo();
            }
          })
        }).catch(() => {
          console.log('close')
        });
      },
      download(fileUri){
        if (!!fileUri) {
          window.open(this.fileServer + fileUri);
        } else {
          this.$message.error('该订单还未上传授权书文件,或请刷新尝试再次点击');
        }
      },
      refreshPage(val){
        if (!!val) {
          this.getOrderInfo();
        }
      },
    },
  }
</script>
<style>
</style>