<template>
  <ul class="pc-nav-header">
    <li>
      <span :class="{curProgress: curProgress >= 1, active: curProgress === 1}">身份信息</span>
    </li>
    <li>
      <span :class="{curProgress: curProgress >= 2, active: curProgress === 2}">银行卡信息</span>
    </li>
    <li>
      <span :class="{curProgress: curProgress >= 3, active: curProgress === 3}">基本信息</span>
    </li>
    <li>
      <span :class="{curProgress: curProgress >= 4, active: curProgress === 4}">联系人信息</span>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      // 当前进度
      curProgress: {
        type: Number
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'
  @import '../../assets/css/personalCertificate.styl'
</style>
