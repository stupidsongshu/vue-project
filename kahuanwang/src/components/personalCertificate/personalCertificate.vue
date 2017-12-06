<template>
  <div>
    <mt-header fixed class="header" title="个人认证">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <pc-nav-header :curProgress="progress" v-if="progressShow"></pc-nav-header>

    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import pcNavHeader from '../common/pcNavHeader'

  export default {
    data() {
      return {}
    },
    components: {
      pcNavHeader
    },
    computed: {
      progress() {
        return this.$store.state.identity.personalCertificateSwiperProgress
      },
      progressShow() {
        return this.$store.state.identity.personalCertificateSwiperShow
      }
    },
    methods: {
      progressStatus(curPath) {
        let filterPathPersonalCertificate = [
          '/personalCertificate',
          '/personalCertificate/bankCardInfo',
          '/personalCertificate/baseInfo',
          '/personalCertificate/linkman',
          '/personalCertificate/videoAuth'
        ]
        let boolCertificate = filterPathPersonalCertificate.some((path) => {
          return curPath === path
        })
        if (boolCertificate) {
          this.$store.commit('personalCertificateSwiperShowSave', true)
        } else {
          this.$store.commit('personalCertificateSwiperShowSave', false)
        }
      }
    },
    created() {
      // 修复从personalCertificate组件以外的页面直接进入personalCertificate组件及其子组件后,个人认证资料swiper会显示的问题
      this.progressStatus(this.$route.path)
    },
    watch: {
      /**
       * 个人认证资料swiper是否显示
       */
      '$route'(to, from) {
        this.progressStatus(to.path)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
