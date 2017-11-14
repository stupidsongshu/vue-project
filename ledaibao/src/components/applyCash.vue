<template>
  <div>
    <mt-header fixed class="header" title="取现申请">
      <!--<router-link to="/" slot="left">-->
        <div slot="left"><mt-button icon="back" @click="back"></mt-button></div>
      <!--</router-link>-->
    </mt-header>

    <div class="withdraw">
      <div class="clearfix" style="width: 100%;">
        <div class="pull-left withdraw-amount">2000.00</div>
        <router-link to="/applyDeal">
          <mt-button class="withdraw-btn pull-right">提现</mt-button>
        </router-link>
      </div>
      <div class="withdraw-txt">本次提现金额</div>
    </div>

    <div class="form">
      <div class="form-hint">将提现到您的工商银行卡（尾号1669）</div>
      <div class="form-item" @click="selectPurpose">
        <label class="icon">用途：</label>
        <input type="text" placeholder="请选择用途" readonly v-model="purpose">
        <label class="form-item-right more"></label>
      </div>
      <div class="form-item">
        <label class="icon">验证码：</label>
        <input type="text" placeholder="请输入验证码">
        <label class="form-item-right" @click="getCode">获取验证码</label>
      </div>
      <div class="agreement">
        <input id="agreement" type="checkbox" checked>
        <label for="agreement">我同意并知晓</label>
        <router-link to="/">《借款补充协议》</router-link>
      </div>
    </div>

    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="bottom"
      modal="false"
      closeOnClickModal="false">
      <div class="picker-nav">
        <div>请选择用途</div>
        <div @click="ensure">确定</div>
      </div>
      <mt-picker :slots="yearSlot" @change="onChange" :visible-item-count="3"></mt-picker>
    </mt-popup>

    <div class="plan-table">
      <div class="title">还款计划表：</div>
      <div class="plan-hint">期限内提前还款，按实际借款天数收取利息</div>
      <div class="plan-nav clearfix">
        <div class="pull-left plan-periods">期数</div>
        <div class="pull-left plan-detail">详情</div>
        <div class="pull-left plan-amount">还款金额</div>
      </div>

      <div class="plan-list">
        <div class="plan-periods">1期</div>
        <div class="plan-detail">
          <div>时间：2017/10/20</div>
          <div>本金：3000</div>
          <div>利息：0.06</div>
        </div>
        <div class="plan-amount">691.14</div>
      </div>
      <div class="plan-list">
        <div class="plan-periods">2期</div>
        <div class="plan-detail">
          <div>时间：2017/10/20</div>
          <div>本金：3000</div>
          <div>利息：0.06</div>
        </div>
        <div class="plan-amount">691.14</div>
      </div>
      <div class="plan-list">
        <div class="plan-periods">3期</div>
        <div class="plan-detail">
          <div>时间：2017/10/20</div>
          <div>本金：3000</div>
          <div>利息：0.06</div>
        </div>
        <div class="plan-amount">691.14</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        popupVisible: false,
        purpose: '',
        yearSlot: [{
          flex: 1,
          values: ['家装', '婚庆', '旅游', '教育', '汽车周边', '电子数码产品', '医疗', '家用电器', '家具家居', '其他'],
          className: 'slot1'
        }]
      }
    },
    methods: {
      back() {
        this.goback()
      },
      selectPurpose() {
        this.popupVisible = true
      },
      ensure() {
        this.popupVisible = false
      },
      getCode() {},
//      change 事件有两个参数，分别为当前 picker 的 vue 实例和各 slot 被选中的值组成的数组
      onChange(picker, values) {
        this.purpose = values[0]
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

  .withdraw {
    vertical-align: baseline;
    width:100%;
    height: 116px;
    padding: 25px;
    background-color: $main-color;
    .withdraw-amount {
      color: #fff;
      font-size: 34px;
    }
    .withdraw-btn {
      width: 100px;
      height: 32px;
      color: $main-color;
      font-size: 16px;
      border-radius: 5px;
      background-color: #fff;
    }
    .withdraw-txt {
      margin-top: 4px;
      color: #fff;
      font-size: 14px;
    }
  }

  .form {
    width: 100%;
    padding: 0 15px 15px 15px;
    background-color: #d9d9d9;
    .form-hint {
      height: 30px;
      line-height: 30px;
      color: #666;
    }
    .form-item {
      position: relative;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
      input {
        width: 100%;
        height: 51px;
        padding-left: 100px;
        border: 1px solid #f5a393;
        border-radius: 6px;
        color: #999;
        font-size: 17px;
        outline: none;
      }
      .icon {
        position: absolute;
        top: 50%;
        left: 16px;
        transform: translateY(-50%);
      }
      .form-item-right {
        position: absolute;
        top: 50%;
        right: 18px;
        transform: translateY(-50%);
        text-align: right;
        color: $main-color;
        font-size: 15px;
      }
      .more {
        width: 16px;
        height: 8px;
        background-image: url('../assets/img/more.png');
        background-size: 16px 8px;
      }
    }
    .agreement {
      color: #666;
      a {
        color: $main-color;
      }
    }
  }

  .mint-popup {
    width: 100%;
  }
  .picker-nav {
    display: flex;
    justify-content: space-between;
    padding: 5px 15px;
    font-size: 14px;
  }

  .plan-table {
    padding-top: 14px;
    background-color: #fff;
    .title {
      padding: 0 15px;
      color: $main-color;
      font-weight: bold;
      font-size: 18px;
    }
    .plan-hint {
      margin: 6px 0;
      padding: 0 15px;
      color: #666;
      font-size: 14px;
    }
    .plan-nav {
      width: 100%;
      height: 25px;
      padding: 0 25px;
      line-height: 25px;
      background-color: #d9d9d9;
      .plan-periods {
        width: 20%;
      }
      .plan-detail {
        width: 50%;
      }
      .plan-amount {
        width: 30%;
        text-align: right;
      }
    }
    .plan-list {
      display: table;
      width: 100%;
      padding: 0 25px;
      border-bottom: 1px solid #d9d9d9;
      .plan-periods {
        display: table-cell;
        width: 25%;
        vertical-align: middle;
      }
      .plan-detail {
        display: table-cell;
        width: 45%;
        padding: 5px 0;
        vertical-align: middle;
      }
      .plan-amount {
        display: table-cell;
        width: 30%;
        text-align: center;
        vertical-align: middle;
      }
    }
  }
</style>
