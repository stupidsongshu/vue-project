<template>
  <div class="login">
    <mt-header fixed class="header" title="登录">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="form">
      <div class="login-type">
        <button class="border-1px" @click="selectLoginType(1)" :class="{active: loginIndex == 1}">密码登录</button>
        <button class="border-1px" @click="selectLoginType(2)" :class="{active: loginIndex == 2}">验证码登录</button>
      </div>

      <div v-if="loginIndex == 1">
        <div class="form-item">
          <label class="icon icon-phone"></label>
          <input class="border-1px" type="number" placeholder="请输入手机号" v-model="mobileno">
        </div>
        <div class="form-item">
          <label class="icon icon-password"></label>
          <input type="password" placeholder="请输入密码" v-model="pwd">
          <router-link class="form-item-right" to="/forgetPsw">忘记密码？</router-link>
        </div>
        <div class="loan-btn form-btn">
          <mt-button class="btn" @click="loginPwd">登录</mt-button>
        </div>
      </div>

      <div v-if="loginIndex == 2">
        <div class="form-item">
          <label class="icon icon-phone"></label>
          <input type="number" placeholder="请输入手机号">
        </div>
        <div class="form-item">
          <label class="icon icon-msg"></label>
          <input type="text" placeholder="请输入短信验证码">
          <label class="form-item-right code" @click="getCode">发送验证码</label>
        </div>
        <div class="loan-btn form-btn">
          <mt-button class="btn" @click="loginCode">登录</mt-button>
        </div>
      </div>

      <div class="hint">
        没有账号？<router-link to="/register">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        loginIndex: 1,
        mobileno: '',
        pwd: ''
      }
    },
    methods: {
      back() {
        this.goback()
      },
      selectLoginType(index) {
        this.loginIndex = index
      },
      getCode() {},
      loginPwd() {
        let that = this
        this.app.login(this.mobileno, this.pwd)
        this.app.loginCallBack = function(json) {
          json = JSON.parse(json)
          console.log(json)
          Toast({
            message: json.Msg,
            duration: 3000
          })
          if (json.Result === 0) {
            that.$router.push('/identity')
          }
        }
      },
      loginCode() {
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'
  @import '../../assets/css/form.styl'
</style>
