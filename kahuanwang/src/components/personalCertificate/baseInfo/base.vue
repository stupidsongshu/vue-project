<template>
  <div>
    <mt-header fixed class="header" title="个人认证">
      <router-link to="" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <pc-nav-header :curProgress="3"></pc-nav-header>

    <div class="residence">
      <div class="input-item" @click="showResidence">
        <div class="input-item-l">
          <span class="name">居住地</span>
          <!--<input class="input" type="text" placeholder="请选择" readonly v-model="selectedCity">-->
          <span class="color999">{{residenceCity || '请选择居住地所在城市'}}</span>
        </div>
        <div class="input-item-r">
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <div class="input-item">
        <div class="input-item-l">
          <span class="name">详细地址</span>
          <input class="input" type="text" placeholder="详细居住地址（精确到门牌号）">
        </div>
      </div>
    </div>

    <div class="input-item" @click="showWork">
      <div class="input-item-l">
        <span class="name">工作地址</span>
        <!--<input class="input" type="text" placeholder="请选择" readonly v-model="selectedCity">-->
        <span class="color999">{{workCity || '请选择工作城市'}}</span>
      </div>
      <div class="input-item-r">
        <i class="fa fa-angle-right"></i>
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-l">
        <span class="name">单位名称</span>
        <input class="input" type="text" placeholder="填写工作单位（公司、实体店铺等）">
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-l">
        <span class="name">单位电话</span>
        <input class="input" type="text" placeholder="填写单位电话">
      </div>
    </div>

    <div class="input-item-hint">
      <div>
        <span class="icon-caution"></span><span>详细、真实的信息可加快审核，提高额度</span>
      </div>
      <div class="arrow-wrapper">
        <router-link to="/writeStandard" style="color: #daab5b;">填写规范</router-link> <span class="fa fa-angle-right arrow-right"></span>
      </div>
    </div>

    <div class="loan-btn">
      <mt-button class="btn" @click="submit">提交</mt-button>
    </div>

    <vue-city-picker ref="pickerResidence" @select="selectResidence" :title="titleResidence" :cancel-txt="cancelTxtResidence" :confirm-txt="confirmTxtResidence"></vue-city-picker>
    <vue-city-picker ref="pickerWork" @select="selectWork" :title="titleWork" :cancel-txt="cancelTxtWork" :confirm-txt="confirmTxtWork"></vue-city-picker>
  </div>
</template>

<script type="text/ecmascript-6">
  import pcNavHeader from '../../common/pcNavHeader'
  import vueCityPicker from 'vue-city-bspicker'

  export default {
    data() {
      return {
        titleResidence: '选择居住地',
        cancelTxtResidence: '取消',
        confirmTxtResidence: '确定',
        residenceCity: '',
        titleWork: '选择居住地',
        cancelTxtWork: '取消',
        confirmTxtWork: '确定',
        workCity: ''
      }
    },
    components: {
      pcNavHeader,
      vueCityPicker
    },
    methods: {
      showResidence() {
        this.$refs['pickerResidence'].show()
      },
      selectResidence() {
        console.log(arguments)
        this.residenceCity = arguments[2][0] + ' ' + arguments[2][1] + ' ' + arguments[2][2]
      },
      showWork() {
        this.$refs['pickerWork'].show()
      },
      selectWork() {
        console.log(arguments)
        this.workCity = arguments[2][0] + ' ' + arguments[2][1] + ' ' + arguments[2][2]
      },
      submit() {}
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/css/identity/personalCertificate.styl'

  .residence
    margin: 12px 0
</style>
