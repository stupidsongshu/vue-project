<template>
  <div>
    <mt-header fixed class="header" title="乐贷款">
      <!--<router-link to="/" slot="left">-->
        <div slot="left"><mt-button icon="back" @click="back"></mt-button></div>
      <!--</router-link>-->
    </mt-header>

    <deal-banner :title="title" :isShow="isShow"></deal-banner>

    <div class="principalInterest">
      <div class="principal">
        <div class="amount">500.0</div>
        <div class="text">本金</div>
      </div>
      <div class="interest">
        <div class="amount">0.09元</div>
        <div class="text">
          当前利息<span class="calc-rate"></span>
        </div>
      </div>
    </div>

    <ul class="wrapper">
      <li class="item">
        还款借记卡：尾号3225
        <span class="modify">修改</span>
      </li>
      <li class="item">开户银行：招商银行</li>
      <li class="item">提前还款违约金：0.00元</li>
    </ul>

    <div class="btn-group">
      <router-link to="/repaymentDeal">
        <mt-button class="loan-btn">立即还款</mt-button>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import dealBanner from './common/dealBanner.vue'

  export default {
    data() {
      return {
        title: '当前应还金额',
        isShow: true
      }
    },
    components: {
      dealBanner
    },
    methods: {
      back() {
        this.goback()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../assets/sass/base.sass';

  .header {
    color: #333;
    background-color: #fff;
  }

  .principalInterest {
    display: flex;
    width: 100%;
    height: 60px;
    padding: 8px 0;
    background-color: #fff;
    .principal, .interest {
      flex: 1;
      line-height: 24px;
      text-align: center;
      .amount {
        font-size: 17px;
        color: $main-color;
      }
      .text {
        font-size: 14px;
        color: #666;
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
    }
    .principal {
      border-right: 1px solid #b7b7b7;
    }
  }

  .wrapper {
    margin: 5px 0 21px 0;
    .item {
      width: 100%;
      height: 52px;
      padding: 0 20px;
      line-height: 52px;
      font-size: 15px;
      color: #666;
      border-bottom: 1px solid #efefef;
      background-color: #fff;
      .modify {
        float: right;
        color: $main-color;
      }
    }
  }

  .btn-group{
    padding: 0 15px;
    .loan-btn {
      width: 100%;
      height: 48px;
      color: #fff;
      font-size: 21px;
      border-radius: 6px;
      background-color: $main-color;
    }
  }
</style>
