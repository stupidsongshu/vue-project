<template>
  <div style="width: 280px;height: 170px;" @keyup.enter="login">
    <el-form :model="loginForm" label-width="60px">
      <el-form-item label="用户名 :" class="margin-bottom-10">
        <el-input v-model="loginForm.loginAccount" class="header-nav-login-input" placeholder="请输入账号"
                  type="text"></el-input>
      </el-form-item>
      <el-form-item label="密码 :" class="margin-bottom-10">
        <el-input v-model="loginForm.password" class="header-nav-login-input" placeholder="请输入密码"
                  type="password"></el-input>
      </el-form-item>
      <div class="text-align-right">
        <span class="margin-bottom-10 color-green pointer margin-right-10 hover-underline" @click="goToWeb('register')">注册</span>
        <span class="margin-bottom-10 color-green pointer margin-right-20 hover-underline"
              @click="goToWeb('forgot-password')">忘记密码?</span>
      </div>
      <div class="text-align-center">
        <el-button class="header-nav-login-button" type="primary" :loading="loading" @click="login">登录</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  import {cryptoUtils} from '../../utils'
  export default{
    data(){
      return {
        loginForm: {
          loginAccount: '',
          password: '',
          code: ''
        },
        loading: false,
        path: '',
      }
    },
    mounted() {
      this.path = this.$route.query.path
    },
    watch: {
      '$route' (to, from) {
        console.log('after login')
      }
    },
    methods: {
      goToWeb(name){
        this.$router.push({name: name});
      },
      login(){
        this.loading = true;
        if (this.loginForm.loginAccount == '' || this.loginForm.password == '') {
          this.$message.error({message: '账号或密码不能为空', showClose: true});
          this.loading = false;
          return false;
        }
        let encryptedPwd = cryptoUtils.AESEncrypt(this.loginForm.password)
        let payload = {
          loginAccount: this.loginForm.loginAccount,
          password: encryptedPwd
        }
        this.$store.dispatch('user_a_login', {params: payload}).then((response) => {
          if (response.data.resultCode == 0) {
            this.loading = false;
            this.$message.success({message: '登录成功！', showClose: true});
            if (response.data.resultData.clientInfo.isActivated === 0) {
              this.$router.push({name: 'activation'});
            } else {
              if (!!this.path) {
                this.$router.push({path: this.path});
              } else {
                this.$router.push({name: 'home'});
              }
              this.alertActivityLoginGift(response.data.resultData.activityMessage);
            }
          } else {
            this.loading = false;
          }
        }, () => {
          this.loading = false;
        })
      },
      alertActivityLoginGift(activityMessage){
        let vm = this;
        setTimeout(function () {
          vm.$nextTick(function () {
            if(!!activityMessage){
              this.$alert(activityMessage, '首登有礼', {
                confirmButtonText: '确定',
                callback: action => {
                  console.log(activityMessage)
                }
              });
            }
          })
        }, 1000)
      }
    }
  }
</script>
<style>
</style>
