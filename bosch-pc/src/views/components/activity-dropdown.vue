<template>
  <div>
     <span class="header-nav-bg border-radius" @click="goToActivity()"
           v-if="!!!userInfo">促销活动</span>
    <el-dropdown menu-align="start" v-if="!!userInfo" @command="goToWeb">
      <span class="header-nav-bg border-radius" @click="goToActivity()">促销活动<i
        class="el-icon-caret-bottom el-icon--right"></i></span>
      <el-dropdown-menu slot="dropdown" class="header-nav-sec border-radius">
        <el-dropdown-item class="padding-left-10" v-for="item in activityTypeMap" :key="item.key"
                          :command="item">
          {{item.value}}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
  import _ from 'lodash'
  import {mapGetters,mapState} from 'vuex'
  export default{
    props: {
      menu: Object,
    },
    mounted() {
      if (!!this.userInfo) {
        this.$store.dispatch('dict_a_queryDictByName','activityTypeMap')
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
      }),
      ...mapState({
        activityTypeMap: state => state.dict.activityTypeMap,
      }),
    },
    data(){
      return {
        activityTypeList: [],
      }
    },
    methods: {
      goToWeb(item){
        this.$router.push({name: 'activity-list', params: {activityType: item.key}});
      },
      goToActivity(){
        this.$router.push({name: 'activity-list', params: {activityType: '01'}});
      }
    },
  }
</script>
<style>
</style>