<template>
  <div>
    <el-breadcrumb separator="/" class="big-title">
      <el-breadcrumb-item :to="{name:'user-info'}">个人资料</el-breadcrumb-item>
      <el-breadcrumb-item>修改关键信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-loading="loading">
      <el-row class="padding-top-50" style="width:550px;padding-left:90px;">
        <el-form :model="clientForm" label-width="110px" ref="clientForm" :rules="clientFormRules">
          <el-col>
            <el-form-item label="客户名称 :" class="margin-bottom-20" prop="clientName">
              <el-input v-model="clientForm.clientName" class="width--100" placeholder="请输入客户名称"></el-input>
            </el-form-item>
            <el-form-item label="促销负责人 :" class="margin-bottom-20" prop="contactPerson">
              <el-input v-model="clientForm.contactPerson" class="width--100" placeholder="请输入促销负责人"></el-input>
            </el-form-item>
            <el-form-item label="促销负责人手机 :" class="margin-bottom-20" prop="contactMobile">
              <el-input v-model="clientForm.contactMobile" class="width--100" placeholder="请输入促销负责人手机"></el-input>
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
          </el-col>
        </el-form>
      </el-row>
      <div class="padding-top-50 text-align-center">
        <el-button class="margin-right-20" @click="goToWeb('user-info')">返回</el-button>
        <el-button type="primary" @click="updateClientKeyInfo()">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  import {tokenUtils, commonUtils} from '../../../utils'
  import validators from '../../../common/validators.js'
  export default{
    mounted() {
      this.getClientInfo();
    },
    computed: {
      ...mapState({}),
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
        clientFormRules: {
          clientName: [
            {required: true, message: '请输入客户名称', trigger: 'blur'},
          ],
          contactPerson: [
            {required: true, message: '请输入促销负责人', trigger: 'blur'},
          ],
          contactMobile: [
            {required: true, message: '请输入促销负责人手机', trigger: 'blur'},
            {validator: validators.checkMobile, trigger: 'change,blur'}
          ],
        },
        clientForm: {
          clientName: '',
          contactPerson: '',
          contactMobile: '',
          authorizeFileId: '',
        },
        fileList: [],
        loading: false,
      }
    },

    methods: {
      getClientInfo(){
        this.loading = true;
        this.$store.dispatch('user_a_getClientInfo').then((response) => {
          if (response.data.resultCode == 0) {
            this.clientForm.clientId = response.data.resultData.clientInfo.clientId || '';
            this.clientForm.clientName = response.data.resultData.clientInfo.clientName || '';
            this.clientForm.contactPerson = response.data.resultData.clientInfo.contactPerson || '';
            this.clientForm.contactMobile = response.data.resultData.clientInfo.contactMobile || '';
            this.clientForm.authorizeFileId = response.data.resultData.clientInfo.authorizeFileId || '';
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
      updateClientKeyInfo(){
        this.$refs.clientForm.validate((valid) => {
          if (valid) {
            if (this.clientForm.authorizeFileId == '') {
              this.$alert('还未上传授权书图片,无法提交', '提示');
            } else {
              this.loading = true;
              this.$store.dispatch('user_a_updateClientKeyInfo', {params: this.clientForm}).then((response) => {
                if (response.data.resultCode === '0') {
                  this.loading = false;
                  this.$store.commit('user_m_updateUserInfoData', {verifyStatus: '01'})
                  this.$alert('已提交成功,请等待审核结果,审核期间无法下订单', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      this.$router.push({name: 'user-info'});
                    }
                  });
                } else {
                  this.loading = false;
                }
              }, () => {
                this.loading = false;
              });
            }
          } else {
            return false;
          }
        });
      },
      download(){
        this.$refs.clientForm.validate((valid) => {
          if (valid) {
            let token = tokenUtils.getToken(true)
            let targetUrl = this.apiServer + '/client/export/pdf?token=' + token + '&clientName=' + this.clientForm.clientName + '&contactPerson=' + this.clientForm.contactPerson + '&contactMobile=' + this.clientForm.contactMobile
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
//                this.registerForm.authorizeFileId = '';
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

    },
  }
</script>
<style>
</style>