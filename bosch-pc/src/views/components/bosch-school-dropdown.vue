<template>
  <div>
    <span class="header-nav-bg border-radius" @click="goToWeb('catalog')">博世学堂</span>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    props: {
      menu: Object,
    },
    mounted() {

    },
    computed: {
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
      }),
    },
    data(){
      return {}
    },
    methods: {
      goToWeb(name){
        this.$router.push({name: name});
      },
    }
  }
</script>
<style>
</style>