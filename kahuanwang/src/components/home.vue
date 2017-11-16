<template>
  <div class="index">
    <div class="bg-header">
      <!--<div class="title">
        <div></div>
        <div>卡还王</div>
        <router-link class="icon-news" to="/newsCenter"></router-link>
      </div>-->

      <mt-header class="title" title="卡还王">
        <router-link class="icon-news" to="/newsCenter" slot="right"></router-link>
      </mt-header>

      <div class="card-wrapper">
        <div class="card">
          <div class="loan-amount">
            <div class="loan-amount-num"><span class="icon-money"></span><span>{{loanNum}}</span></div>
            <div class="loan-amount-title">申请金额</div>
          </div>
        </div>
      </div>
      <div class="notice-wrapper">
        <div class="notice">
          <div class="icon"></div>
        </div>
      </div>
    </div>

    <div class="range">
      <mt-range v-model="loanNum" :min="loanNumMin" :max="loanNumMax" :step="100" :bar-height="3"></mt-range>
      <div class="clearfix range-num">
        <span class="pull-left">{{loanNumMin}}</span>
        <span class="pull-right">{{loanNumMax}}</span>
      </div>
      <div class="select-month">
        <mt-button :class="{active: selectMonthBtn === 1}" @click="selectMonthBtn = 1">3个月</mt-button>
        <mt-button :class="{active: selectMonthBtn === 2}" @click="selectMonthBtn = 2">6个月</mt-button>
        <mt-button :class="{active: selectMonthBtn === 3}" @click="selectMonthBtn = 3">12个月</mt-button>
      </div>
    </div>

    <div class="loan-btn">
      <mt-button class="btn" @click="loan">立即借款</mt-button>
    </div>
    <div class="footer-txt">"卡还王"由麦广互娱与中银消费金融联合打造</div>

  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: 'home',
    data() {
      return {
        loanNum: 10000,
        loanNumMin: 500,
        loanNumMax: 20000,
        selectMonthBtn: 0
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    methods: {
      loan() {
        this.$router.push('/loan')
      }
    }
  }
</script>

<style lang="stylus">
  .mt-range-runway
    border: 3px solid #d9d9d9
    border-radius: 3px
  .mt-range-progress
    border: 3px solid #4e433d
    border-top-left-radius: 3px
    border-bottom-left-radius: 3px
  .mt-range-thumb
    width: 33px
    height: 33px
    background-image: url("../assets/img/slider_money.png")
    background-size: 33px 33px
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .bg-header
    position: relative
    top: -45px
    width: 100%
    height: 238px
    font-size: 20px
    background-size: 100% 238px
    background-repeat: no-repeat
    background-image: url("../assets/img/bg-header.png")
    .title
      display: flex
      justify-content: space-between
      height: 45px
      padding: 0 15px
      color: #fff
      font-size: 18px
      background-color: transparent
      .icon-news
        display: inline-block
        width: 22px
        height: 45px
        background-size: 22px 23px
        background-repeat: no-repeat
        background-position: center
        background-image: url("../assets/img/icon_news.png")
    .card-wrapper
      position: absolute
      top: 80px
      left: 0
      width: 100%
      height: 200px
      padding: 0 15px
      .card
        display: table
        width: 100%
        height: 100%
        padding-right: 22px
        color: #fff
        background: url("../assets/img/card.png") no-repeat
        background-size: 100% 200px
        border-radius: 10px
        box-shadow: 2px 0 12px #e5e3e2,-2px 0 12px #e5e3e2
        text-align: right
        .loan-amount
          display: table-cell
          vertical-align: middle
          .loan-amount-num
            .icon-money
              display: inline-block
              width: 19px
              height: 25px
              background-image: url('../assets/img/icon_money.png')
              background-size: 19px 25px
            span
              font-size: 45px
          .loan-amount-title
            margin-top: 10px
            font-size: 14px
    .notice-wrapper
      position: absolute
      width: 100%
      padding: 0 15px
      height: 24px
      bottom: -24px
      .notice
        display: flex
        width: 100%
        height: 100%
        padding-left: 10px
        background-color: rgba(255,255,255,.4)
        .icon
          width: 14px
          height: 100%
          background: url('../assets/img/icon_horn.png') no-repeat center;
          background-size: 14px 14px

  .range
    width: 100%
    margin-top: 55px
    padding: 0 15px
    .range-num
      width: 100%
      color: #999
      font-size: 13px
    .select-month
      display: flex
      width: 100%
      margin: 55px 0 46px 0
      justify-content: space-between
      button
        width: 88px
        height: 30px
        color: #999
        font-size: 15px
        border: 1px solid #999
        background-color: #fff
        &.active
          color: #fff
          border: none
          background-color: #daab5b

  .footer-txt
    line-height: 44px
    color: #999
    font-size: 12px
    text-align: center
</style>
