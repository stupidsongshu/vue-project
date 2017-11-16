<template>
  <div class="register">
    <mt-header fixed class="header" title="注册">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="form">
      <div class="form-item">
        <label class="icon icon-phone"></label>
        <input type="number" placeholder="请输入手机号">
      </div>
      <div class="form-item">
        <label class="icon icon-password"></label>
        <input type="password" placeholder="密码为6-12位数字和字母组合" ref="psw">
        <label class="icon-password-show" v-show="showPassword" @click="toggle"></label>
        <label class="icon-password-hide" v-show="!showPassword" @click="toggle"></label>
      </div>
      <div class="form-item">
        <label class="icon icon-msg"></label>
        <input type="text" placeholder="请输入短信验证码">
        <label class="form-item-right code" @click="getCode">发送验证码</label>
      </div>

      <div class="loan-btn form-btn">
        <mt-button class="btn" @click="register">注册</mt-button>
      </div>

      <div class="hint">
        已有账号？<router-link to="/login">登录</router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        showPassword: false
      }
    },
    methods: {
      toggle() {
        this.showPassword = !this.showPassword
        if (this.showPassword) {
          this.$refs.psw.type = 'text'
        } else {
          this.$refs.psw.type = 'password'
        }
      },
      getCode() {},
      register() {}
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'
  @import '../../assets/css/form.styl'
</style>
