<template>
  <div class="login">
    <mt-header fixed class="header" title="登录">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="form">
      <div class="login-type">
        <button class="border-1px" @click="selectLoginType(1)" :class="{active: loginIndex == 1}">密码登录</button>
        <button class="border-1px" @click="selectLoginType(2)" :class="{active: loginIndex == 2}">验证码登录</button>
      </div>

      <div v-if="loginIndex == 1">
        <div class="form-item">
          <label class="icon icon-phone"></label>
          <input class="border-1px" type="number" placeholder="请输入手机号">
        </div>
        <div class="form-item">
          <label class="icon icon-password"></label>
          <input type="password" placeholder="请输入密码">
          <router-link class="form-item-right" to="/forgetPsw">忘记密码？</router-link>
        </div>
        <div class="loan-btn">
          <mt-button class="btn" @click="loginPsw">登录</mt-button>
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
        <div class="loan-btn">
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
  export default {
    data() {
      return {
        loginIndex: 1
      }
    },
    methods: {
      selectLoginType(index) {
        this.loginIndex = index
      },
      getCode() {},
      loginPsw() {},
      loginCode() {}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'

  .form
    padding-top: 26px
    .login-type
      margin-bottom: 37px
      font-size: 0
      text-align: center
      button
        width: 120px
        height: 40px
        font-size: 14px
        outline: none
        color: main-color
        border: 1px solid main-color
        background-color: #fff
        &.active
          color: #fff
          background-color: main-color
        &:first-child
          border-right-color: transparent
          border-top-left-radius: 6px
          border-bottom-left-radius: 6px
        &:last-child
          border-left-color: transparent
          border-top-right-radius: 6px
          border-bottom-right-radius: 6px

    .form-item
      position: relative
      height: 54px
      border-bottom: 1px solid #d9d9d9
      background-color: #fff
      &:last-child
        margin-bottom: 0
      input
        width: 100%
        height: 100%
        padding-left: 60px
        color: #999
        font-size: 14px
        outline: none
        border: none
        /*border-1px(rgb(255,0,0))*/
      .icon
        position: absolute
        top: 50%
        left: 31px
        width: 24px
        height: 24px
        transform: translateY(-50%)
        background-size: 24px 24px
      .icon-phone
        background-image: url("../../assets/img/icon_phone.png")
      .icon-password
        background-image: url("../../assets/img/icon_password.png")
      .icon-msg
        background-image: url("../../assets/img/icon_msg.png")
      .form-item-right
        position: absolute
        top: 50%
        right: 0
        transform: translateY(-50%)
        padding: 0 18px
        text-align: center
        color: main-color
        font-size: 15px
      .code
        height: 36px
        line-height: 36px
        border-left: 1px solid main-color

    .loan-btn
      margin: 56px 0 29px 0
    .hint
      text-align: center
      color: #999
      font-size: 15px
      a
        color: main-color
</style>
