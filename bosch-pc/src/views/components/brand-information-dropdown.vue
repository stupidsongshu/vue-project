<template>
  <div>
    <span class="header-nav-bg border-radius" @click="goToWeb()">品牌资讯</span>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    props: {
      menu: Object,
    },
    mounted() {
      this.getBrandInfoList();
    },
    computed: {
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
      }),
    },
    data(){
      return {
        brandInfoList: [],
      }
    },
    methods: {
      getBrandInfoList(){
        this.$store.dispatch('websitie_a_getBrandInfoList').then((response) => {
            if (response.data.resultCode == 0) {
              this.brandInfoList = response.data.resultData.brandInfoList;
            }
          }
        )
      },
      goToWeb(){
        if (this.brandInfoList.length === 0) {
          this.$message.error('暂无品牌资讯')
        } else {
          this.$router.push({name: 'brand-information-text', params: {noticeId: this.brandInfoList[0].noticeId}})
        }
      },
    }
  }
</script>
<style>
</style>