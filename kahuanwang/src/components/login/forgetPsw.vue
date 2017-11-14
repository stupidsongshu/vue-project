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

      <div class="loan-btn">
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

  .forgetPsw
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
      .icon-password-show {
        position: absolute;
        top: 50%;
        right: 40px;
        transform: translateY(-50%);
        width: 24px;
        height: 24px;
        background: url("../../assets/img/icon_password_show.png") no-repeat;
        background-size: 24px 24px;
      }
      .icon-password-hide {
        position: absolute;
        top: 50%;
        right: 40px;
        transform: translateY(-50%);
        width: 24px;
        height: 24px;
        background: url("../../assets/img/icon_password_hide.png") no-repeat;
        background-size: 24px 24px;
      }

    .reset-psw-title
      padding: 15px
      color: main-color
      font-size: 14px

    .loan-btn
      margin: 56px 0 29px 0
</style>
