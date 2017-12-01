<template>
  <div>
    <v-header></v-header>
    <header-nav></header-nav>
    <div class="v-width padding-top-20">
      <el-row>
        <el-col :span="6" class="padding-right-20">
          <span class="big-title">促销活动</span>
          <el-menu theme="light" :unique-opened="true" :default-active="active" :router="false">
            <el-menu-item :index="item.key" class="constraint-length" v-for="item in activityTypeMap"
                          :key="item.key" @click="goToWeb(item.key)">
              <i class="el-icon-arrow-right icon-size"></i>
              {{item.value}}
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="18">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
    <div class="v-width padding-top-50 padding-bottom-40"></div>
    <v-footer></v-footer>
    <v-suspension></v-suspension>
  </div>
</template>
<script>
  import _ from 'lodash'
  import vHeader from '../components/header.vue'
  import headerNav from '../components/header-nav.vue'
  import vFooter from '../components/footer.vue'
  import vSuspension from '../components/suspension.vue'
  import {mapState, mapGetters} from 'vuex'
  export default{
    components: {
      'v-header': vHeader,
      'header-nav': headerNav,
      'v-footer': vFooter,
      'v-suspension': vSuspension,
    },
    created(){
      this.active = this.$route.params.activityType
      this.$store.dispatch('dict_a_queryDictByName','activityTypeMap')
    },
    mounted() {

    },
    computed: {
      ...mapState({
        activityTypeMap: state => state.dict.activityTypeMap,
      }),
    },
    data(){
      return {
        active: '',
      }
    },
    methods: {
      goToWeb(key){
        this.$router.push({name:'activity-list',params:{activityType:key}});
      },
    },
    watch: {
      '$route' (to, from) {
        this.active = this.$route.params.activityType
        this.$store.dispatch('dict_a_queryDictByName','activityTypeMap')
      }
    }
  }
</script>
<style>
</style>