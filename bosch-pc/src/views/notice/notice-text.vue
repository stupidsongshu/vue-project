<template>
  <div v-loading="loading">
    <el-row>
      <el-col class="padding-right-20">
        <span class="big-title">{{noticeInfo.noticeTitle}}</span>
      </el-col>
      <div style="padding:30px 20px 0 0">
        <div v-html="noticeInfo.noticeContent" style="max-width:100%;overflow: hidden;line-height:25px;"
             class="ql-editor"></div>
        <p v-if="!!noticeInfo.fileUri&&noticeInfo.fileUri!==''">下载附件 : <a :href="fileServer + noticeInfo.fileUri"
                                                                          class="hover" target="_blank"
                                                                          style="text-decoration:none;">{{noticeInfo.fileName}}</a>
        </p>
      </div>
    </el-row>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    mounted() {
      this.noticeId = this.$route.params.noticeId;
      this.getNotice();
    },
    computed: {
      ...mapGetters({
        fileServer: 'config_g_fileServer',
      }),
    },
    data(){
      return {
        noticeId: '',
        noticeInfo: {},
        loading: false,
      }
    },
    methods: {
      getNotice(){
        this.loading = true;
        this.$store.dispatch('logged_a_getNoticeInfo', {params: this.noticeId}).then((response) => {
          this.loading = false;
          if (response.data.resultCode == 0) {
            this.noticeInfo = response.data.resultData.noticeInfo;
          }
        },()=>{
          this.loading = false;
        })
      },
    },
    watch: {
      '$route'(to, from)
      {
        this.noticeId = this.$route.params.noticeId;
        this.getNotice();
      }
    }
  }
</script>
<style>
</style>