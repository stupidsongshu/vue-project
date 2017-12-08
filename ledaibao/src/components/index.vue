<template>
  <div>
    <mt-header fixed class="header" title="乐贷款">
      <router-link class="header-icon" to="/" slot="left">
        <mt-button></mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>

    <div class="swiper-container banner-swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="banner in bannerList">
          <a :href="banner.imgDetailUrl">
            <img :src="banner.imgUrl" alt="">
          </a>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-white"></div>
    </div>

    <div class="notice-wrapper clearfix">
      <div class="notice-icon"></div>
      <div class="swiper-container notice-swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide swiper-no-swiping" v-for="notice in noticeList">
            {{notice.phone}}成功借款{{notice.num}}元
          </div>
        </div>
      </div>
    </div>

    <div class="index-wrapper">
      <div class="content-top">
        <div>
          <div class="num">1分钟</div>
          <div class="txt">到账时间</div>
        </div>
        <div>
          <div class="num">2000元</div>
          <div class="txt">到账金额</div>
        </div>
        <div>
          <div class="num">691.14元</div>
          <div class="txt">每月应还</div>
        </div>
      </div>

      <div class="content-main">
        <div class="calc-rate"></div>
        <div class="loan-amount">
          <div class="loan-amount-title">申请金额(元)</div>
          <div class="loan-amount-num"><span class="icon-money"></span><span>{{loanNum}}</span></div>
        </div>
        <div class="slide">
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
      </div>

      <!--<router-link to="/applyCash">-->
      <mt-button class="loan-btn" @click="loan">立即借款</mt-button>
      <!--</router-link>-->
    </div>
  </div>
</template>

<script>
  import Swiper from '../../static/swiper/js/swiper.min'
  import axios from 'axios'

  /*
    三大运营商最新号段 合作版
    移动号段:
      134 135 136 137 138 139 147 148 150 151 152 157 158 159 172 178 182 183 184 187 188 198
    联通号段:
      130 131 132 145 146 155 156 166 171 175 176 185 186
    电信号段:
      133 149 153 173 174 177 180 181 189 199
    虚拟运营商:
      170
  */

  export default {
    name: 'Index',
    data() {
      return {
        bannerList: [],
        noticeList: [],
        loanNum: 500,
        loanNumMin: 500,
        loanNumMax: 20000,
        selectMonthBtn: 0
      }
    },
    mounted() {
      var that = this
      setTimeout(() => {
        that.bannerSwiper = new Swiper('.banner-swiper-container', {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          loop: true,
          speed: 600,
          autoplay: 4000,
          autoplayDisableOnInteraction: false,
          observer: true, // 修改swiper自己或子元素时，自动初始化swiper
          observeParents: true // 修改swiper的父元素时，自动初始化swiper
        })
        axios.get('http://ledaikuan.vip:8080/activity/Index/banner').then((res) => {
          that.bannerList = res.data
          that.$nextTick(() => {
            console.log(that.bannerSwiper)
            that.bannerSwiper.startAutoplay()// 重新开始轮播
            that.bannerSwiper.reLoop()// 重新计算slides个数
          })
        })
      }, 0)

      this.noticeSwiper = new Swiper('.notice-swiper-container', {
        direction: 'vertical',
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true,
        speed: 600,
        autoplay: 4000,
        autoplayDisableOnInteraction: false,
        noSwiping: true,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true // 修改swiper的父元素时，自动初始化swiper
      })
    },
    methods: {
      loan() {
        this.$router.push('/applyCash')
      }
    },
    created() {
      let phoneInfo1 = {}
      let phoneInfo2 = {}
      let prefixArr = [134, 135, 136, 137, 138, 139, 147, 148, 150, 151, 152, 157, 158, 159, 172, 178, 182, 183, 184, 187, 188, 198, 130, 131, 132, 145, 146, 155, 156, 166, 171, 175, 176, 185, 186, 133, 149, 153, 173, 174, 177, 180, 181, 189, 199, 170]
      let a = () => {
        let createPhone = () => {
          // 前缀
          let prefix = prefixArr[parseInt(Math.random() * prefixArr.length)]
          // 后缀
          let postfix = (() => {
            let tmp = (parseInt(Math.random() * 10000)).toString()
            while (tmp.length < 4) {
              tmp = '0' + tmp
            }
            return tmp
          })()
          return prefix + '****' + postfix
        }
        // 贷款额度
        let createAmount = () => {
          var a = parseInt(Math.random() * ((20000 - 500) / 100 + 1))
          return a * 100 + 500
        }
        phoneInfo1.phone = createPhone()
        phoneInfo1.num = createAmount()
        phoneInfo2.phone = createPhone()
        phoneInfo2.num = createAmount()
        if (this.noticeList.length === 0) {
          this.noticeList.push(phoneInfo1, phoneInfo2)
        } else {
          this.noticeList = []
          this.noticeList.push(phoneInfo1, phoneInfo2)
        }
      }
      a()
      console.log(this.noticeList)
      setInterval(() => {
        a()
      }, 4000)
    }
  }
</script>

<style lang="scss">
  @import '../assets/sass/base.sass';

  .mt-range-runway {
    background-color: #e2e2e2;
  }
  .mt-range-progress {
    background-color: $main-color !important;
  }
  .mt-range-thumb {
    background-color: $main-color !important;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../static/swiper/css/swiper.min.css';
  @import '../assets/sass/base.sass';

  .header {
    color: #333;
    background-color: #fff;
    .header-icon {
      background-image: url("../assets/img/my@2x.png")
      /*@include bg-img('../assets/img/my')*/
    }
  }

  .banner-swiper-container {
    width: 100%;
    height: 195px;
    .swiper-slide {
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .swiper-pagination {
      height: 16px;
      padding-right: 15px;
      text-align: right;
    }
  }

  .notice-wrapper {
    width: 100%;
    height: 30px;
    padding: 0 15px 0 15px;
    line-height: 30px;
    font-size: 13px;
    color: #333;
    background-color: #fff;
    overflow: hidden;
    .notice-icon {
      float: left;
      width: 13px;
      height: 100%;
      margin-right: 7px;
      background: url("../assets/img/horn@2x.png") no-repeat center center;
      background-size: 13px 13px;
    }
    .notice-swiper-container {
      float: left;
      width: auto;
      height: 30px;
    }
  }

  .index-wrapper {
    width: 100%;
    height: auto;
    padding: 8px 15px 8px 15px;
    background-color: #efefef;
    .content-top {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 58px;
      text-align: center;
      border-radius: 6px;
      background-color: #fff;
      .num {
        margin-bottom: 5px;
        color: #ec5243;
        font-size: 17px;
      }
      .txt {
        color: #999;
        font-size: 12px;
      }
    }

    .content-main {
      position: relative;
      width: 100%;
      margin: 8px 0 9px 0;
      padding: 12px 28px 16px 28px;
      border-radius: 6px;
      background-color: #fff;
      .calc-rate {
        position: absolute;
        top: 11px;
        right: 12px;
        width: 28px;
        height: 28px;
        background-image: url("../assets/img/rate-icon@2x.png");
        background-size: 28px 28px;
      }
      .loan-amount {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        width: 218px;
        height: 109px;
        margin: 0 auto;
        /*border: 1px solid #f00;
        border-radius: 109px 109px 0 0;*/
        background-size: 218px 109px;
        background-image: url("../assets/img/semicircle@2x.png");
        .loan-amount-title {
          color: #999;
          font-size: 14px;
        }
        .loan-amount-num {
          margin-top: 4px;
          color: $main-color;
          .icon-money {
            display: inline-block;
            width: 18px;
            height: 24px;
            background-image: url("../assets/img/icon_money@2x.png");
            background-size: 18px 24px;
          }
          span {
            font-size: 45px;
          }
        }
      }
      .slide {
        margin-top: 22px;
        margin-bottom: 15px;
        .range-num {
          width: 100%;
          color: #999;
          font-size: 13px;
        }
        .select-month {
          display: flex;
          width: 100%;
          margin-top: 15px;
          justify-content: space-between;
          button {
            width: 88px;
            height: 30px;
            color: $main-color;
            font-size: 15px;
            border: 1px solid $main-color;
            background-color: #fff;
            &.active {
              color: #fff;
              background-color: $main-color;
            }
          }
        }
      }
    }

    .loan-btn {
      width: 100%;
      height: 48px;
      color: #fff;
      font-size: 18px;
      border-radius: 6px;
      background-color: $main-color;
    }
  }
</style>
