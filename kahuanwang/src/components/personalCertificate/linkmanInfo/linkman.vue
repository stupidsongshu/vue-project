<template>
  <div>
    <mt-header fixed class="header" title="个人认证">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <pc-nav-header :curProgress="4"></pc-nav-header>

    <div class="input-item" style="margin-top: 12px;">
      <div class="input-item-l">
        <span class="name">家人</span>
        <!--<input class="input" type="text" placeholder="请选择" readonly v-model="selectedCity">-->
        <span class="color999">{{linkmanFamily || '请选择联系人'}}</span>
      </div>
      <div class="input-item-r">
        <i class="icon-linkman"></i>
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-l">
        <span class="name">朋友</span>
        <!--<input class="input" type="text" placeholder="请选择" readonly v-model="selectedCity">-->
        <span class="color999">{{linkmanFriend || '请选择联系人'}}</span>
      </div>
      <div class="input-item-r">
        <i class="icon-linkman"></i>
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-l">
        <span class="name">同事</span>
        <!--<input class="input" type="text" placeholder="请选择" readonly v-model="selectedCity">-->
        <span class="color999">{{linkmanColleague || '请选择联系人'}}</span>
      </div>
      <div class="input-item-r">
        <i class="icon-linkman"></i>
      </div>
    </div>

    <div class="loan-btn">
      <mt-button class="btn" @click="submit">提交</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import pcNavHeader from '../../common/pcNavHeader'

  export default {
    data() {
      return {
        linkmanFamily: '',
        linkmanFriend: '',
        linkmanColleague: ''
      }
    },
    components: {
      pcNavHeader
    },
    methods: {
      back() {
        this.goback()
      },
      submit() {
        /**
         * contactName 联系人姓名
         * contactPhone 联系人电话
         * contactRelation 关系（4家人 6朋友 7同事）
         * app.EmContact(contactName1, contactPhone1, contactRelation1,contactName2, contactPhone2, contactRelation2,contactName3,contactPhone3,contactRelation3)
         */
        this.app.EmContact()
        this.app.EmContactCallBack = function(json) {
          json = JSON.parse(json)
          console.log(json)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/css/identity/personalCertificate.styl'

  .icon-linkman
    display: inline-block
    width: 20px
    height: 21px
    background: url("../../../assets/img/icon_linkman.png") no-repeat
    background-size: 20px 21px
</style>
