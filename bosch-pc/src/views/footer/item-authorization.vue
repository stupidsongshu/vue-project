<template>
  <div>
    <el-row>
      <el-col class="padding-right-20">
        <span class="big-title">授权书</span>
      </el-col>
      <img src="../../assets/images/zhongduanhuodongshouquanshu.png" style="width:630px;"/>
      <div class="text-align-center">
        <el-button type="primary">
          <a :href="authorizationFile" target="_blank" style="color:#fff;text-decoration:none;">下载授权书</a>
        </el-button>
      </div>
    </el-row>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  export default{
    data(){
      return {
        authorizationFile: require('../../assets/files/终端活动承诺书.pdf'),
      }
    },
    computed: {
      ...mapGetters({
        apiServer: 'config_g_apiServer',
      }),
    },
    methods: {}
  }
</script>
<style>
</style>