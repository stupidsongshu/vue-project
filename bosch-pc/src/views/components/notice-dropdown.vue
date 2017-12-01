<template>
  <div>
    <span class="header-nav-bg border-radius" @click="goToWeb()">公告</span>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    props: {
      menu: Object,
    },
    mounted() {
      this.getNotice();
    },
    computed: {
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
     }),
    },
    data(){
      return {
        noticeList: [],
      }
    },
    methods: {
      goToWeb(){
        if (this.noticeList.length === 0) {
          this.$message.error('暂无公告')
        } else {
          this.$router.push({name: 'notice-text', params: {noticeId: this.noticeList[0].noticeId}})
        }
      },
      getNotice(){
        this.$store.dispatch('logged_a_queryNoticeList').then((response) => {
            if (response.data.resultCode == 0) {
              this.noticeList = response.data.resultData.noticeList || [];
            }
          }
        )
      },
    }
  }
</script>
<style>
</style>