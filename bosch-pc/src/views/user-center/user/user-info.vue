<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 3px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 16px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }

  .avatar {
    width: 60px;
    height: 60px;
    display: block;
  }
</style>
<template>
  <div>
    <el-breadcrumb separator="/" class="big-title">
      <el-breadcrumb-item>个人资料</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-loading="loading">
      <el-row class="padding-top-10 padding-bottom-10">
        <el-col :span="12">
          <el-row>
            <el-col :span="4" style="line-height:60px;color:#48576a;margin-left:45px">用户头像 :</el-col>
            <el-col :span="14">
              <el-upload class="avatar-uploader"
                         :action="fileUploadTarget"
                         :headers="uploadHeaders"
                         name="file"
                         :show-file-list="false"
                         :on-success="handleAvatarSuccess"
                         :before-upload="beforeAvatarUpload">
                <img v-if="!!clientForm.avatarImageUri" :src="getImageUrl(clientForm.avatarImageUri)" class="avatar">
                <i class="el-icon-plus avatar-uploader-icon" v-else></i>
              </el-upload>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row style="line-height:60px;color:#48576a;">
            <el-col :span="4" style="margin-left:45px">审核状态 :</el-col>
            <el-col :span="14" class="color-black padding-left-4 color-red"> {{getClientVerifyStatus}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-form :model="clientForm" label-width="90px">
          <el-col :span="12">
            <el-form-item label="客户名称 :" class="margin-bottom-10">{{clientInfo.clientName}}</el-form-item>
            <el-form-item label="渠道 :" class="margin-bottom-10">{{clientInfo.channelName}}</el-form-item>
            <el-form-item label="促销负责人 :" class="margin-bottom-10">{{clientInfo.contactPerson}}</el-form-item>
            <el-form-item label="负责人Email :" class="margin-bottom-10">{{clientInfo.contactEmail}}</el-form-item>
            <el-form-item label="客户电话 :" class="margin-bottom-10">{{clientInfo.telephone}}</el-form-item>
            <el-form-item label="客户传真 :" class="margin-bottom-10">{{clientInfo.faxNumber}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户编码 :" class="margin-bottom-10">{{clientInfo.clientCode}}</el-form-item>
            <el-form-item label="区域 :" class="margin-bottom-10">{{clientInfo.areaName}}</el-form-item>
            <el-form-item label="负责人手机 :" class="margin-bottom-10">{{clientInfo.contactMobile}}</el-form-item>
            <el-form-item label="省市区 :" class="margin-bottom-10">
              {{(clientInfo.provinceName || '') + (clientInfo.cityName || '') + (clientInfo.countyName || '')}}
            </el-form-item>
            <el-form-item label="详细地址 :" class="margin-bottom-10">{{clientInfo.detailAddress}}</el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class=" padding-top-50" style="padding-left:200px;">
        <el-button class="margin-right-20" @click="goToWeb('update-general')">修改基本信息</el-button>
        <el-button type="primary" @click="goToWeb('update-key')">修改关键信息</el-button>
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
    },
    computed: {
      ...mapGetters({
        fileUploadTarget: 'config_g_fileUploadTarget',
        fileServer: 'config_g_fileServer'
      }),
      uploadHeaders () {
        return {
          Authorization: 'Bearer ' + tokenUtils.getToken(true)
        }
      },
      getClientVerifyStatus(){
        return this.clientInfo.verifyStatus === '01' ? '待审核' : '已审核'
      }
    },
    data(){
      return {
        clientInfo: {},
        clientForm: {
          avatarImageUri: ''
        },
        loading: false,
      }
    },

    methods: {
      getClientInfo(){
        this.loading = true;
        this.$store.dispatch('user_a_getClientInfo').then((response) => {
          if (response.data.resultCode == 0) {
            this.loading = false;
            this.clientInfo = response.data.resultData.clientInfo;
            this.clientForm.avatarImageUri = this.clientInfo.avatarImageUri || ''
          } else {
            this.loading = false;
          }
        }, () => {
          this.loading = false;
        })
      },
      getImageUrl (imageUri){
        return !!imageUri ? this.fileServer + imageUri : ''
      },
      handleAvatarSuccess(response, file) {
        if (response.resultCode == '0') {
          this.clientForm.avatarImageId = response.resultData.fileDTO.fileId,
            this.clientForm.avatarImageUri = response.resultData.fileDTO.fileUri
          let payload = {
            avatarImageId: this.clientForm.avatarImageId
          }
          this.$store.dispatch('user_a_updateCurrentClientAvatar', payload).then(
            (response) => {
              if (response.data.resultCode == '0') {
                this.$message.success({message: '用户头像上传成功', showClose: true})
              }
            }, () => {
            })
        } else {
          this.$message.error({message: response.resultMsg, showClose: true})
        }
      },
      beforeAvatarUpload(file) {
        return commonUtils.checkImageBeforeUpload(file)
      },
      goToWeb(name){
        this.$router.push({name: name});
      },
    }
  }
</script>
<style>
</style>