<template>
  <mt-tabbar fixed v-model="selected" v-if="hasFooter">
    <mt-tab-item id="loan">
      <img slot="icon" src="../../assets/img/bottom_icon_01_click.png" v-show="selected === 'loan'">
      <img slot="icon" src="../../assets/img/bottom_icon_01_nor.png" v-show="selected !== 'loan'">
      借款
    </mt-tab-item>
    <mt-tab-item id="repay">
      <img slot="icon" src="../../assets/img/bottom_icon_02_click.png" v-show="selected === 'repay'">
      <img slot="icon" src="../../assets/img/bottom_icon_02_nor.png" v-show="selected !== 'repay'">
      还款
    </mt-tab-item>
    <mt-tab-item id="my">
      <img slot="icon" src="../../assets/img/bottom_icon_03_click.png" v-show="selected === 'my'">
      <img slot="icon" src="../../assets/img/bottom_icon_03_nor.png" v-show="selected !== 'my'">
      我的
    </mt-tab-item>
  </mt-tabbar>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      hasFooter: {
        type: Boolean
      }
    },
    data() {
      return {
        selected: 'loan'
      }
    },
    watch: {
      selected: function(newValue, oldValue) {
        console.log(newValue)
        if (newValue === 'loan') {
          this.$router.push('/')
        } else if (newValue === 'repay') {
          this.$router.push('/repay')
        } else if (newValue === 'my') {
          this.$router.push('/my')
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .mint-tabbar
    color: #d2d1d1
    background-color: #fff
    background-image: none
    border-top: 1px solid #d9d9d9
    .mint-tab-item
      &.is-selected
        color: #daab5b
        background-color: #fff
</style>
