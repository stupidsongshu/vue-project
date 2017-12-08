<template>
  <swiper :options="swiperOption" ref="mySwiper" class="pc-nav-header">
    <swiper-slide>
      <span @click="identity" :class="{curProgress: curProgress >= 1, active: curProgress === 1}">身份信息</span>
    </swiper-slide>
    <swiper-slide>
      <span @click="bankCard" :class="{curProgress: curProgress >= 2, active: curProgress === 2}">银行卡信息</span>
    </swiper-slide>
    <swiper-slide>
      <span @click="baseInfo" :class="{curProgress: curProgress >= 3, active: curProgress === 3}">基本信息</span>
    </swiper-slide>
    <swiper-slide>
      <span @click="linkman" :class="{curProgress: curProgress >= 4, active: curProgress === 4}">联系人信息</span>
    </swiper-slide>
    <swiper-slide>
      <span @click="videoAuth" :class="{curProgress: curProgress >= 5, active: curProgress === 5}">视频认证</span>
    </swiper-slide>
  </swiper>
</template>

<script type="text/ecmascript-6">
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    data() {
      return {
        swiperOption: {
          slidesPerView: 3
          // slideToClickedSlide: true,
          // centeredSlides: true
        }
      }
    },
    props: {
      // 当前进度
      curProgress: {
        type: Number
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      // 申请资格认证状态
      applyQualificationAuthStatus() {
        return this.$store.state.identity.applyQualificationAuthStatus
      }
    },
    methods: {
      // 身份信息
      identity() {
        this.$store.commit('personalCertificateSwiperProgressSave', 1)
        this.$router.replace('/personalCertificate')
      },
      // 银行卡信息
      bankCard() {
        this.swiper.slideTo(0)
        this.$store.commit('personalCertificateSwiperProgressSave', 2)
        this.$router.replace('/personalCertificate/bankCardInfo')
      },
      // 基本信息
      baseInfo() {
        this.swiper.slideTo(1)
        this.$store.commit('personalCertificateSwiperProgressSave', 3)
        this.$router.replace('/personalCertificate/baseInfo')
      },
      // 联系人信息
      linkman() {
        this.swiper.slideTo(2)
        this.$store.commit('personalCertificateSwiperProgressSave', 4)
        this.$router.replace('/personalCertificate/linkman')
      },
      // 视频认证
      videoAuth() {
        this.$store.commit('personalCertificateSwiperProgressSave', 5)
        this.$router.replace('/personalCertificate/videoAuth')
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'

  .pc-nav-header
    width: 100%
    height: 42px
    line-height: 42px
    color: #999
    font-size: 13px
    background-color: #fff
    .swiper-slide
      text-align: center
      span
        display: inline-block
        height: 100%
        padding: 0 2px
        &.curProgress
          color: main-color
        &.active
          border-bottom: 2px solid main-color
</style>
