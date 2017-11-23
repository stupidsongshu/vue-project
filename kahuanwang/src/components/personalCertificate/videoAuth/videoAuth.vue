<template>
  <div>
    <mt-header fixed class="header" title="个人认证">
      <router-link to="" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <pc-nav-header :curProgress="5"></pc-nav-header>

    <div class="faceRecognition" @click="fail">
      <h1 class="title">请按照界面提示，读一段文字，完成认证视频录制</h1>
      <div class="shot-video" @click="showPopup"></div>
      <p>点击图标进行视频认证</p>
    </div>

    <div class="loan-btn">
      <mt-button class="btn" @click="submit">提交</mt-button>
    </div>

    <mt-popup v-model="popupVisible" popup-transition="popup-fade" closeOnClickModal="true">
      <div class="title color333">常见错误</div>
      <ul class="sup-wrapper color666">
        <li class="sup-item">
          <div class="sup-item-title">1.文字读不全或读错：</div>
          <ul class="sub-wrapper">
            <li class="sub-item">1) “中银消费金融”误读成“中银金融”</li>
            <li class="sub-item">2) “中银消费金融”误读成“中信消费金融”</li>
          </ul>
        </li>
        <li class="sup-item">2.五官不全、衣冠不整（如：赤膊等）</li>
        <li class="sup-item">2.视频模糊（如：环境光线暗、反光）</li>
      </ul>

      <router-link to="/readAloud" class="to-shoot">前往拍摄>></router-link>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import pcNavHeader from '../../common/pcNavHeader'

  export default {
    data() {
      return {
        popupVisible: false
      }
    },
    components: {
      pcNavHeader
    },
    methods: {
      showPopup() {
        this.popupVisible = true
      },
      fail() {},
      submit() {}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/css/base.styl'
  @import '../../../assets/css/identity/faceRecognition.styl'

  .mint-popup
    width: 88.8%
    padding: 10px 20px
    border-radius: 10px
    .title
      margin: 22px 0 11px 0
      text-align: center
      font-size: 17px
    .sup-wrapper
      padding-left: 18px
      line-height: 20px
      font-size: 13px
      .sub-wrapper
        padding-left: 1em

    .to-shoot
      display: block
      margin: 38px 0 30px 0
      text-align: center
      color: main-color
      font-size: 17px
</style>
