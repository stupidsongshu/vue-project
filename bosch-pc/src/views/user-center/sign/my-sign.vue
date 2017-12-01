<style scoped>
  .sign-button {
    width: 200px;
  }
</style>
<template>
  <div>
    <el-breadcrumb separator="/" class="big-title">
      <el-breadcrumb-item>我的签到</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="text-align-center padding-top-20">
      <div class="font-size-16">你已经连续签到<span class="color-green font-size-22">{{getContinuousCount}}</span>天</div>
      <div class="color-gray padding-top-20" v-if="!getSigned">今天还没有签到哦~</div>
      <div class="color-gray padding-top-20" v-if="getSigned">今天已经签到啦~</div>
      <el-button class="margin-top-20 sign-button" type="primary" @click="alertSign()" v-if="!getSigned">我要签到
      </el-button>
      <el-button class="margin-top-20 sign-button" type="primary" :disabled="getSigned" v-if="getSigned">我已签到
      </el-button>
    </div>
    <!--<el-row style="padding:20px 10px 10px 10px;border:1px solid #d4d4d4;border-radius:3px;margin-top:20px;">-->
    <!--<el-col>-->
    <!--<el-form :model="queryParam" label-width="70px" ref="queryParam">-->
    <!--<el-row>-->
    <!--<el-col>-->
    <!--<el-form-item label="起止时间" class="margin-bottom-10">-->
    <!--<el-row>-->
    <!--<el-col :span="8">-->
    <!--<el-form-item prop="startDate">-->
    <!--<el-date-picker type="date" placeholder="选择日期"-->
    <!--v-model="queryParam.startDate"></el-date-picker>-->
    <!--</el-form-item>-->
    <!--</el-col>-->
    <!--<el-col class="line" :span="1">-</el-col>-->
    <!--<el-col :span="8">-->
    <!--<el-form-item prop="endDate" class="margin-bottom-10">-->
    <!--<el-date-picker type="date" placeholder="选择日期" v-model="queryParam.endDate"></el-date-picker>-->
    <!--</el-form-item>-->
    <!--</el-col>-->
    <!--<el-col :span="6">-->
    <!--<el-button type="primary" @click="querySignList()">搜索</el-button>-->
    <!--<el-button type="primary" @click="resetForm()">重置</el-button>-->
    <!--</el-col>-->
    <!--</el-row>-->
    <!--</el-form-item>-->
    <!--</el-col>-->
    <!--</el-row>-->
    <!--</el-form>-->
    <!--</el-col>-->
    <!--</el-row>-->
    <el-table :data="signList" class="width--100 margin-top-20">
      <el-table-column label="签到来源" prop='signFrom'></el-table-column>
      <el-table-column label="签到积分" prop='pointValue'>
        <template scope="scope">
          {{(scope.row.pointTypeName || '') + '+' + (scope.row.pointValue || '0')}}
        </template>
      </el-table-column>
      <el-table-column label="签到日期">
        <template scope="scope">
          {{scope.row.signDate | getDateTime}}
        </template>
      </el-table-column>
    </el-table>
    <div class="padding-bottom-10 padding-top-50 text-align-center">
      <img src="../../../assets/images/sign_info.jpg" style="width:100%;"/>
    </div>
  </div>
</template>
<script>
  import {dateUtils} from '../../../utils'
  import {mapGetters} from 'vuex'
  export default{
    mounted() {
      this.querySignList();
    },
    data(){
      return {
        signList: [],
        queryParam: {
          startDate: '',
          endDate: '',
        },
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
      }),
      getSigned(){
        if (!!this.userInfo) {
          return !!this.userInfo.isSigned && this.userInfo.isSigned === 1 ? true : false;
        }
      },
      getContinuousCount(){
        if (this.signList.length === 0) {
          return 0;
        } else if (this.signList.length > 0) {
          return this.signList[0].continuousCount;
        }
      }
    },
    methods: {
      querySignList(){
        if (!!this.queryParam.startDate) {
          this.queryParam.startDate = dateUtils.getDate(this.queryParam.startDate)
        }
        if (!!this.queryParam.endDate) {
          this.queryParam.endDate = dateUtils.getDate(this.queryParam.endDate)
        }
        this.$store.dispatch('user_a_queryClientSignList', {params: this.queryParam}).then((response) => {
          if (response.data.resultCode == 0) {
            this.signList = response.data.resultData.signList || [];
          }
        })
      },
      alertSign(){
        this.$store.dispatch('user_a_getClientSign', {params: {signFrom: 'web'}}).then((response) => {
          if (response.data.resultCode == 0) {
            let title = '恭喜您,今日签到成功!' + (response.data.resultData.pointTypeName || '') + '+' + (response.data.resultData.pointValue || '0');
            this.$alert(title, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$store.commit('user_m_updateUserInfoData', {isSigned: 1});
                this.querySignList();
              }
            });
          }
        })
      },
      resetForm(){
        this.$refs.queryParam.resetFields();
        this.querySignList();
      },
    }
  }
</script>
<style>
</style>