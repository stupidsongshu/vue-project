<template>
  <div>
    <el-breadcrumb separator="/" class="big-title">
      <el-breadcrumb-item :to="{name:'user-info'}">个人资料</el-breadcrumb-item>
      <el-breadcrumb-item>修改基本信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-loading="loading">
      <el-row class="padding-top-50" style="width:550px;padding-left:90px;">
        <el-form :model="clientForm" label-width="110px" ref="clientForm" :rules="clientFormRules">
          <el-col>
            <el-form-item label="客户电话 :" class="margin-bottom-20">
              <el-input v-model="clientForm.telephone" class="width--100" placeholder="请输入客户电话"></el-input>
            </el-form-item>
            <el-form-item label="客户传真 :" class="margin-bottom-20">
              <el-input v-model="clientForm.faxNumber" class="width--100" placeholder="请输入客户传真"></el-input>
            </el-form-item>
            <el-form-item label="所在地区 :" class="margin-bottom-20" required>
              <el-row>
                <el-col :span="8">
                  <el-form-item prop="provinceId">
                    <el-select placeholder="请选择省" v-model="clientForm.provinceId" @change="onProvinceChange"
                               style="width:90%">
                      <el-option v-for="item in provinceArray" :key="item.provinceName" :label="item.provinceName"
                                 :value="item.provinceId"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="cityId">
                    <el-select placeholder="请选择市" v-model="clientForm.cityId" @change="onCityChange" style="width:90%">
                      <el-option v-for="item in cityArray" :key="item.cityName" :label="item.cityName"
                                 :value="item.cityId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="countyId">
                    <el-select placeholder="请选择区" v-model="clientForm.countyId" clearable>
                      <el-option v-for="item in countyArray" :key="item.countyName" :label="item.countyName"
                                 :value="item.countyId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="详细地址 :" class="margin-bottom-20" prop="detailAddress">
              <el-input v-model="clientForm.detailAddress" class="width--100" placeholder="请输入客户详细地址"></el-input>
            </el-form-item>
            <el-form-item label="促销负责人邮箱 :" class="margin-bottom-20" prop="contactEmail">
              <el-input v-model="clientForm.contactEmail" class="width--100" placeholder="请输入促销负责人邮箱"></el-input>
            </el-form-item>
            <el-form-item label="验证码 :" class="margin-bottom-20" prop="verifyCode">
              <el-col :span="15">
                <el-input v-model="clientForm.verifyCode" class="header-nav-login-input" placeholder="请输入验证码"
                          type="text"></el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="default" size="mini" @click.native="getVerifyCode" :disabled="disableSendBtn">获取验证码 {{countDownText}}</el-button>
              </el-col>
              <el-col :span="24" class="padding-top-10">
                <span class="color-gray">提示:验证码将发送到{{maskedMobile}}</span>
              </el-col>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="padding-top-50 text-align-center">
        <el-button class="margin-right-20" @click="goToWeb('user-info')">返回</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  import {tokenUtils, commonUtils} from '../../../utils'
  export default{
    mounted() {
      this.getClientInfo();
      this.$store.dispatch('dict_a_provinceData');
    },
    computed: {
      ...mapState({
        provinceArray: state => state.dict.provinceArray,
        cityArray: state => state.dict.cityArray,
        countyArray: state => state.dict.countyArray,
      }),
      ...mapGetters({}),
      countDownText() {
        return this.countDownIndex > 0 ? '(' + this.countDownIndex + ')' : ''
      },
      maskedMobile(){
        if (!!this.contactMobile) {
          return this.contactMobile.substring(0, 3) + '****' + this.contactMobile.substring(7)
        }
      }
    },
    data(){
      return {
        clientFormRules: {
          provinceId: [
            {required: true, message: '请输入省', trigger: 'change'},
          ],
          cityId: [
            {required: true, message: '请输入市', trigger: 'change'},
          ],
          countyId: [
//            {required: true, message: '请输入区', trigger: 'blur'},
          ],
          detailAddress: [
            {required: true, message: '请输入客户地址', trigger: 'blur'},
          ],
          contactEmail: [
            {required: true, message: '请输入促销负责人邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入正确的促销负责人邮箱', trigger: 'blur'},
          ],
          verifyCode: [
            {required: true, message: '验证码不能为空', trigger: 'blur'},
          ],
        },
        clientForm: {
          provinceId: '',
          cityId: '',
          countyId: '',
          verifyCode: '',
        },
        disableSendBtn: false,
        countDownIndex: 0,
        contactMobile: '',
        loading: false,
      }
    },

    methods: {
      getClientInfo(){
        this.loading = true;
        this.$store.dispatch('user_a_getClientInfo').then((response) => {
          if (response.data.resultCode == 0) {
            this.clientForm.clientId = response.data.resultData.clientInfo.clientId || '';
            this.clientForm.telephone = response.data.resultData.clientInfo.telephone || '';
            this.clientForm.faxNumber = response.data.resultData.clientInfo.faxNumber || '';
            this.clientForm.provinceId = response.data.resultData.clientInfo.provinceId || '';
            this.clientForm.cityId = response.data.resultData.clientInfo.cityId || '';
            this.clientForm.countyId = response.data.resultData.clientInfo.countyId || '';
            this.clientForm.detailAddress = response.data.resultData.clientInfo.detailAddress || '';
            this.clientForm.contactEmail = response.data.resultData.clientInfo.contactEmail || '';
            this.contactMobile = response.data.resultData.clientInfo.contactMobile || '';
            this.initDistrictData(this.clientForm.provinceId, this.clientForm.cityId, this.clientForm.countyId)
            this.loading = false;
          } else {
            this.loading = false;
          }
        }, () => {
          this.loading = false;
        })
      },
      goToWeb(name){
        this.$router.push({name: name});
      },
      initDistrictData(provinceId, cityId, countyId) {
        this.clientForm.provinceId = provinceId
        this.$store.dispatch('dict_a_provinceData').then(() => {
          let provinceCode = this.findProvinceCodeById(provinceId)
          this.$store.dispatch('dict_a_cityData', {params: {provinceCode: provinceCode}})
            .then(() => {
              this.clientForm.cityId = cityId
              let cityCode = this.findCityCodeById(cityId)
              this.$store.dispatch('dict_a_countyData', {params: {cityCode: cityCode}})
                .then(() => {
                  if (!countyId || countyId === '0') {
                    this.clientForm.countyId = ''
                  } else {
                    this.clientForm.countyId = countyId
                  }
                })
            })
        })
      },
      findProvinceCodeById(provinceId) {
        let provinceCode = ''
        for (let item in this.provinceArray) {
          if (this.provinceArray[item].provinceId === provinceId) {
            provinceCode = this.provinceArray[item].provinceCode
          }
        }
        return provinceCode
      },
      findCityCodeById(cityId) {
        let cityCode = '';
        for (let item in this.cityArray) {
          if (this.cityArray[item].cityId == cityId) {
            cityCode = this.cityArray[item].cityCode
          }
        }
        return cityCode
      },

      onProvinceChange(provinceId){
        this.clientForm.cityId = '';
        let provinceCode = this.findProvinceCodeById(provinceId);
        this.$store.dispatch('dict_a_cityData', {params: {provinceCode: provinceCode}})
      },
      onCityChange(cityId){
        this.clientForm.countyId = '';
        let cityCode = this.findCityCodeById(cityId);
        this.$store.dispatch('dict_a_countyData', {params: {cityCode: cityCode}});
      },
      submit(){
        this.$refs.clientForm.validate((valid) => {
          if (valid) {
            let clientInfo = {
              clientId: this.clientForm.clientId,
              telephone: this.clientForm.telephone,
              faxNumber: this.clientForm.faxNumber,
              provinceId: this.clientForm.provinceId,
              cityId: this.clientForm.cityId,
              countyId: this.clientForm.countyId,
              detailAddress: this.clientForm.detailAddress,
              contactEmail: this.clientForm.contactEmail,
            };
            let params = {
              clientInfo: clientInfo,
              verifyCode: this.clientForm.verifyCode,
            }
            this.$store.dispatch('user_a_updateClientGeneralInfo', {params: params})
              .then((response) => {
                  if (response.data.resultCode == 0) {
                    this.$message.success('基本信息修改成功');
                    this.$router.push({name: 'user-info'});
                  }
                }
              );
          } else {
            return false;
          }
        });
      },
      getVerifyCode(){
        this.$store.dispatch('user_a_updateClientGeneralVerifyCode').then((response) => {
            if (response.body.resultCode == 0) {
              this.countDownIndex = 60;
              this.disableSendBtn = true;
              this.countDown();
            }
          }
        );
      },
      countDown () {
        this.countDownIndex = 60
        let _vm = this
        let timer = setInterval(() => {
          _vm.countDownIndex--
          if (_vm.countDownIndex === 0) {
            _vm.disableSendBtn = false
            clearInterval(timer)
          }
        }, 1000)
      },
    },
  }
</script>
<style>
</style>