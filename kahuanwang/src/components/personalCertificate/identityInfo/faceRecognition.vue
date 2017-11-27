<template>
  <div>
    <mt-header fixed class="header" title="人脸识别">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="faceRecognition" @click="shot">
      <h1 class="title">为确保本人操作，来刷个脸吧！</h1>
      <div class="shot-frame">
        <div class="shot"></div>
      </div>
      <p>点击图标进行人脸识别</p>
      <p>请正面对准手机，确保光线充足！</p>
    </div>

    <div class="loan-btn">
      <mt-button class="btn" @click="nextStep">下一步</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      back() {
        this.goback()
      },
      nextStep() {
      },
      shot() {
//        this.$router.push('/shot')
        this.app.livingCheck()
        this.app.CheckCallBack = function(json) {
          json = JSON.parse(json)
          console.log(json)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/css/identity/faceRecognition.styl'
</style>
