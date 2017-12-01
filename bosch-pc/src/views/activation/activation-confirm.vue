<template>
  <div>
    <div style="width:400px;margin:0 auto;" v-if="!showForm">
      <el-form :model="clientInfo" label-width="110px">
        <el-form-item label="客户名称 :" class="margin-bottom-20">{{clientInfo.clientName}}</el-form-item>
        <el-form-item label="客户电话 :" class="margin-bottom-20">{{clientInfo.telephone}}</el-form-item>
        <el-form-item label="客户传真 :" class="margin-bottom-20">{{clientInfo.faxNumber}} </el-form-item>
        <el-form-item label="所在地区 :" class="margin-bottom-20">
          {{(clientInfo.provinceName || '') + (clientInfo.cityName || '') + (clientInfo.countyName || '')}}
        </el-form-item>
        <el-form-item label="详细地址 :" class="margin-bottom-20">{{clientInfo.detailAddress}}</el-form-item>
        <el-form-item label="促销负责人 :" class="margin-bottom-20">{{clientInfo.contactPerson}}</el-form-item>
        <el-form-item label="促销负责人手机 :" class="margin-bottom-20">{{clientInfo.contactMobile}}</el-form-item>
        <el-form-item label="促销负责人邮箱 :" class="margin-bottom-20">{{clientInfo.contactEmail}}</el-form-item>
      </el-form>
      <div class="text-align-center padding-top-50">
        <el-button class="margin-right-20" @click="showForm=!showForm">我要修改</el-button>
        <el-button type="primary" @click="next">确认资料</el-button>
      </div>
    </div>
    <div style="width:400px;margin:0 auto;" v-show="!!showForm">
      <el-form ref="clientForm" :model="clientForm" label-width="110px" :rules="clientFormRules">
        <el-form-item label="客户名称 :" class="margin-bottom-20" prop="clientName">
          <el-input v-model="clientForm.clientName" class="width--100" placeholder="请输入客户名称"></el-input>
        </el-form-item>
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
                           style='width:90%'>
                  <el-option v-for="item in provinceArray" :key="item.provinceName" :label="item.provinceName"
                             :value="item.provinceId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="cityId">
                <el-select placeholder="请选择市" v-model="clientForm.cityId" style='width:90%' @change="onCityChange">
                  <el-option v-for="item in cityArray" :key="item.cityName" :label="item.cityName"
                             :value="item.cityId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="countyId">
                <el-select placeholder="请选择区" v-model="clientForm.countyId" @change="onCountyChange" clearable>
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
        <el-form-item label="促销负责人 :" class="margin-bottom-20" prop="contactPerson">
          <el-input v-model="clientForm.contactPerson" class="width--100" placeholder="请输入促销负责人"></el-input>
        </el-form-item>
        <el-form-item label="促销负责人手机 :" class="margin-bottom-20" prop="contactMobile">
          <el-input v-model="clientForm.contactMobile" class="width--100"
                    placeholder="请输入促销负责人手机"></el-input>
        </el-form-item>
        <el-form-item label="促销负责人邮箱 :" class="margin-bottom-20" prop="contactEmail">
          <el-input v-model="clientForm.contactEmail" class="width--100" placeholder="请输入促销负责人邮箱"></el-input>
        </el-form-item>
        <el-form-item label="授权书文件 :" class="margin-bottom-10">
          <span class="pointer hover" @click="download" :disabled="true">下载授权书</span>
        </el-form-item>
        <el-form-item label="上传授权书图片 :" class="margin-bottom-20" required>
          <el-upload
            :action="fileUploadTarget"
            :headers="uploadHeaders"
            name="file"
            :on-success="handleUploadSuccess"
            :before-upload="handleBeforeUpload"
            :on-error="handleUploadFailed"
            :on-preview="handleFilePreview"
            :on-remove="handleFileRemove"
            :file-list="fileList"
            ref="fileUploadControl">
            <el-button size="small" type="primary" class="inline-block">上传授权书图片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="text-align-center padding-top-50">
        <el-button class="margin-right-20" @click="showForm=!showForm">返回</el-button>
        <el-button type="primary" @click="updateClientActivation">提交审核</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapState} from 'vuex'
  import {tokenUtils, commonUtils} from '../../utils'
  import validators from '../../common/validators.js'
  import _ from 'lodash'
  export default{
    mounted() {
      this.getClientInfo();
    },
    computed: {
      ...mapState({
        provinceArray: state => state.dict.provinceArray,
        cityArray: state => state.dict.cityArray,
        countyArray: state => state.dict.countyArray,
      }),
      ...mapGetters({
        fileServer: 'config_g_fileServer',
        apiServer: 'config_g_apiServer',
        fileUploadTarget: 'config_g_fileUploadTargetPublic',
      }),
      uploadHeaders () {
        return {
          Authorization: 'Bearer ' + tokenUtils.getToken(true)
        }
      },
    },
    data(){
      return {
        clientInfo: {},
        clientForm: {
          clientName: '',
          telephone: '',
          faxNumber: '',
          detailAddress: '',
          contactPerson: '',
          contactMobile: '',
          contactEmail: '',
          authorizeFileId: '',
          provinceId: '',
          cityId: '',
          countyId: '',
          provinceName: '',
          cityName: '',
          countyName: '',
        },
        showForm: false,
        fileList: [],
        file: '',
        clientFormRules: {
          clientName: [
            {required: true, message: '请输入客户名称', trigger: 'blur'},
          ],
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
          contactPerson: [
            {required: true, message: '请输入促销负责人', trigger: 'blur'},
          ],
          contactMobile: [
            {required: true, message: '请输入促销负责人手机', trigger: 'blur'},
            {validator: validators.checkMobile, trigger: 'change,blur'}
          ],
          contactEmail: [
            {required: true, message: '请输入促销负责人邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入正确的促销负责人邮箱', trigger: 'blur'},
          ],
          authorizeFileId: [
            {required: true, message: '请上传授权书图片', trigger: 'blur'},
          ],
        },
      }
    },
    methods: {
      getClientInfo(){
        this.$store.dispatch('user_a_getClientInfo').then((response) => {
          if (response.data.resultCode == 0) {
            this.clientInfo = response.data.resultData.clientInfo;
            this.clientForm = {
              clientName: this.clientInfo.clientName || '',
              telephone: this.clientInfo.telephone || '',
              faxNumber: this.clientInfo.faxNumber || '',
              detailAddress: this.clientInfo.detailAddress || '',
              contactPerson: this.clientInfo.contactPerson || '',
              contactMobile: this.clientInfo.contactMobile || '',
              contactEmail: this.clientInfo.contactEmail || '',
              authorizeFileId: this.clientInfo.authorizeFileId || '',
              provinceId: '',
              cityId: '',
              countyId: '',
            }
            this.initDistrictData(this.clientInfo.provinceId, this.clientInfo.cityId, this.clientInfo.countyId)
          }
        })
      },
      next(){
        this.$emit('get', 2)
      },
      updateClientActivation(){
        this.$refs.clientForm.validate((valid) => {
          if (valid) {
            if (this.clientForm.authorizeFileId == '') {
              this.$alert('还未上传授权书图片,无法提交', '提示');
            } else {
              this.$store.dispatch('user_a_updateClientActivationModifyInfo', {params: this.clientForm}).then((response) => {
                if (response.data.resultCode === '0') {
                  this.$alert('已提交成功,请再次等待审核结果,若审核成功则有短信提示', '提示');
                  this.$store.dispatch('user_a_logout').then((response) => {
                    this.$store.commit('user_m_clearUserInfo');
                    this.$router.push({path: '/home'});
                  });
                }
              });
            }
          } else {
            return false;
          }
        });
      },
      initDistrictData(provinceId, cityId, countyId) {
        this.clientForm.provinceId = provinceId
        this.$store.dispatch('dict_a_provinceData').then(() => {
          let provinceCode = this.findProvinceCodeById(provinceId)
//          if(!provinceCode){
//            return
//          }
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
            this.clientForm.provinceName = this.provinceArray[item].provinceName;
          }
        }
        return provinceCode
      },
      findCityCodeById(cityId) {
        let cityCode = '';
        for (let item in this.cityArray) {
          if (this.cityArray[item].cityId == cityId) {
            cityCode = this.cityArray[item].cityCode
            this.clientForm.cityName = this.cityArray[item].cityName;
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
      onCountyChange(countyId){
        for (let item in this.countyArray) {
          if (this.countyArray[item].countyId == countyId) {
            this.clientForm.countyName = this.countyArray[item].countyName;
          }
        }
      },
      download(){
        this.$refs.clientForm.validate((valid) => {
          if (valid) {
            console.log('&detailAddress=' + this.clientForm.detailAddress + '&contactPerson=' + this.clientForm.contactPerson + '&contactMobile=' + this.clientForm.contactMobile + '&contactEmail=' + this.clientForm.contactEmail + '&provinceName=' + (this.clientForm.provinceName || '') + '&cityName=' + (this.clientForm.cityName || '') + '&countyName=' + (this.clientForm.countyName || ''))
            let targetUrl = this.apiServer + '/register/export/pdf?clientName=' + this.clientForm.clientName + '&telephone=' + this.clientForm.telephone + '&faxNumber=' + this.clientForm.faxNumber + '&detailAddress=' + this.clientForm.detailAddress + '&contactPerson=' + this.clientForm.contactPerson + '&contactMobile=' + this.clientForm.contactMobile + '&contactEmail=' + this.clientForm.contactEmail + '&provinceName=' + (this.clientForm.provinceName || '') + '&cityName=' + (this.clientForm.cityName || '') + '&countyName=' + (this.clientForm.countyName || '')
            window.open(targetUrl);
          } else {
            this.$alert('请将上方资料填完整才可下载授权书文件', '提示');
          }
        });
      },
      handleUploadSuccess(response, file) {
        if (response.resultCode == '0') {
          this.clientForm.authorizeFileId = response.resultData.fileDTO.fileId;
          this.fileList.push(file);
        } else {
          this.$message.error({message: response.resultMsg, showClose: true});
          this.$refs.fileUploadControl.clearFiles();
        }
      },
      handleBeforeUpload(file) {
        if (this.fileList.length >= 1) {
          this.$alert('不能上传多个文件', '提示');
          return false;
        } else {
          return commonUtils.checkImageBeforeUpload(file);
        }
      },
      handleUploadFailed(file) {
        this.$message.error({message: '服务器异常，上传失败！', showClose: true});
      },
      handleFilePreview(file){
        window.open(this.fileServer + file.response.resultData.fileDTO.fileUri);
      },
      handleFileRemove(file, fileList) {
//        if (file && file.response) {
//          this.$store.dispatch('file_a_deleteById', {fileId: file.response.resultData.fileDTO.fileId})
//            .then((response) => {
//              if (response.data.resultCode == '0') {
//                this.clientForm.authorizeFileId = '';
//                this.fileList.pop();
//                this.$refs.fileUploadControl.clearFiles();
//              }
//            }, () => {
//            })
//        }
        this.clientForm.authorizeFileId = '';
        this.fileList.pop();
        this.$refs.fileUploadControl.clearFiles();
      },
    }
  }
</script>
<style>
</style>
