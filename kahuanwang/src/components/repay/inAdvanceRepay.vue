<template>
  <div class="loanRepayDesc">
    <mt-header fixed class="header" title="提前还款">
      <router-link to="" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="banner">
      <div class="title">当前应还</div>
      <div class="amount">
        <span class="icon-money"></span> 691.<span class="decimals">14</span>
      </div>
      <div class="time">最近还款日：2017/07/28</div>
    </div>

    <div class="desc">
      <div class="title">明细</div>
      <div class="item">
        <div class="name">本金</div>
        <div class="value">2000.00</div>
      </div>
      <div class="item">
        <div class="name">当前利息</div>
        <div class="value">0.69元 <span class="calc-rate"></span></div>
      </div>
      <div class="item">
        <div class="name">还款借记卡</div>
        <div class="value">中国建设银行（尾号3225）</div>
      </div>
      <div class="item">
        <div class="name">开卡银行</div>
        <div class="value">招商银行</div>
      </div>
      <div class="item">
        <div class="name">提前还款违约金</div>
        <div class="value">10.00元</div>
      </div>
    </div>

    <div class="loan-btn">
      <mt-button class="btn" @click="inAdvanceRepayBtn">立即还款</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      inAdvanceRepayBtn() {
        this.$router.push('/repayCode')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*.inAdvanceRepay
    padding: 17px 15px 0 15px
    .banner
      display: flex
      flex-direction: column
      justify-content: space-around
      align-items: center
      width: 100%
      height: 166px
      padding: 10px 0
      color: #fff
      border-radius: 5px
      background-image: url("../../assets/img/repay-bg.png")
      background-size: 100% 166px
      .title
        font-size: 17px
      .amount
        font-size: 48px
        .icon-money
          display: inline-block
          width: 19px
          height: 25px
          background-image: url('../../assets/img/icon_money.png')
          background-size: 19px 25px
        .decimals
          font-size: 31px
      .time
        font-size: 13px

    .desc
      width: 100%
      margin-top: 15px
      padding: 29px 0 23px 29px
      font-size: 14px
      border-radius: 5px
      background-color: #fff
      .title
        margin-bottom: 14px
        font-size: 17px
        font-weight: 600
      .item
        display: flex
        line-height: 26px
        .name
          flex-basis: 118px
          width: 118px
          color: #666
        .value
          color: #333
          .calc-rate
            display: inline-block
            width: 14px
            height: 16px
            margin-left: 4px
            vertical-align: -3px
            background-image: url("../../assets/img/icon_rate.png")
            background-size: 100% 100%

    .loan-btn
      margin-top: 23px*/

  @import '../../assets/css/loanRepay.styl'
</style>
