<template>
  <ul class="pc-nav-header">
    <li @click="identity">
      <span :class="{curProgress: curProgress >= 1, active: curProgress === 1}">身份信息</span>
    </li>
    <li @click="bankCard">
      <span :class="{curProgress: curProgress >= 2, active: curProgress === 2}">银行卡信息</span>
    </li>
    <li @click="baseInfo">
      <span :class="{curProgress: curProgress >= 3, active: curProgress === 3}">基本信息</span>
    </li>
    <li @click="linkman">
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
    },
    methods: {
      identity() {
        this.$router.push('/identity')
      },
      bankCard() {
        this.$router.push('/bankCardInfo')
      },
      baseInfo() {
        this.$router.push('/baseInfo')
      },
      linkman() {
        this.$router.push('/linkman')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'

  .pc-nav-header
    display: flex
    width: 100%
    height: 42px
    line-height: 42px
    color: #999
    font-size: 13px
    background-color: #fff
    li
      flex: 1
      height: 100%
      text-align: center
      span
        display: inline-block
        height: 100%
        padding: 0 2px
        &.curProgress
          color: main-color
        &.active
          border-bottom: 1px solid main-color
</style>
