<template>
  <div>
    <mt-header fixed class="header" title="个人认证">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <pc-nav-header :curProgress="4"></pc-nav-header>

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
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
