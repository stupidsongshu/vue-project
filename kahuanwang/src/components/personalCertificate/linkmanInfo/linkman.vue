<template>
  <div>
    <mt-header fixed class="header" title="个人认证">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <!--<pc-nav-header :curProgress="4"></pc-nav-header>-->

    <div class="input-item" style="margin-top: 12px;">
      <div class="input-item-l">
        <span class="name">家人</span>
        <span class="color999">{{contactName1 || '请选择联系人'}}</span>
      </div>
      <div class="input-item-r" @click="getContacts(4)">
        <i class="icon-linkman"></i>
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-l">
        <span class="name">朋友</span>
        <span class="color999">{{contactName2 || '请选择联系人'}}</span>
      </div>
      <div class="input-item-r" @click="getContacts(6)">
        <i class="icon-linkman"></i>
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-l">
        <span class="name">同事</span>
        <span class="color999">{{contactName3 || '请选择联系人'}}</span>
      </div>
      <div class="input-item-r" @click="getContacts(7)">
        <i class="icon-linkman"></i>
      </div>
    </div>

    <div class="loan-btn">
      <mt-button class="btn" @click="submit">提交</mt-button>
    </div>

    <mt-popup v-model="popupVisible" popup-transition="popup-fade" closeOnClickModal="true">
      <ul>
        <li class="linkman-item" v-for="user in linkmanInfo" @click="getUser(user)">
          <span>{{user.name}}</span>
          <span>{{user.number}}</span>
          <span>{{user.city}}</span>
        </li>
      </ul>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import pcNavHeader from '../../common/pcNavHeader'
  import {Toast} from 'mint-ui'

  export default {
    data() {
      return {
        popupVisible: false,
        linkmanInfo: [],
        /**
         * contactName 联系人姓名
         * contactPhone 联系人电话
         * contactRelation 关系:4家人 6朋友 7同事
         */
        contactRelation: 0,
        contactName1: '',
        contactPhone1: '',
        contactRelation1: '',
        contactName2: '',
        contactPhone2: '',
        contactRelation2: '',
        contactName3: '',
        contactPhone3: '',
        contactRelation3: ''
      }
    },
    components: {
      pcNavHeader
    },
    methods: {
      back() {
        this.goback()
      },
      getContacts(contactRelation) {
        this.popupVisible = true
        this.contactRelation = contactRelation
        this.linkmanInfo = JSON.parse(this.app.getContacts())
      },
      getUser(user) {
        this.popupVisible = false
        if (this.contactRelation === 4) {
          this.contactName1 = user.name
          this.contactPhone1 = user.number
          this.contactRelation1 = this.contactRelation
        }
        if (this.contactRelation === 6) {
          this.contactName2 = user.name
          this.contactPhone2 = user.number
          this.contactRelation2 = this.contactRelation
        }
        if (this.contactRelation === 7) {
          this.contactName3 = user.name
          this.contactPhone3 = user.number
          this.contactRelation3 = this.contactRelation
        }
      },
      submit() {
        /**
         * app.EmContact(contactName1, contactPhone1, contactRelation1,contactName2, contactPhone2, contactRelation2,contactName3,contactPhone3,contactRelation3)
         */
        this.app.EmContact(
          this.contactName1,
          this.contactPhone1,
          this.contactRelation1,
          this.contactName2,
          this.contactPhone2,
          this.contactRelation2,
          this.contactName3,
          this.contactPhone3,
          this.contactRelation3
        )
        this.app.EmContactCallBack = function(json) {
          json = JSON.parse(json)
          console.log(json)
          Toast({
            message: json.Msg,
            duration: 3000
          })
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/css/identity/personalCertificate.styl'

  .icon-linkman
    display: inline-block
    width: 20px
    height: 21px
    background: url("../../../assets/img/icon_linkman.png") no-repeat
    background-size: 20px 21px

  .mint-popup
    width: 88.8%
    max-height: 90%
    padding: 10px
    overflow: scroll
    border-radius: 10px
    .linkman-item
      display: flex
      align-items: center
      width: 100%
      height: 40px
      border-bottom: 1px solid #999
      span
        width: 33.33%
        text-align: center
</style>
