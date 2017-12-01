<template>
  <div v-loading="loading">
    <el-row>
      <el-col class="padding-right-20">
        <span class="big-title">{{noticeInfo.noticeTitle}}</span>
      </el-col>
      <div style="padding:30px 20px 0 0">
        <div v-html="noticeInfo.noticeContent" style="max-width:100%;overflow: hidden;line-height:25px;"
             class="ql-editor"></div>
      </div>
    </el-row>
  </div>
</template>
<script>
  export default{
    mounted() {
      this.noticeId = this.$route.params.noticeId;
      this.getNotice();
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
        }, () => {
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
