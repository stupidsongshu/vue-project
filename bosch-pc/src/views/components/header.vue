<template>
  <div class="v-width">
    <div class="header-bg clearfix relative">
      <ul class="v-left header-left">          <li v-if="!!userInfo&&!!userInfo.channelImageUri">
            <img :src="getImageUrl(userInfo.channelImageUri)" style="width:68px;height:39px;background-color:white;"/>
          </li>
      </ul>
      <div class="absolute" style="left:0;top:80px;">{{curEnv!=='prod'?curEnv+'环境':''}}</div>
      <div class="v-right header-right"></div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    mounted() {
    },
    computed: {
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
        fileServer: 'config_g_fileServer',
        curEnv:'config_g_curEnv'
      }),
    },
    data(){
      return {}
    },
    methods: {
      getImageUrl (imageUri){
        return !!imageUri ? this.fileServer + imageUri : ''
      },
    }
  }
</script>
<style>
</style>