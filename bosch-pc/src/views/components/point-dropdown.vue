<template>
  <div>
    <el-dropdown menu-align="start" @command="goToWeb">
      <span class="header-nav-bg border-radius" @click="goToWeb('/userCenter/point/query')">我的积分
      <i class="el-icon-caret-bottom el-icon--right"></i></span>
      <el-dropdown-menu slot="dropdown" class="header-nav-sec border-radius" style="">
        <el-dropdown-item class="padding-left-10" v-for="item in pointList" :key="item.pointType"
                          command="/userCenter/point/query">
          {{item.pointTypeName}} : {{item.pointValue}}<span v-if="item.specialPoint>0">(特殊积分:{{getSpecialPoint(item)}})</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  export default{
    props: {
      menu: Object,
    },
    mounted() {
      this.getPoint();
    },
    watch: {
      '$route' (to, from) {
        if (to.name === 'order-info') {
          this.getPoint();
        }
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
      }),
    },
    data(){
      return {
        pointList: [],
      }
    },
    methods: {
      goToWeb(path){
        this.$router.push({path: path});
      },
      getPoint(){
        this.$store.dispatch('user_a_getPoint').then((response) => {
          if (response.data.resultCode == 0) {
            this.pointList = response.data.resultData.pointList;
          }
        })
      },
      getSpecialPoint(item){
        if (item.specialPoint <= item.pointValue) {
          return item.specialPoint
        } else {
          return item.pointValue
        }
      },
    },
  }
</script>
<style>
</style>