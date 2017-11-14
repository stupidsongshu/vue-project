<template>
  <div>
    <mt-header class="header" title="登录">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="form">
      <div class="login-type">
        <button @click="selectLoginType(1)" :class="{active: loginIndex == 1}">密码登录</button>
        <button @click="selectLoginType(2)" :class="{active: loginIndex == 2}">验证码登录</button>
      </div>

      <div v-if="loginIndex == 1">
        <div class="form-item">
          <label class="icon icon-phone"></label>
          <input type="number" placeholder="请输入手机号">
        </div>
        <div class="form-item">
          <label class="icon icon-password"></label>
          <input type="password" placeholder="请输入密码" ref="psw">
          <label class="form-item-right" @click="forgetPassword">忘记密码</label>
        </div>
      </div>
      <div v-if="loginIndex == 2">
        <div class="form-item">
          <label class="icon icon-phone"></label>
          <input type="number" placeholder="请输入手机号">
        </div>
        <div class="form-item">
          <label class="icon icon-msg"></label>
          <input type="text" placeholder="请输入验证码">
          <label class="form-item-right" @click="getCode">获取验证码</label>
        </div>
      </div>
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
      forgetPassword() {},
      getCode() {}
    }
  }
</script>

<style lang="scss">
  @import '../assets/sass/base.sass';

  .form {
    padding: 26px 15px 0 15px;
    .login-type{
      margin-bottom: 37px;
      font-size: 0;
      text-align: center;
      button {
        width: 120px;
        height: 40px;
        color: $main-color;
        background-color: #fff;
        outline: none;
        border: 1px solid $main-color;
        font-size: 14px;
        &.active {
          color: #fff;
          background-color: $main-color;
        }
        &:first-child {
          border-right-color: transparent;
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
        }
        &:last-child {
          border-left-color: transparent;
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
        }
      }
    }

    .form-item {
      position: relative;
      margin-bottom: 15px;
      &:last-child {
        margin-bottom: 0;
      }
      input {
        width: 100%;
        height: 51px;
        padding-left: 50px;
        border: 1px solid #f5a393;
        border-radius: 6px;
        color: #999;
        font-size: 17px;
        outline: none;
      }
      .icon {
        position: absolute;
        top: 50%;
        left: 16px;
        transform: translateY(-50%);
      }
      .icon-phone {
        width: 13px;
        height: 25px;
        background-size: 13px 25px;
        background-image: url("../assets/img/icon_phone@2x.png");
      }
      .icon-password {
        width: 17px;
        height: 25px;
        background-size: 17px 25px;
        background-image: url("../assets/img/icon_password@2x.png");
      }
      .icon-msg {
        width: 22px;
        height: 15px;
        background-size: 22px 15px;
        background-image: url("../assets/img/icon_msg@2x.png");
      }
      .form-item-right {
        position: absolute;
        top: 50%;
        right: 18px;
        transform: translateY(-50%);
        width: 80px;
        text-align: center;
        color: $main-color;
        font-size: 15px;
      }
    }
  }
</style>
