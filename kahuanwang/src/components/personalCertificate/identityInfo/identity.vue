<template>
  <div>
    <mt-header fixed class="header" title="个人认证">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <pc-nav-header :curProgress="1"></pc-nav-header>

    <div class="id-card">
      <h1 class="title">拍摄身份证</h1>
      <ul class="shot-wrapper">
        <li class="shot-item" @click="showExampleL">
          <div>
            <img src="../../../assets/img/shot_face.png" alt="">
          </div>
          <span class="explain">身份证正面</span>
        </li>
        <li class="shot-item" @click="showExampleR">
          <div>
            <img src="../../../assets/img/shot_back.png" alt="">
          </div>
          <span class="explain">身份证反面</span>
        </li>
      </ul>
    </div>

    <div class="input-item-hint">
      <div class="caution-wrapper">
        <span class="icon-caution"></span><span>请确保身份证和登录手机号码实名认证一致</span>
      </div>
      <div class="arrow-wrapper">
        <router-link to="/modifyPhone" class="main-color">修改手机号</router-link>
        <span class="fa fa-angle-right arrow-right"></span>
      </div>
    </div>

    <div class="input-item">
      <div class="input-item-l">
        <span class="name">姓名</span>
        <input class="input" type="text" placeholder="真实姓名" readonly>
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-l">
        <span class="name">身份证号</span>
        <input class="input" type="text" placeholder="身份证号码" readonly>
      </div>
    </div>

    <router-link class="input-item" to="/faceRecognition" style="margin-top: 17px;">
      <div class="input-item-l">
        <span class="name">拍摄人脸</span>
        <input class="input" type="text" placeholder="前往拍摄" readonly>
      </div>
      <div class="input-item-r">
        <i class="fa fa-angle-right"></i>
        <!--<i class="icon-shoot-success"></i>-->
      </div>
    </router-link>
    <router-link class="input-item" to="/videoAuth">
      <div class="input-item-l">
        <span class="name">视频认证</span>
        <input class="input" type="text" placeholder="前往认证" readonly>
      </div>
      <div class="input-item-r">
        <i class="fa fa-angle-right"></i>
        <!--<i class="icon-shoot-success"></i>-->
      </div>
    </router-link>

    <div class="loan-btn" style="margin-top: 42px;">
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
  import pcNavHeader from '../../common/pcNavHeader'

  export default {
    data() {
      return {
        popupVisibleL: false,
        popupVisibleR: false
      }
    },
    components: {
      pcNavHeader
    },
    methods: {
      back() {
        this.goback()
      },
      showExampleL() {
        this.popupVisibleL = true
      },
      showExampleR() {
        this.popupVisibleR = true
      },
      idcardFront() {
        console.log(this)
        this.app.idcardFront()
        this.app.CheckCallBack = function(json) {
          json = JSON.parse(json)
          console.log(json)
        }
      },
      idcardBack() {
        this.app.idcardBack()
      },
      submit() {
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/css/base.styl'
  @import '../../../assets/css/identity/personalCertificate.styl'

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
