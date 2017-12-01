<template>
  <div>
    <el-form ref="registerForm" :model="registerForm" label-width="110px" :rules="registerFormRules">
      <el-form-item label="客户名称 :" class="margin-bottom-20" prop="clientName">
        <el-input v-model="registerForm.clientName" class="width--100" placeholder="请输入客户名称(公司名称)"></el-input>
      </el-form-item>
      <el-form-item label="客户电话 :" class="margin-bottom-20">
        <el-input v-model="registerForm.telephone" class="width--100" placeholder="请输入客户电话"></el-input>
      </el-form-item>
      <el-form-item label="客户传真 :" class="margin-bottom-20">
        <el-input v-model="registerForm.faxNumber" class="width--100" placeholder="请输入客户传真"></el-input>
      </el-form-item>
      <el-form-item label="所在地区 :" class="margin-bottom-20" required>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="provinceId">
              <el-select placeholder="请选择省" v-model="registerForm.provinceId" @change="getProvinceName"
                         style='width:90%'>
                <el-option v-for="item in provinceArray" :key="item.provinceName" :label="item.provinceName"
                           :value="item.provinceId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="cityId">
              <el-select placeholder="请选择市" v-model="registerForm.cityId" style='width:90%' @change="getCityName">
                <el-option v-for="item in cityArray" :key="item.cityName" :label="item.cityName"
                           :value="item.cityId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="countyId">
              <el-select placeholder="请选择区" v-model="registerForm.countyId" @change="getCountyName" clearable>
                <el-option v-for="item in countyArray" :key="item.countyName" :label="item.countyName"
                           :value="item.countyId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="详细地址 :" class="margin-bottom-20" prop="detailAddress">
        <el-input v-model="registerForm.detailAddress" class="width--100" placeholder="请输入客户详细地址"></el-input>
      </el-form-item>
      <el-form-item label="促销负责人 :" class="margin-bottom-20" prop="contactPerson">
        <el-input v-model="registerForm.contactPerson" class="width--100" placeholder="请输入促销负责人"></el-input>
      </el-form-item>
      <el-form-item label="促销负责人手机 :" class="margin-bottom-20" prop="contactMobile">
        <el-input v-model="registerForm.contactMobile" class="width--100"
                  placeholder="请输入促销负责人手机"></el-input>
      </el-form-item>
      <el-form-item label="促销负责人邮箱 :" class="margin-bottom-20" prop="contactEmail">
        <el-input v-model="registerForm.contactEmail" class="width--100" placeholder="请输入促销负责人邮箱"></el-input>
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
      <div class="text-align-center padding-bottom-20">
        <el-button class="header-nav-login-button" type="primary" :loading="loading" @click="register">提交审核</el-button>
      </div>
    </el-form>
  </div>
</template>
<style>
</style>
<script type="text/ecmascript-6">
  import {mapGetters, mapState} from 'vuex'
  import {tokenUtils, commonUtils} from '../../utils'
  import validators from '../../common/validators.js'
  export default{
    components: {},
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
    data () {
      return {
        registerFormRules: {
          clientName: [
            {required: true, message: '请输入客户名称(公司名称)', trigger: 'blur'},
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
        registerForm: {
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
        loading: false,
        fileList: [],
        file: '',
        disabled: true,
      }
    },
    methods: {
      register(){
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            if (this.registerForm.authorizeFileId == '') {
              this.$alert('还未上传授权书图片,无法提交', '提示');
            } else {
              this.$store.dispatch('user_a_registerSubmit', {params: this.registerForm}).then((response) => {
                if (response.data.resultCode === '0') {
                  this.$alert('已提交成功,请等待审核,若审核成功则有短信提示', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      this.$router.push({name: 'home'});
                    }
                  });
                }
              });
            }
          } else {
            return false;
          }
        });
      },
      getProvinceName(){
        this.registerForm.cityId = '';
        let provinceCode = '';
        for (let item in this.provinceArray) {
          if (this.provinceArray[item].provinceId == this.registerForm.provinceId) {
            provinceCode = this.provinceArray[item].provinceCode
            this.registerForm.provinceName = this.provinceArray[item].provinceName;
          }
        }
        this.$store.dispatch('dict_a_cityData', {params: {provinceCode: provinceCode}});
      },
      getCityName(){
        this.registerForm.countyId = '';
        let cityCode = '';
        for (let item in this.cityArray) {
          if (this.cityArray[item].cityId == this.registerForm.cityId) {
            cityCode = this.cityArray[item].cityCode;
            this.registerForm.cityName = this.cityArray[item].cityName;
          }
        }
        this.$store.dispatch('dict_a_countyData', {params: {cityCode: cityCode}});
      },
      getCountyName(){
        for (let item in this.countyArray) {
          if (this.countyArray[item].countyId == this.registerForm.countyId) {
            this.registerForm.countyName = this.countyArray[item].countyName;
          }
        }
      },
      download(){
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            let targetUrl = this.apiServer + '/register/export/pdf?clientName=' + this.registerForm.clientName + '&telephone=' + this.registerForm.telephone + '&faxNumber=' + this.registerForm.faxNumber + '&detailAddress=' + this.registerForm.detailAddress + '&contactPerson=' + this.registerForm.contactPerson + '&contactMobile=' + this.registerForm.contactMobile + '&contactEmail=' + this.registerForm.contactEmail + '&provinceName=' + (this.registerForm.provinceName || '') + '&cityName=' + (this.registerForm.cityName || '') + '&countyName=' + (this.registerForm.countyName || '')
            window.open(targetUrl);
          } else {
            this.$alert('请将上方资料填完整才可下载授权书文件', '提示');
          }
        });
      },
      handleUploadSuccess(response, file) {
        if (response.resultCode == '0') {
          this.registerForm.authorizeFileId = response.resultData.fileDTO.fileId;
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
//                this.registerForm.authorizeFileId = '';
//                this.fileList.pop();
//                this.$refs.fileUploadControl.clearFiles();
//              }
//            }, () => {
//            })
//        }
        this.registerForm.authorizeFileId = '';
        this.fileList.pop();
        this.$refs.fileUploadControl.clearFiles();
      },
    }
  }
</script>
