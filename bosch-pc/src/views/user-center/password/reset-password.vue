<template>
  <div>
    <el-breadcrumb separator="/" class="big-title">
      <el-breadcrumb-item>修改密码</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="width:400px;margin:0 auto;" class="padding-top-50" v-loading="loading">
      <el-form :model="resetForm" label-width="80px" :rules="resetFormRules" ref="resetForm">
        <el-form-item label="旧密码 :" class="margin-bottom-20" prop="oldPassword">
          <el-input v-model="resetForm.oldPassword" class="header-nav-login-input" placeholder="请输入旧密码"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码 :" class="margin-bottom-20" prop="newPassword">
          <el-input v-model="resetForm.newPassword" class="header-nav-login-input" placeholder="请输入新密码"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码 :" class="margin-bottom-20" prop="newPasswordAgain">
          <el-input v-model="resetForm.newPasswordAgain" class="header-nav-login-input" placeholder="请再次输入新密码"
                    type="password"></el-input>
        </el-form-item>
      </el-form>
      <div style="padding-left:130px;padding-top:30px;">
        <el-button type="primary" @click="submit()">修改密码</el-button>
      </div>
    </div>

  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  import {cryptoUtils} from '../../../utils'
  export default{
    mounted() {
    },
    computed: {},
    data(){
      var checkPassword = (rule, value, callback) => {
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        if (!reg.test(value)) {
          callback(new Error('密码必须由6-20位数字加字母组成'));
        } else {
          callback();
        }
      };
      //检查再次密码是否一致
      var checkPasswordAgain = (rule, value, callback) => {
        if (value !== this.resetForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        resetFormRules: {
          oldPassword: [
            {required: true, message: '请输入旧密码', trigger: 'blur'},
          ],
          newPassword: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {validator: checkPassword, trigger: 'blur,change'},
          ],
          newPasswordAgain: [
            {required: true, message: '请再次输入新密码', trigger: 'blur'},
            {validator: checkPasswordAgain, trigger: 'blur,change'},
          ],
        },
        resetForm: {
          oldPassword: '',
          newPassword: '',
          newPasswordAgain: '',
        },
        loading: false,
      }
    },
    methods: {
      submit(){
        this.$refs.resetForm.validate((valid) => {
          if (valid) {
            let encryptedNewPwd = cryptoUtils.AESEncrypt(this.resetForm.newPassword)
            let encryptedOldPwd = cryptoUtils.AESEncrypt(this.resetForm.oldPassword)
            let payload = {
              oldPassword: encryptedOldPwd,
              newPassword: encryptedNewPwd
            }
            this.loading = true;
            this.$store.dispatch('user_a_resetPassword', {params: payload})
              .then((response) => {
                  if (response.data.resultCode == 0) {
                    this.loading = false;
                    this.$alert('密码修改成功', '提示', {
                      confirmButtonText: '确定',
                      callback: action => {
                        this.$refs.resetForm.resetFields();
                      }
                    });
                  } else{
                    this.loading = false;
                  }
                },()=>{
                this.loading = false;
              });
          } else {
            return false;
          }
        });
      },
    }
  }
</script>
<style>
</style>