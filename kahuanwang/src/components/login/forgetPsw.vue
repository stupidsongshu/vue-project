<template>
  <div class="forgetPsw">
    <mt-header fixed class="header" title="忘记密码">
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
        <label class="icon icon-msg"></label>
        <input type="text" placeholder="请输入短信验证码">
        <label class="form-item-right code" @click="getCode">发送验证码</label>
      </div>
      <div class="reset-psw-title">请重新设置密码</div>
      <div class="form-item">
        <label class="icon icon-password"></label>
        <input type="password" placeholder="请设置密码" ref="psw">
        <label class="icon-password-show" v-show="showPassword" @click="toggle"></label>
        <label class="icon-password-hide" v-show="!showPassword" @click="toggle"></label>
      </div>

      <div class="loan-btn form-btn">
        <mt-button class="btn" @click="resetPsw">提交</mt-button>
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
      resetPsw() {}
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'
  @import '../../assets/css/form.styl'
</style>
