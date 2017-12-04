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
      <div class="loan-btn form-btn">
        <mt-button class="btn" @click="loginOUt">退出登录</mt-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      loginOUt() {
        this.app.logon()
        console.log(this.app.isLogin())
        // this.$store.commit('loginInfoSave', {
        //   isLogin: false,
        //   mobile: ''
        // })
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'
  @import '../../assets/css/form.styl'
</style>
