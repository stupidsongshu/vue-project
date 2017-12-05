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
        return this.$store.state.common.personalCertificateProgress
      },
      progressShow() {
        return this.$store.state.common.personalCertificateShow
      }
    },
    watch: {
      '$route'(to, from) {
        let filterPath = [
          '/personalCertificate',
          '/personalCertificate/bankCardInfo',
          '/personalCertificate/baseInfo',
          '/personalCertificate/linkman',
          '/personalCertificate/videoAuth'
        ]
        let bool = filterPath.some((path) => {
          return to.path === path
        })
        if (bool) {
          this.$store.commit('personalCertificateShowSave', true)
        } else {
          this.$store.commit('personalCertificateShowSave', false)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
