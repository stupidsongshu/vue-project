<template>
  <div>
    <mt-header fixed class="header" title="乐贷款">
      <router-link class="header-icon" to="/" slot="left">
        <mt-button></mt-button>
      </router-link>
    </mt-header>

    <deal-banner :title="title" :isShow="isShow"></deal-banner>
    <step :curStatus="3"></step>

    <div class="wrapper">
      需还总额：2040.0元<span class="calc-rate"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import dealBanner from './common/dealBanner.vue'
  import step from './common/step.vue'

  export default {
    data() {
      return {
        title: '还款处理中',
        isShow: false
      }
    },
    components: {
      dealBanner,
      step
    }
  }
</script>

<style scoped lang="scss">
  @import '../assets/sass/base.sass';

  .header {
    color: #333;
    background-color: #fff;
    .header-icon {
      background-image: url("../assets/img/my@2x.png")
      /*@include bg-img('../assets/img/my')*/
    }
  }

  .wrapper {
    margin-top: 5px;
    height: 52px;
    padding: 0 15px;
    line-height: 52px;
    color: #666;
    font-size: 14px;
    background-color: #fff;
    .calc-rate {
      display: inline-block;
      width: 14px;
      height: 14px;
      margin-left: 2px;
      vertical-align: middle;
      background-image: url("../assets/img/rate-icon@2x.png");
      background-size: 14px 14px;
    }
  }
</style>
