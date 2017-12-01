<template>
  <div>
    <div style="width:400px;margin:0 auto;">
      <el-form :model="resetForm" label-width="120px" :rules="resetFormRules" ref="resetForm">
        <el-form-item label="新密码 :" class="margin-bottom-20" prop="newPassword">
          <el-input v-model="resetForm.newPassword" class="header-nav-login-input" placeholder="请输入新密码"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码 :" class="margin-bottom-20" prop="newPasswordAgain">
          <el-input v-model="resetForm.newPasswordAgain" class="header-nav-login-input" placeholder="请再次输入新密码"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item label="激活码 :" class="margin-bottom-20" prop="activationCode">
          <el-col :span="18">
            <el-input v-model="resetForm.activationCode" class="header-nav-login-input" placeholder="请输入激活码"
                      type="text"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="default" size="mini" @click.native="getVerifyCode" :disabled="disableSendBtn">获取激活码 {{countDownText}}</el-button>
          </el-col>
          <el-col :span="24" class="padding-top-10">
            <span class="color-gray">提示:激活码将发送到{{maskedMobile}}</span>
          </el-col>
        </el-form-item>
      </el-form>
      <div class="text-align-center padding-top-50">
        <el-button class="margin-right-20" @click="back">返回</el-button>
        <el-button type="primary" @click="submit">激活</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {cryptoUtils} from '../../utils'
  export default{
    beforeUpdate(){

    },
    data(){
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
          newPassword: '',
          newPasswordAgain: '',
          activationCode: ''
        },
        resetFormRules: {
          newPassword: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {validator: checkPassword, trigger: 'blur,change'},
          ],
          newPasswordAgain: [
            {required: true, message: '请再次输入新密码', trigger: 'blur'},
            {validator: checkPasswordAgain, trigger: 'blur,change'},
          ],
          activationCode: [
            {required: true, message: '激活码不能为空', trigger: 'blur'},
          ],
        },
        loading: false,
        disableSendBtn: false,
        countDownIndex: 0,
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
      }),
      countDownText() {
        return this.countDownIndex > 0 ? '(' + this.countDownIndex + ')' : ''
      },
      maskedMobile(){
        if (!!this.userInfo && !!this.userInfo.contactMobile) {
          return this.userInfo.contactMobile.substring(0, 3) + '****' + this.userInfo.contactMobile.substring(7)
        }
      }
    },
    methods: {
      back(){
        this.$emit('get', 1)
      },
      getVerifyCode(){
        this.$store.dispatch('user_a_sendClientVerifyCode').then((response) => {
            if (response.body.resultCode == 0) {
              this.countDownIndex = 60;
              this.disableSendBtn = true;
              this.countDown();
            }
          }
        );
      },
      submit(){
        this.$refs.resetForm.validate((valid) => {
          if (valid) {
            let encryptedPwd = cryptoUtils.AESEncrypt(this.resetForm.newPassword)
            let payload = {
              activationCode: this.resetForm.activationCode,
              newPassword: encryptedPwd
            }
            this.$store.dispatch('user_a_clientActivationSubmit', {params: payload})
              .then((response) => {
                  if (response.data.resultCode == 0) {
                    this.$store.commit('user_m_updateUserInfoData', {isActivated: 1})
                    this.$alert('激活成功', '提示', {
                      confirmButtonText: '确定',
                      callback: action => {
                        this.$router.push({name: 'home'});
                      }
                    });
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
      }
    }
  }
</script>
<style>
</style>