<template>
  <div>
    <mt-header class="header" title="注册">
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
        <input type="password" placeholder="请设置密码" ref="psw">
        <label class="icon-password-show" v-show="showPassword" @click="toggle"></label>
        <label class="icon-password-hide" v-show="!showPassword" @click="toggle"></label>
      </div>
      <div class="form-item">
        <label class="icon icon-msg"></label>
        <input type="text" placeholder="请输入验证码">
        <label class="form-item-right" @click="getCode">获取验证码</label>
      </div>

      <mt-button class="register-btn">注册</mt-button>
    </div>

    <div class="login">
      已有账号？<router-link to="/login">登录</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        showPassword: true
      }
    },
    methods: {
      toggle() {
        this.showPassword = !this.showPassword
        if (this.showPassword) {
          this.$refs.psw.type = 'password'
        } else {
          this.$refs.psw.type = 'text'
        }
      },
      getCode() {
        console.log(1)
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/sass/base.sass';

  .form {
    width: 100%;
    padding: 34px 15px 0 15px;
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
      .icon-password-show {
        position: absolute;
        top: 50%;
        right: 40px;
        transform: translateY(-50%);
        width: 32px;
        height: 18px;
        background: url("../assets/img/icon_password_show@2x.png") no-repeat;
        background-size: 32px 18px;
      }
      .icon-password-hide {
        position: absolute;
        top: 50%;
        right: 40px;
        transform: translateY(-50%);
        width: 32px;
        height: 18px;
        background: url("../assets/img/icon_password_hide@2x.png") no-repeat;
        background-size: 32px 18px;
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

    .register-btn {
      width: 100%;
      height: 48px;
      color: #fff;
      font-size: 18px;
      border-radius: 6px;
      background-color: $main-color;
    }
  }
  .login {
    margin-top: 25px;
    text-align: center;
    color: #666;
    font-size: 17px;
    a {
      color: $main-color;
      font-weight: 700;
    }
  }
</style>
