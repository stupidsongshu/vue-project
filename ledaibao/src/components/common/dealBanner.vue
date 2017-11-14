<template>
  <div class="deal-banner">
    <h1 class="title">{{title}}</h1>
    <div class="deal-amount">
      <span class="icon"></span>
      <span class="num">385.83</span>
    </div>
    <div class="deal-time" v-if="isShow">申请时间：2017-08-22</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String
      },
      isShow: {
        type: Boolean
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/sass/base.sass';

  .deal-banner {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    height: 168px;
    padding: 20px 0;
    text-align: center;
    color: #fff;
    background: url("../../assets/img/bg@2x.png") no-repeat;
    background-size: 100% 168px;
    .title {
      font-size: 17px;
      font-weight: normal;
    }
    .deal-amount {
      .icon {
        display: inline-block;
        width: 21px;
        height: 27px;
        background-image: url("../../assets/img/money@2x.png");
        background-size: 21px 27px;
      }
      .num {
        font-size: 54px;
      }
    }
    .deal-time {
      font-size: 12px;
    }
  }
</style>
