<template>
  <div>
    <!--<mt-header fixed class="header" title="个人认证">
      <router-link slot="left" to="/">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>-->

    <!--<pc-nav-header :curProgress="1"></pc-nav-header>-->

    <!--<div class="identity-nav">
      <div class="identity-slide">
        <span class="active">身份信息</span>
      </div>
      <div class="identity-slide">
        <span>银行卡信息</span>
      </div>
      <div class="identity-slide">
        <span>基本信息</span>
      </div>
    </div>-->

    <transition name="slide">
      <div class="id-card" ref="idCard">
        <h1 class="title">拍摄身份证</h1>
        <ul class="shot-wrapper">
          <li class="shot-item" @click="showExampleL">
            <div>
              <img v-show="!idcardFrontShotStatus" src="../../../assets/img/shot_face.png" alt="">
              <img v-show="idcardFrontShotStatus" :src="idcardFrontImg" alt="">
            </div>
            <span class="explain">身份证正面</span>
          </li>
          <li class="shot-item" @click="showExampleR">
            <div>
              <img v-show="!idcardBackShotStatus" src="../../../assets/img/shot_back.png" alt="">
              <img v-show="idcardBackShotStatus" :src="idcardBackImg" alt="">
            </div>
            <span class="explain">身份证反面</span>
          </li>
        </ul>
      </div>
    </transition>

    <div class="input-item-hint">
      <div class="caution-wrapper">
        <span class="icon-caution"></span><span>请确保身份证和登录手机号码实名认证一致</span>
      </div>
      <!--<div class="arrow-wrapper">
        <router-link to="/modifyPhone" class="main-color">修改手机号</router-link>
        <span class="fa fa-angle-right arrow-right"></span>
      </div>-->
    </div>

    <div class="input-item">
      <div class="input-item-l">
        <span class="name">姓名</span>
        <input class="input" type="text" placeholder="真实姓名" v-model="idcardFrontName" v-on:focus="focus($event)" v-on:blur="blur">
      </div>
      <div class="input-item-r" v-if="idcardFrontIdentifyStatus">
        <i class="icon-shoot-success"></i>
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-l">
        <span class="name">身份证号</span>
        <input class="input" type="text" placeholder="身份证号码" v-model="idcardFrontId" v-on:focus="focus($event)" v-on:blur="blur">
      </div>
      <div class="input-item-r" v-if="idcardFrontIdentifyStatus">
        <i class="icon-shoot-success"></i>
      </div>
    </div>

    <router-link class="input-item" to="/personalCertificate/faceRecognition" replace style="margin-top: 17px;">
      <div class="input-item-l">
        <span class="name">活体识别</span>
        <input class="input" type="text" placeholder="前往拍摄" readonly>
      </div>
      <div class="input-item-r">
        <i class="fa fa-angle-right" v-if="faceRecognitionStep !== 1"></i>
        <i class="icon-shoot-success" v-if="faceRecognitionStep === 1"></i>
      </div>
    </router-link>

    <div class="loan-btn" style="margin-top: 42px;">
      <!--<mt-button class="btn" @click="submit" :disabled="!applyQualificationAuthStatus">提交</mt-button>-->
      <mt-button class="btn" @click="submit">提交</mt-button>
    </div>

    <mt-popup v-model="popupVisibleL" popup-transition="popup-fade" closeOnClickModal="true">
      <div class="sample-correct">
        <span class="title">正确示例</span>
        <img class="correct-img" src="../../../assets/img/sample_face_correct.png" alt="">
      </div>
      <div class="sample-error">
        <span class="title">错误示例</span>
        <div class="error-img-wrapper">
          <div class="error-img-wrapper-l">
            <img class="error-img" src="../../../assets/img/sample_face_wrong_1.png" alt="">
            <div class="txt">图像模糊</div>
          </div>
          <div class="error-img-wrapper-r">
            <img class="error-img" src="../../../assets/img/sample_face_wrong_2.png" alt="">
            <div class="txt">图像不全</div>
          </div>
        </div>
      </div>
      <div class="to-shoot" @click="idcardFront">前往拍摄>></div>
    </mt-popup>
    <mt-popup v-model="popupVisibleR" popup-transition="popup-fade" closeOnClickModal="true">
      <div class="sample-correct">
        <span class="title">正确示例</span>
        <img class="correct-img" src="../../../assets/img/sample_back_correct.png" alt="">
      </div>
      <div class="sample-error">
        <span class="title">错误示例</span>
        <div class="error-img-wrapper">
          <div class="error-img-wrapper-l">
            <img class="error-img" src="../../../assets/img/sample_back_wrong_1.png" alt="">
            <div class="txt">图像模糊</div>
          </div>
          <div class="error-img-wrapper-r">
            <img class="error-img" src="../../../assets/img/sample_back_wrong_2.png" alt="">
            <div class="txt">图像不全</div>
          </div>
        </div>
      </div>
      <div class="to-shoot" @click="idcardBack">前往拍摄>></div>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui'
  import pcNavHeader from '../../common/pcNavHeader'

  export default {
    components: {
      pcNavHeader
    },
    data() {
      return {
        popupVisibleL: false,
        popupVisibleR: false,
        idcardFrontName: this.storageTextData.idCard.customerName,
        idcardFrontId: this.storageTextData.idCard.idNo
      }
    },
    props: {
      storageTextData: {
        type: Object
      }
    },
    computed: {
      applyQualificationAuthStatus() {
        return this.$store.state.identity.applyQualificationAuthStatus
      },
      // idCardTxt() {
      //   let idCard = this.storageTextData.idCard
      //   if (idCard !== undefined) {
      //     return idCard
      //   }
      // },

      // 正面拍摄完成返回本地图片状态
      idcardFrontShotStatus() {
        return this.$store.state.identity.idcardFront_shotStatus
      },
      // 服务器识别状态
      idcardFrontIdentifyStatus() {
        return this.$store.state.identity.idcardFront_identifyStatus
      },
      // idcardFrontName() {
      //   // return this.$store.state.identity.idcardFront_name
      //
      //   return this.idCardTxt.customerName
      // },
      // idcardFrontName: {
      //   get: function() {
      //     return this.idCardTxt.customerName
      //   },
      //   set: function(newValue) {
      //     console.log(newValue)
      //   }
      // },
      // idcardFrontId() {
      //   // return this.$store.state.identity.idcardFront_id
      //
      //   return this.idCardTxt.idNo
      // },
      idcardFrontImg() {
        // return this.$store.state.identity.idcardFront_img

        let idCard = this.app.getIdFile()
        if (idCard !== '') {
          this.$store.commit('idcardFrontShotStatusSave', true)
          return 'data:image/png;base64,' + idCard
        }
      },

      // 反面拍摄完成返回本地图片状态
      idcardBackShotStatus() {
        return this.$store.state.identity.idcardBack_shotStatus
      },
      // 服务器识别状态
      idcardBackIdentifyStatus() {
        return this.$store.state.identity.idcardBack_identifyStatus
      },
      idcardBackImg() {
        // return this.$store.state.identity.idcardBack_img

        let idCard = this.app.getIdBackFile()
        if (idCard !== '') {
          this.$store.commit('idcardBackShotStatusSave', true)
          return 'data:image/png;base64,' + idCard
        }
      },
      faceRecognitionStep() {
        return this.$store.state.identity.faceRecognitionStep
      }
    },
    methods: {
      /**
       * 检查申请资格认证状态并存储
       * @return false未通过
       * @return true 已通过
       */
      checkApplyQualificationAuthStatus() {
        let that = this
        let loginInfo = JSON.parse(this.app.isLogin())
        if (loginInfo.Step === 0 && loginInfo.Result !== 0) { // 未登录
          this.$router.push('/login')
        } else if (loginInfo.Step === 0 && loginInfo.Result === 0) {
          // 查询用户申请状态
          this.app.AppStatus()
          this.app.AppStatusCallBack = function(json) {
            json = JSON.parse(json)
            // console.log(json)
            if (json.Step === 35 && json.Result === 0) {
              let requires = JSON.parse(json.Msg)
              if (requires.length > 0) {
                // console.log(requires)
                let keys = Object.keys(requires[0])
                if (keys[0] === '822') {
                  that.$store.commit('applyQualificationAuthStatusSave', false)
                } else {
                  that.$store.commit('applyQualificationAuthStatusSave', true)
                }
              }
            }
          }
        }
      },
      focus() {
        // let that = this
        // setTimeout(function() {
        //   let pannel = that.$refs.idcardFrontInfoName
        //   pannel.scrollIntoView(true)
        //   pannel.scrollIntoViewIfNeeded()
        // }, 200)
        this.$refs.idCard.style.display = 'none'
      },
      blur() {
        let that = this
        this.app.ShowView(function() {
          that.$refs.idCard.style.display = 'block'
        })
      },
      showExampleL() {
        this.popupVisibleL = true
      },
      showExampleR() {
        this.popupVisibleR = true
      },
      idcardFront() {
        let that = this
        this.popupVisibleL = false
        this.app.idcardFront()
        this.app.IdcardFrontCallBack = function(json) {
          json = JSON.parse(json)
          console.log(json)
          if (json.Step === 6 && json.Result === 0 && json.IdCardType === 0) {
            // that.loading(json.Msg)
            // 正面拍摄完成返回本地图片状态
            that.$store.commit('idcardFrontShotStatusSave', true)
            that.$store.commit('idcardFrontImgSave', 'data:image/png;base64,' + json.Img)
          }
          if (json.Step === 7 && json.Result === 0 && json.IdCardType === 0) {
            // that.closeLoading()
            // Toast({
            //   message: json.Msg,
            //   duration: 3000
            // })
            // 服务器识别状态
            that.$store.commit('idcardFrontIdentifyStatusSave', true)
            /**
             * 检查申请资格认证状态
             */
            that.checkApplyQualificationAuthStatus()
            // that.$store.commit('idcardFrontNameSave', json.Name)
            // that.$store.commit('idcardFrontIdSave', json.Id)
          } else if (json.Step === 7 && json.Result !== 0 && json.IdCardType === 0) {
            that.closeLoading()
            Toast({
              message: json.Msg,
              duration: 3000
            })
          }
        }
      },
      idcardBack() {
        let that = this
        this.popupVisibleR = false
        this.app.idcardBack()
        this.app.IdcardBackCallBack = function(json) {
          json = JSON.parse(json)
          console.log(json)
          if (json.Step === 6 && json.Result === 0 && json.IdCardType === 1) {
            // that.loading(json.Msg)
            // 反面拍摄完成返回本地图片状态
            that.$store.commit('idcardBackShotStatusSave', true)
            that.$store.commit('idcardBackImgSave', 'data:image/png;base64,' + json.Img)
          }
          if (json.Step === 7 && json.Result === 0 && json.IdCardType === 1) {
            // that.closeLoading()
            // Toast({
            //   message: json.Msg,
            //   duration: 3000
            // })
            // 服务器识别状态
            that.$store.commit('idcardBackIdentifyStatusSave', true)
            /**
             * 检查申请资格认证状态
             */
            that.checkApplyQualificationAuthStatus()
          } else if (json.Step === 7 && json.Result !== 0 && json.IdCardType === 1) {
            that.closeLoading()
            Toast({
              message: json.Msg,
              duration: 3000
            })
          }
        }
      },
      submit() {
        let that = this
        this.loading()
        this.app.updateIdCard(this.idcardFrontName, this.idcardFrontId)
        this.app.UpdateIdCardCallBack = function(json) {
          that.closeLoading()
          json = JSON.parse(json)
          console.log(json)
          if (json.Step === 811 && json.Result === 0) {
            Toast({
              message: '请继续进行下一步',
              duration: 3000
            })
          } else if (json.Step === 811 && json.Result === 0) {
            Toast({
              message: json.Msg,
              duration: 3000
            })
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/css/base.styl'
  @import '../../../assets/css/identity/personalCertificate.styl'

  .identity-nav
    display: flex
    align-items: center
    width: 100%
    height: 42px
    color: #999
    font-size: 13px
    background-color: #fff
    .identity-slide
      flex: 1
      height: 100%
      text-align: center
      span
        display: inline-block
        height: 100%
        line-height: 42px
        padding: 0 2px
        &.active
          color: main-color
          border-bottom: 1px solid main-color

  .id-card
    margin-top: 13px
    padding: 0 15px
    background-color: #fff
    .title
      line-height: 37px
      color: #666
      font-size: 14px
    .shot-wrapper
      display: flex
      .shot-item
        flex: 1
        margin-right: 12px
        text-align: center
        &:last-child
          margin: 0
        img
          width: 100%
          height: 100%
        .explain
          display: inline-block
          margin: 10px 0 15px 0
          color: #999
          font-size: 13px

  .mint-popup
    width: 88.8%
    padding: 10px 20px
    text-align: center
    border-radius: 10px
    .title
      position: relative
      display: inline-block
      margin: 22px 0 11px 0
      text-align: center
      color: #333
      font-size: 14px
      &:before
        position: absolute
        content: ''
        left: -20px
        top: 50%
        width: 10px
        border-bottom: 1px solid #666
      &:after
        position: absolute
        content: ''
        right: -20px
        top: 50%
        width: 10px
        border-bottom: 1px solid #666
    .sample-correct
      .correct-img
        display: block
        width: 180px
        height: 115px
        margin: 0 auto
    .sample-error
      .error-img-wrapper
        display: flex
        justify-content: space-between
        .error-img
          width: 139px
          height: 88px
        .txt
          margin-top: 9px
          color: #999
          font-size: 11px
    .to-shoot
      margin: 50px 0 30px 0
      color: main-color
      font-size: 17px
</style>
