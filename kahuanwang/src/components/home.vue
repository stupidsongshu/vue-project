<template>
  <div class="index no-header">
    <div class="bg-header">
      <!--<div class="title">
        <div></div>
        <div>卡还王</div>
        <router-link class="icon-news" to="/newsCenter"></router-link>
      </div>-->

      <mt-header class="title" title="卡还王">
        <!--<router-link class="icon-news" to="/newsCenter" slot="right"></router-link>-->
      </mt-header>

      <div class="card-wrapper">
        <div class="card">
          <div class="loan-amount">
            <div class="loan-amount-num"><span class="icon-money"></span><span>{{loanLimit}}</span></div>
            <div class="loan-amount-title">申请金额</div>
          </div>
        </div>
      </div>
      <div class="notice-wrapper">
        <div class="notice">
          <div class="icon"></div>
          <keep-alive>
            <swiper :options="swiperOption" v-if="phoneArr">
              <swiper-slide class="phone-item" v-for="phone in phoneArr">
                {{phone.number}}成功借款{{phone.amount}}元
              </swiper-slide>
            </swiper>
          </keep-alive>
        </div>
      </div>
    </div>

    <div class="range">
      <mt-range v-model="loanLimit" :min="loanLimitMin" :max="loanLimitMax" :step="100" :bar-height="3"></mt-range>
      <div class="clearfix range-num">
        <span class="pull-left">{{loanLimitMin}}</span>
        <span class="pull-right">{{loanLimitMax}}</span>
      </div>
      <div class="select-month">
        <mt-button :class="{active: loanDuration === 3}" @click="selectLoanDuration(3)">3个月</mt-button>
        <mt-button :class="{active: loanDuration === 6}" @click="selectLoanDuration(6)">6个月</mt-button>
        <mt-button :class="{active: loanDuration === 12}" @click="selectLoanDuration(12)">12个月</mt-button>
      </div>
    </div>

    <div class="loan-btn">
      <mt-button class="btn" @click="loan">立即借款</mt-button>
    </div>
    <div class="footer-txt">"卡还王"由麦广互娱与中银消费金融联合打造</div>
    <!--<router-link to="/survey" class="footer-txt" style="display: block;margin: 0 auto;">"卡还王"由麦广互娱与中银消费金融联合打造</router-link>-->
  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: 'home',
    data() {
      return {
        loanLimitMin: 500,
        loanLimitMax: 20000,
        swiperOption: {
          direction: 'vertical',
          autoplay: 3000,
          speed: 800,
          loop: true,
          // 值为true时，slide无法拖动
          onlyExternal: true
        },
        phoneArr: []
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    methods: {
      selectLoanDuration(time) {
        this.$store.commit('loan_duration_save', time)
      },
      loan() {
        this.$emit('checkApplyStatus')
      }
    },
    computed: {
      loanLimit: {
        // getter
        get: function() {
          return this.$store.state.loan.loan_limit
        },
        // setter
        set: function(newValue) {
          this.$store.commit('loan_limit_save', newValue)
        }
      },
      loanDuration() {
        return this.$store.state.loan.loan_duration
      }
    }
    // mounted() {
    //   var a = new Date()
    //   /*
    //     三大运营商最新号段 合作版
    //     移动号段:
    //       134 135 136 137 138 139 147 148 150 151 152 157 158 159 172 178 182 183 184 187 188 198
    //     联通号段:
    //       130 131 132 145 146 155 156 166 171 175 176 185 186
    //     电信号段:
    //       133 149 153 173 174 177 180 181 189 199
    //     虚拟运营商:
    //       170
    //   */
    //   const LOAN_LIMIT_MIN = 500
    //   const LOAN_LIMIT_MAX = 20000
    //   let prefixArr = [134, 135, 136, 137, 138, 139, 147, 148, 150, 151, 152, 157, 158, 159, 172, 178, 182, 183, 184, 187, 188, 198, 130, 131, 132, 145, 146, 155, 156, 166, 171, 175, 176, 185, 186, 133, 149, 153, 173, 174, 177, 180, 181, 189, 199, 170]
    //   // 生成手机号
    //   let generateNumber = function() {
    //     // 前3位
    //     let prefix = prefixArr[parseInt(Math.random() * prefixArr.length)]
    //     // 后4位
    //     let postfix = (() => {
    //       let tmp = (parseInt(Math.random() * 10000)).toString()
    //       while (tmp.length < 4) {
    //         tmp = '0' + tmp
    //       }
    //       return tmp
    //     })()
    //     return prefix + '****' + postfix
    //   }
    //   // 贷款额度
    //   let generateAmount = () => {
    //     // var a = parseInt(Math.random() * ((20000 - 500) / 100 + 1))
    //     // return a * 100 + 500
    //     var tmp = parseInt(Math.random() * ((LOAN_LIMIT_MAX - LOAN_LIMIT_MIN) / 100 + 1))
    //     return tmp * 100 + LOAN_LIMIT_MIN
    //   }
    //   for (var i = 0; i < 5; i++) {
    //     this.phoneArr.push({
    //       number: generateNumber(),
    //       amount: generateAmount()
    //     })
    //   }
    //   console.log(this.phoneArr)
    //   var b = new Date()
    //   console.log(b - a)
    // }
  }
</script>

<style lang="stylus">
  .mt-range-runway
    border: 3px solid #d9d9d9 !important
    border-radius: 3px

  .mt-range-progress
    border: 3px solid #4e433d
    border-top-left-radius: 3px
    border-bottom-left-radius: 3px

  .mt-range-thumb
    width: 33px !important
    height: 33px !important
    background-image: url("../assets/img/slider_money.png")
    background-size: 33px 33px
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .bg-header
    position: relative
    width: 100%
    height: 238px
    font-size: 20px
    background-image: url("../assets/img/bg-header.png")
    background-repeat: no-repeat
    background-size: 100% 238px
    .icon-news
      display: inline-block
      width: 22px
      height: 45px
      background-image: url("../assets/img/icon_news.png")
      background-repeat: no-repeat
      background-position: center
      background-size: 22px 23px
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
        text-align: right
        color: #fff
        border-radius: 10px
        background: url("../assets/img/card.png") no-repeat
        background-size: 100% 200px
        /*box-shadow: 2px 0 12px #e5e3e2,-2px 0 12px #e5e3e2*/
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
        background-color: rgba(255, 255, 255, .4)
        .icon
          width: 14px
          height: 100%
          background: url('../assets/img/icon_horn.png') no-repeat center;
          background-size: 14px 14px
        .swiper-container
          margin-left: 4px
          .phone-item
            /*width: 100%
            height: 24px
            line-height: 24px*/
            display: flex
            align-items: center
            color: #fff
            font-size: 12px

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
    text-align: center
    color: #999
    font-size: 12px
</style>
