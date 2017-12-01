<style>
  .dialog-size .el-dialog--small{
    width:700px;
  }
</style>

<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="showAddressDialog" :show-close="false" :close-on-press-escape="false"
               :close-on-click-modal="false" class="dialog-size">
      <el-form :model="addressForm" label-width="70px" ref="addressForm" :rules="addressRuls">
        <el-form-item label="所在地区" required>
          <el-row>
            <el-col :span="8">
              <el-form-item prop="provinceId">
                <el-select placeholder="请选择省" v-model="addressForm.provinceId" @change="onProvinceChange"
                           style='width:90%'>
                  <el-option v-for="item in provinceArray" :key="item.provinceName" :label="item.provinceName"
                             :value="item.provinceId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="cityId">
                <el-select placeholder="请选择市" v-model="addressForm.cityId" style='width:90%' @change="onCityChange">
                  <el-option v-for="item in cityArray" :key="item.cityName" :label="item.cityName"
                             :value="item.cityId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="countyId">
                <el-select placeholder="请选择区" v-model="addressForm.countyId" clearable>
                  <el-option v-for="item in countyArray" :key="item.countyName" :label="item.countyName"
                             :value="item.countyId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="详细地址" prop="detailAddress">
          <el-input type="textarea" v-model="addressForm.detailAddress" resize="none"
                    placeholder="建议您如实填写详细收货地址，例如街道名称，门牌号码"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contactPerson">
          <el-input type="text" v-model="addressForm.contactPerson" placeholder="请填写收货人姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactMobile">
          <el-input type="text" v-model="addressForm.contactMobile" placeholder="请填写真实有效的联系电话"></el-input>
        </el-form-item>
        <el-form-item label="验证码 :" class="margin-bottom-20" prop="verifyCode">
          <el-col :span="5" class="padding-right-10">
            <el-input v-model="addressForm.verifyCode" placeholder="验证码"
                      type="text"></el-input>
          </el-col>
          <el-col :span="19">
            <el-button type="default" size="mini" @click.native="getVerifyCode" :disabled="disableSendBtn">获取验证码 {{countDownText}}</el-button>
            <span class="color-gray padding-left-10">提示:验证码将发送到{{maskedMobile}}</span>
          </el-col>
        </el-form-item>
        <el-form-item prop="isDefault">
          <el-checkbox v-model="addressForm.isDefault" :true-label="1" :false-label="0">是否默认为收货地址
          </el-checkbox>
        </el-form-item>
      </el-form>
      <div class="text-align-center">
        <el-button type="default" @click.native="cancel" class="margin-right-20">取 消</el-button>
        <el-button type="primary" @click.native="saveAddress">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters, mapState} from 'vuex'
  import {userUtils} from '../../../../utils'
  import validators from '../../../../common/validators.js'
  export default{
    mounted() {
      this.$store.dispatch('dict_a_provinceData');
    },
    computed: {
      ...mapState({
        provinceArray: state => state.dict.provinceArray,
        cityArray: state => state.dict.cityArray,
        countyArray: state => state.dict.countyArray,
      }),
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
      }),
      countDownText() {
        return this.countDownIndex > 0 ? '(' + this.countDownIndex + ')' : ''
      },
      maskedMobile(){
        if (!!this.userInfo.contactMobile) {
          return this.userInfo.contactMobile.substring(0, 3) + '****' + this.userInfo.contactMobile.substring(7)
        }
      }
    },
    data(){
      return {
        //表单验证规则
        addressRuls: {
          provinceId: [
            {required: true, message: '请选择省', trigger: 'change'}
          ],
          cityId: [
            {required: true, message: '请选择市', trigger: 'change'}
          ],
          countyId: [
//            {required: true, message: '请选择区', trigger: 'change'}
          ],
          detailAddress: [
            {required: true, message: '请输入详细地址', trigger: 'blur'}
          ],
          contactPerson: [
            {required: true, message: '请输入联系人', trigger: 'blur'},
          ],
          contactMobile: [
            {required: true, message: '请输入联系电话', trigger: 'blur'},
            {validator: validators.checkMobile, trigger: 'change,blur'}
          ],
          verifyCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ],
        },
        addressForm: {
          action: 'create',
          companyId: '',
          addressId: '',
          cityId: '',
          provinceId: '',
          countyId: '',
          detailAddress: '',
          contactPerson: '',
          contactMobile: '',
          isDefault: 0,
          verifyCode: '',
        },
        showAddressDialog: false,
        disableSendBtn: false,
        countDownIndex: 0,
        addressId: '',
      }
    },
    methods: {
      showUserAddressDialog(row){
        if (!!row) {
          this.addressForm.action = 'update';
          this.addressForm.contactPerson = row.contactPerson;
          this.addressForm.detailAddress = row.detailAddress;
          this.addressForm.contactMobile = row.contactMobile;
          this.addressForm.addressId = row.addressId;
          this.addressForm.isDefault = row.isDefault;
          this.initDistrictData(row.provinceId, row.cityId, row.countyId)
        } else {
          this.addressForm = {
            action: 'create',
            companyId: '',
            addressId: '',
            cityId: '',
            provinceId: '',
            countyId: '',
            detailAddress: '',
            contactPerson: '',
            contactMobile: '',
            isDefault: 0,
            verifyCode: '',
          }
        }
        this.showAddressDialog = true;
      },
      //上传数据
      addAddress(){
        let addressOperation = '';
        if (this.addressForm.action == 'create') {
          addressOperation = 'user_a_createClientAddress';
        } else if (this.addressForm.action == 'update') {
          addressOperation = 'user_a_updateClientAddress';
        }
        let addressInfo = {
          companyId: this.addressForm.companyId,
          addressId: this.addressForm.addressId,
          cityId: this.addressForm.cityId,
          provinceId: this.addressForm.provinceId,
          countyId: this.addressForm.countyId,
          detailAddress: this.addressForm.detailAddress,
          contactPerson: this.addressForm.contactPerson,
          contactMobile: this.addressForm.contactMobile,
          isDefault: this.addressForm.isDefault,
        };
        let params = {
          addressInfo: addressInfo,
          verifyCode: this.addressForm.verifyCode,
        }
        this.$store.dispatch(addressOperation, {params: params}).then(
          (response) => {
            if (response.data.resultCode == '0') {
              if (this.addressForm.action == 'create') {
                this.$message.success({message: '收货地址新建成功', showClose: true})
              } else if (this.addressForm.action == 'update') {
                this.$message.success({message: '收货地址修改成功', showClose: true})
              }
              this.$refs.addressForm.resetFields();
              this.$emit('refresh',true)
              this.showAddressDialog = false;
            }
          }, () => {
          }
        )
      },
      //添加/修改表单
      saveAddress(){
        this.$refs.addressForm.validate((valid) => {
          if (valid) {
            this.addAddress();
          } else {
            return false;
          }
        })
      },
      //取消表单
      cancel (){
        this.$refs.addressForm.resetFields();
        this.addressForm.isDefault = 0;
        this.showAddressDialog = false;
      },
      getVerifyCode(){
        this.$store.dispatch('user_a_getClientAddressVerifyCode').then((response) => {
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
      initDistrictData(provinceId, cityId, countyId) {
        this.addressForm.provinceId = provinceId
        this.$store.dispatch('dict_a_provinceData').then(() => {
          let provinceCode = this.findProvinceCodeById(provinceId)
          this.$store.dispatch('dict_a_cityData', {params: {provinceCode: provinceCode}})
            .then(() => {
              this.addressForm.cityId = cityId
              let cityCode = this.findCityCodeById(cityId)
              this.$store.dispatch('dict_a_countyData', {params: {cityCode: cityCode}})
                .then(() => {
                  if (!countyId || countyId === '0') {
                    this.addressForm.countyId = ''
                  } else {
                    this.addressForm.countyId = countyId
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
        this.addressForm.cityId = '';
        let provinceCode = this.findProvinceCodeById(provinceId);
        this.$store.dispatch('dict_a_cityData', {params: {provinceCode: provinceCode}})
      },
      onCityChange(cityId){
        this.addressForm.countyId = '';
        let cityCode = this.findCityCodeById(cityId);
        this.$store.dispatch('dict_a_countyData', {params: {cityCode: cityCode}});
      },
    }
  }
</script>
<style>
</style>