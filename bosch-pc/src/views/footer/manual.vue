<template>
  <div>
    <el-row>
      <el-col class="padding-right-20">
        <span class="big-title">用户手册</span>
      </el-col>
      <div class="padding-top-50">
          下载文件:<a :href="file" target="_blank" style="text-decoration:none;" class="hover">博世易加网操作指南.pdf</a>
      </div>
    </el-row>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  export default{
    data(){
      return {
        file: require('../../assets/files/博世易加网操作指南.pdf'),
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