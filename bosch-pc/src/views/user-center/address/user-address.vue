<template>
  <div>
    <el-breadcrumb separator="/" class="big-title">
      <el-breadcrumb-item>收货地址</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="padding-top-20" v-loading="loading">
      <el-row>
        <el-col :span="24">
          <el-table :data="addressList" border>
            <el-table-column prop="contactPerson" label="联系人" show-overflow-tooltip width="90"></el-table-column>
            <el-table-column label="所在地" show-overflow-tooltip width="110">
              <template scope="scope">
                {{(scope.row.provinceName || '') + (scope.row.cityName || '') + (scope.row.countyName || '')}}
              </template>
            </el-table-column>
            <el-table-column prop="detailAddress" label="详细地址" show-overflow-tooltip width="120"></el-table-column>
            <el-table-column prop="contactMobile" label="联系电话" show-overflow-tooltip width="120"></el-table-column>
            <el-table-column label="是否默认" width="100">
              <template scope="scope">
                <el-tag type="success" v-if="!!scope.row.isDefault">默认地址</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button type="text" size="small" @click="showDialog(scope.row)">修改</el-button>
                <el-button type="text" size="small" @click="showRemoveAddress(scope.row)">删除</el-button>
                <!--<el-tag type="success" v-if="!!scope.row.isDefault">默认地址</el-tag>-->
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div class="text-align-center padding-top-20">
        <el-button type="primary" @click="showDialog()">新建地址</el-button>
      </div>
    </div>
    <el-dialog title="删除地址" :visible.sync="showRemoveAddressDialog" :show-close="false" :close-on-press-escape="false"
               :close-on-click-modal="false" size="tiny">
      <el-form :model="addressForm" label-width="70px" ref="addressForm" :rules="addressRuls">
        <el-form-item label="验证码 :" class="margin-bottom-20" prop="verifyCode">
          <el-col :span="5" class="padding-right-10">
            <el-input v-model="addressForm.verifyCode" placeholder="验证码"
                      type="text"></el-input>
          </el-col>
          <el-col :span="19">
            <el-button type="default" size="mini" @click.native="getVerifyCode" :disabled="disableSendBtn">获取验证码 {{countDownText}}</el-button>
            <span class="color-gray padding-left-10">提示:验证码将发送到{{maskedMobile}}</span>
          </el-col>
        </el-form-item>
      </el-form>
      <div class="text-align-center">
        <el-button type="default" @click.native="cancelRemoveAddressDialog" class="margin-right-20">取 消</el-button>
        <el-button type="primary" @click.native="removeAddress">确 定</el-button>
      </div>
    </el-dialog>
    <user-address-dialog ref="user-address-dialog" @refresh="refreshPage"></user-address-dialog>
  </div>
</template>
<script>
  import {mapGetters, mapState} from 'vuex'
  import userAddressDialog from './components/user-address-dialog.vue'
  export default{
    components: {
      'user-address-dialog': userAddressDialog,
    },
    mounted() {
      this.queryaddressData();
    },
    data(){
      return {
        //表单验证规则
        addressRuls: {
          verifyCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ],
        },
        addressForm: {
          addressId: '',
          verifyCode: '',
        },
        addressList: [],
        showRemoveAddressDialog: false,
        disableSendBtn: false,
        countDownIndex: 0,
        loading: false,
        addressId: '',
      }
    },
    methods: {
      //获取表单数据
      queryaddressData(){
        this.loading = true;
        this.$store.dispatch('user_a_getClientAddressList').then((response) => {
          if (response.data.resultCode == 0) {
            this.addressList = response.data.resultData.addressList;
            this.loading = false;
          } else {
            this.loading = false;
          }
        }, () => {
          this.loading = false;
        })
      },
      refreshPage(val){
        if (!!val) {
          this.queryaddressData();
        }
      },
      //显示删除数据
      showRemoveAddress(row){
        this.addressId = row.addressId;
        this.addressForm.verifyCode = '';
        this.showRemoveAddressDialog = true;
      },
      removeAddress(address){
        let params = {
          addressId: this.addressId,
          verifyCode: this.addressForm.verifyCode,
        }
        this.$store.dispatch('user_a_removeClientAddress', {params: params})
          .then((response) => {
            if (response.data.resultCode == '0') {
              this.$message.success({message: '删除成功', showClose: true});
              this.addressId = '';
              this.showRemoveAddressDialog = false;
              this.queryaddressData();
            }
          }, (response) => {
            this.$message.error("删除失败");
          })
      },
      //显示弹窗
      showDialog(row){
        if (!!row) {
          this.$refs['user-address-dialog'].showUserAddressDialog(row);
        } else {
          if (this.addressList.length >= 3) {
            this.$message.error('抱歉,最多只能新建三条地址~')
          } else {
            this.$refs['user-address-dialog'].showUserAddressDialog();
          }
        }
        this.showAddressDialog = true;
      },
      //取消表单
      cancelRemoveAddressDialog(){
        this.$refs.addressForm.resetFields();
        this.addressForm.verifyCode = '';
        this.showRemoveAddressDialog = false;
      },
      getVerifyCode(){
        this.$store.dispatch('user_a_getClientAddressVerifyCode').then((response) => {
            if (response.body.resultCode == 0) {
              this.countDownIndex = 60;
              this.disableSendBtn = true;
              this.countDown();
            }
          }
        );
      },
      countDown () {
        this.countDownIndex = 60
        let _vm = this
        let timer = setInterval(() => {
          _vm.countDownIndex--
          if (_vm.countDownIndex === 0) {
            _vm.disableSendBtn = false
            clearInterval(timer)
          }
        }, 1000)
      },
    },
    computed: {
      ...mapState({}),
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
      }),
      countDownText() {
        return this.countDownIndex > 0 ? '(' + this.countDownIndex + ')' : ''
      },
      maskedMobile(){
        if (!!this.userInfo.contactMobile) {
          return this.userInfo.contactMobile.substring(0, 3) + '****' + this.userInfo.contactMobile.substring(7)
        }
      }
    }
  }
</script>
<style>
</style>
