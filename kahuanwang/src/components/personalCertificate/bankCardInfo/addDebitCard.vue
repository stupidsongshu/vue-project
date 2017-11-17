<template>
  <div>
    <mt-header fixed class="header" title="添加借记卡">
      <router-link to="" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="input-item" style="margin-top: 17px;">
      <div class="input-item-l">
        <span class="name">卡片类型</span>
        <span>借记卡</span>
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-l">
        <span class="name">借记卡号</span>
        <input class="input" type="number" placeholder="借记卡号">
      </div>
      <div class="input-item-r">
        <i class="fa fa-angle-right"></i>
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-l">
        <span class="name">开户银行</span>
        <!--<input class="input" type="text" placeholder="请选择">-->
        <span class="color999">请选择</span>
      </div>
      <div class="input-item-r">
        <i class="fa fa-angle-right"></i>
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-l">
        <span class="name">开户城市</span>
        <!--<input class="input" type="number" placeholder="请选择">-->
        <span class="color999">请选择</span>
      </div>
      <div class="input-item-r">
        <i class="fa fa-angle-right"></i>
      </div>
    </div>

    <div class="input-item-hint">
      <span class="icon-caution"></span><span>请绑定常用借记卡，用于还款，绑定不会产生费用</span>
    </div>

    <div class="loan-btn">
      <mt-button class="btn" @click="addDebitCard">添加借记卡</mt-button>
    </div>

    <div class="warm-prompt">
      <span class="title">温馨提示：<span style="color: #f00;">当前仅支持以下银行</span>，请勿绑定其他银行</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      addDebitCard() {
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/css/identity/personalCertificate.styl'

  .warm-prompt
    padding: 0 15px
    color: #999
    font-size: 12px
    .title
      display: block
      height: 37px
      line-height: 37px
      border-bottom: 1px solid #999
</style>
