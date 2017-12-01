<template>
  <div>
    <v-header></v-header>
    <header-nav :showLoginImg="showLoginImg"></header-nav>
    <div class="v-width padding-bottom-40">
      <div>
        <el-breadcrumb separator="/" class="padding-bottom-5 margin-bottom-20 big-title">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>忘记密码</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="margin-auto" style="width:400px;">
          <el-form :model="resetForm" label-width="120px" :rules="resetFormRules" ref="resetForm">
            <el-form-item label="登陆账号 :" class="margin-bottom-20" prop="loginAccount">
              <el-input v-model="resetForm.loginAccount" class="header-nav-login-input" placeholder="请输入登陆账号"
                        type="text"></el-input>
            </el-form-item>
            <el-form-item label="促销负责人手机 :" class="margin-bottom-20" prop="mobileNo">
              <el-input v-model="resetForm.mobileNo" class="header-nav-login-input" placeholder="请输入促销负责人手机"
                        type="text"></el-input>
            </el-form-item>
            <el-form-item label="验证码 :" class="margin-bottom-20" prop="loginAccount">
              <el-col :span="18">
                <el-input v-model="resetForm.verifyCode" class="header-nav-login-input" placeholder="请输入验证码"
                          type="text"></el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="default" size="mini" @click.native="getVerifyCode" :disabled="disableSendBtn">获取验证码 {{countDownText}}</el-button>
              </el-col>
            </el-form-item>
            <el-form-item label="新密码 :" class="margin-bottom-20" prop="newPassword">
              <el-input v-model="resetForm.newPassword" class="header-nav-login-input" placeholder="请输入新密码"
                        type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码 :" class="margin-bottom-20" prop="confirmPassword">
              <el-input v-model="resetForm.confirmPassword" class="header-nav-login-input" placeholder="请确认密码"
                        type="password"></el-input>
            </el-form-item>
            <div class="text-align-center">
              <el-button class="header-nav-login-button" type="primary" :loading="loading" @click="resetPassword">重置密码</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
    <v-suspension></v-suspension>
  </div>
</template>
<style>
</style>
<script type="text/ecmascript-6">
  import vHeader from '../components/header.vue'
  import headerNav from '../components/header-nav.vue'
  import login from '../components/login.vue'
  import vFooter from '../components/footer.vue'
  import vSuspension from '../components/suspension.vue'
  import _ from 'lodash'
  import {cryptoUtils} from '../../utils'
  import validators from '../../common/validators.js'
  export default{
    components: {
      'v-header': vHeader,
      'header-nav': headerNav,
      'v-footer': vFooter,
      'v-suspension': vSuspension,
    },
    mounted() {

    },
    data () {
      var checkPassword = (rule, value, callback) => {
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        if (!reg.test(value)) {
          callback(new Error('密码必须由6-20位数字加字母组成'));
        } else {
          callback();
        }
      };
      //检查再次密码是否一致
      var checkPasswordAgain = (rule, value, callback) => {
        if (value !== this.resetForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        resetForm: {
          loginAccount: '',
          verifyCode: '',
          mobileNo: '',
          newPassword: '',
          confirmPassword: ''
        },
        resetFormRules: {
          loginAccount: [
            {required: true, message: '登陆账号不能为空', trigger: 'blur'},
          ],
          mobileNo: [
            {required: true, message: '促销负责人手机不能为空', trigger: 'blur'},
            {validator: validators.checkMobile, trigger: 'change,blur'}
          ],
          verifyCode: [
            {required: true, message: '验证码不能为空', trigger: 'blur'},
          ],
          newPassword: [
            {required: true, message: '新密码不能为空', trigger: 'blur'},
            {validator: checkPassword, trigger: 'blur,change'},
          ],
          confirmPassword: [
            {required: true, message: '确认密码不能为空', trigger: 'blur'},
            {validator: checkPasswordAgain, trigger: 'blur,change'},
          ],
        },
        showLoginImg: false,
        loading: false,
        disableSendBtn: false,
        countDownIndex: 0

      }
    },
    computed: {
      countDownText() {
        return this.countDownIndex > 0 ? '(' + this.countDownIndex + ')' : ''
      }
    },
    methods: {
      getVerifyCode(){
        if (!this.resetForm.mobileNo) {
          this.$message.error('促销负责人手机不能为空')
          return
        }
        this.$store.dispatch('user_a_sendResetPasswordVerifyCode', {params: {mobileNo: this.resetForm.mobileNo}})
          .then((response) => {
              if (response.body.resultCode == 0) {
                this.countDownIndex = 60
                this.disableSendBtn = true
                this.countDown()
              }
            }
          );
      },
      resetPassword(){
        this.$refs.resetForm.validate((valid) => {
          if (valid) {
            let encryptedPwd = cryptoUtils.AESEncrypt(this.resetForm.newPassword)
            let payload = _.assign(this.resetForm, {password: encryptedPwd})
            this.$store.dispatch('user_a_forgotPassword', {params:payload})
              .then((response) => {
                  if (response.data.resultCode == 0) {
                    this.$message.success('密码重置成功，请返回登录')
                  } else if (response.data.resultCode == '50002') {
                    this.$message.error(response.data.resultMsg)
                  }
                }
              );
          } else {
            return false;
          }
        });
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
    }
  }
</script>
