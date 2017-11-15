<template>
  <div>
    <mt-header fixed class="header" title="安全设置">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="form">
      <router-link class="form-item" to="/modifyLoginPsw">
        <label class="icon icon-password"></label>
        <input type="text" placeholder="修改登录密码" readonly>
        <i class="fa fa-angle-right arrow"></i>
      </router-link>
      <router-link class="form-item" to="/modifyPhone">
        <label class="icon icon-phone"></label>
        <input type="text" placeholder="修改手机号" readonly>
        <i class="fa fa-angle-right arrow"></i>
      </router-link>
      <div class="loan-btn">
        <mt-button class="btn" @click="loginOUt">退出登录</mt-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      loginOUt() {}
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
      display: block
      height: 54px
      border-bottom: 1px solid #d9d9d9
      background-color: #fff
      &:last-child
        margin-bottom: 0
      input
        width: 100%
        height: 100%
        padding-left: 68px
        color: #666
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
      .arrow
        position: absolute
        top: 50%
        right: 15px
        transform: translateY(-50%)
        color: #999
        font-size: 30px

    .loan-btn
      margin: 56px 0 29px 0
    .hint
      text-align: center
      color: #999
      font-size: 15px
      a
        color: main-color
</style>
