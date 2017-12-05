<template>
  <div id="app" :class="{'has-footer': footer}">
    <!--<mt-header class="header" title="卡还王">
      <router-link to="/identity" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link class="icon-news" to="/newsCenter" slot="right"></router-link>
    </mt-header>-->

    <transition :name="transitionName" mode="out-in">
      <router-view class="child-view" v-on:checkApplyStatus="applyStatus"></router-view>
    </transition>
    <tab-bar :hasFooter="footer"></tab-bar>
  </div>
</template>

<script>
  // import { MessageBox } from 'mint-ui'
  import { Toast } from 'mint-ui'
  import tabBar from './components/common/tabbar.vue'

  export default {
    name: 'app',
    data() {
      return {
        transitionName: 'slide-left'
      }
    },
    components: {
      'tab-bar': tabBar
    },
    computed: {
      footer() {
        return this.$store.state.common.hasFooter
      }
    },
    // dynamically set transition based on route change
    watch: {
      '$route'(to, from) {
        let toPath = to.path
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        // console.log(this.transitionName)
        // 有个bug,刷新页面后watch $route不会执行
        /* if (to.meta.headerTitle !== undefined) {
          this.headerTitle = to.meta.headerTitle
        } */
        let loginInfo = JSON.parse(this.app.isLogin())
        console.log(loginInfo)
        /**
         * 需登录的路由配置
         */
        let filterPaths = ['/', '/login', '/register', '/forgetPsw', '/my', '/aboutUs', '/help', '/setting']
        let bool = filterPaths.some((path) => {
          return toPath === path
        })
        if (loginInfo.Step === 0 && loginInfo.Result !== 0) {
          if (!bool) {
            // MessageBox({
            //   title: '',
            //   message: '点击登录',
            //   showCancelButton: true
            // }).then(action => {
            //   if (action === 'confirm') {
            //     this.$router.push('/login')
            //   } else if (action === 'cancel') {
            //   }
            // })
            Toast({
              message: '请先登录',
              duration: 2000
            })
            this.$router.push('/login')
          }
        }
      }
    },
    methods: {
      applyStatus() {
        let that = this
        let loginInfo = JSON.parse(this.app.isLogin())
        if (loginInfo.Step === 0 && loginInfo.Result !== 0) { // 未登录
          this.$router.push('/login')
        } else if (loginInfo.Step === 0 && loginInfo.Result === 0) { // 已登录
          this.loading()

          // 用户申请状态
          this.app.AppStatus()
          this.app.AppStatusCallBack = function(json) {
            that.closeLoading()
            json = JSON.parse(json)
            console.log(json)
            /* eslint-disable no-unused-vars */
            var sign, msg
            let requires = JSON.parse(json.Msg)
            /**
             * Result
             * 0  缺少信息
             [
             {822,"身份证信息"},
             {823,"身份证正面照片"},
             {824,"身份证反面照片"},
             {825,"活体照片"},
             {826,"签约视频"},
             {827,"信用卡"},
             {828,"联系人信息"},
             {829,"基本信息"},
             {830,"银行卡信息"},
             ]
             * 100  申请开户
             * 101  正在审核
             * 102  审核通过
             * 109  审核拒绝
             * 121  调查问卷
             */
            if (json.Step === 35 && json.Result === 0) {
              if (requires.length === 0) {
                that.$router.push('/personalCertificate/agreeAuth')
              } else if (requires.length > 0) {
                for (let [k, v] of Object.entries(requires[0])) {
                  sign = k
                  msg = v
                }
                console.log(sign, msg)
                Toast({
                  message: '请提交' + msg,
                  duration: 3000
                })
                switch (sign) {
                  case '822':
                    // 身份证信息
                    that.$router.push('/personalCertificate')
                    break
                  case '823':
                    // 身份证正面照片
                    that.$router.push('/personalCertificate')
                    break
                  case '824':
                    // 身份证反面照片
                    that.$router.push('/personalCertificate')
                    break
                  case '825':
                    // 活体照片
                    that.$router.push('/personalCertificate/faceRecognition')
                    break
                  case '826':
                    // 签约视频
                    that.$router.push('/personalCertificate/videoAuth')
                    break
                  case '827':
                    // 信用卡
                    break
                  case '828':
                    // 联系人信息
                    that.$router.push('/personalCertificate/linkman')
                    break
                  case '829':
                    // 基本信息
                    that.$router.push('/personalCertificate/baseInfo')
                    break
                  case '830':
                    // 银行卡信息
                    that.$router.push('/personalCertificate/bankCardInfo')
                    break
                }
              }
            } else if (json.Step === 35 && json.Result === 100) {
              // 申请开户
            } else if (json.Step === 35 && json.Result === 101) {
              // 正在审核
            } else if (json.Step === 35 && json.Result === 102) {
              // 审核通过
            } else if (json.Step === 35 && json.Result === 109) {
              // 审核拒绝
            } else if (json.Step === 35 && json.Result === 121) {
              // 调查问卷
            }
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
  #app
    /*width: 10rem*/
    /*max-width: 600px*/
    min-height: 100%
    margin: 0 auto
    padding-top: 45px
  .has-footer
    padding-bottom: 56px
</style>
