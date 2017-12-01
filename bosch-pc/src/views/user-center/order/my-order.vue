<template>
  <div>
    <el-breadcrumb separator="/" class="big-title">
      <el-breadcrumb-item>我的订单</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-loading="loading">
      <el-row style="padding:10px 10px;border:1px solid #d4d4d4;border-radius:3px;margin-top:8px;">
        <el-col>
          <el-form :model="queryParam" label-width="70px" ref="queryParam">
            <el-row>
              <el-col :span="9">
                <el-form-item label="订单状态" class="margin-bottom-10" prop="orderStatus">
                  <el-select v-model="queryParam.orderStatus" placeholder="请选择">
                    <el-option :key="item.key" :label="item.value" v-for="item in orderStatusMap"
                               :value="item.key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="订单编号" class="margin-bottom-10" prop="orderNumber">
                  <el-input v-model="queryParam.orderNumber" placeholder="请输入订单编号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="起止时间" class="margin-bottom-10">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item prop="orderDateFrom">
                        <el-date-picker type="date" placeholder="选择日期"
                                        v-model="queryParam.orderDateFrom"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="8">
                      <el-form-item prop="orderDateTo" class="margin-bottom-10">
                        <el-date-picker type="date" placeholder="选择日期"
                                        v-model="queryParam.orderDateTo"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-button type="primary" @click="queryOrderList(1)">搜索</el-button>
                      <el-button type="primary" @click="resetForm()">重置</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <h4>订单查询</h4>
      <div class="text-align-center" v-if="!!orderList&&orderList.length==0">暂无数据</div>
      <div v-if="!!orderList&&orderList.length>0">
        <div class="table-style-none padding-bottom-10">
          <el-table :data="list" class="width--100 none-data">
            <el-table-column label="礼品" width="220"></el-table-column>
            <el-table-column label="积分" width="150"></el-table-column>
            <el-table-column label="数量" width="90"></el-table-column>
            <el-table-column label="兑换详情" width="150"></el-table-column>
            <el-table-column label="操作"></el-table-column>
          </el-table>
        </div>
        <div v-for="item in orderList" :key="item.baseInfo.orderId" class="padding-top-10">
          <my-order-list :orderInfo="item" v-if="!item.subOrderList||item.subOrderList.length===0" @refresh="refreshPage"></my-order-list>
          <my-sub-order-list :orderInfo="item"
                             v-if="!!item.subOrderList&&!!item.subOrderList.length>0" @refresh="refreshPage"></my-sub-order-list>
        </div>
        <div class="text-align-center margin-top-10 margin-bottom-10">
          <el-pagination layout="prev, pager, next"
                         :currentPage="page"
                         :total="total"
                         :page-size="5"
                         @current-change="queryOrderList"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import _ from 'lodash'
  import {dateUtils} from '../../../utils'
  import myOrderList from './components/my-order-list.vue'
  import mySubOrderList from './components/my-sub-order-list.vue'
  import {mapState, mapGetters} from 'vuex'
  export default{
    mounted() {
      this.queryOrderList(1);
      this.$store.dispatch('dict_a_queryDictByName', 'orderStatusMap')
    },
    components: {
      'my-order-list': myOrderList,
      'my-sub-order-list': mySubOrderList,
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
        queryParam: {
          orderStatus: '',
          orderNumber: '',
          orderDateFrom: '',
          orderDateTo: '',
        },
        orderList: [],
        page: 1,
        total: null,
        defaultItemImage: require('../../../assets/images/image-not-found.png'),
        loading: false,
      }
    },
    methods: {
      getImageUrl (imageUri){
        return !!imageUri ? this.fileServer + imageUri : this.defaultItemImage
      },
      queryOrderList(page){
        this.loading = true;
        if (page < 1) {
          this.loading = false;
          return;
        }
        this.page = page;
        if (!!this.queryParam.orderDateFrom) {
          this.queryParam.orderDateFrom = dateUtils.getDate(this.queryParam.orderDateFrom)
        }
        if (!!this.queryParam.orderDateTo) {
          this.queryParam.orderDateTo = dateUtils.getDate(this.queryParam.orderDateTo)
        }
        let params = _.assign(this.queryParam, {
          page: this.page,
          pageSize: '5',
        });
        this.$store.dispatch('order_a_queryOrderList', {params: params}).then((response) => {
          if (response.data.resultCode == 0) {
            this.orderList = response.data.resultData.orderList || [];
            this.total = response.data.resultData.pageInfo.totalCounts;
            this.loading = false;
          } else {
            this.loading = false;
          }
        }, () => {
          this.loading = false;
        })
      },
      resetForm(){
        this.$refs.queryParam.resetFields();
        this.queryOrderList(1);
      },
      refreshPage(val){
        if (!!val) {
          this.queryOrderList(1);
        }
      },
    }
  }
</script>
<style>
</style>