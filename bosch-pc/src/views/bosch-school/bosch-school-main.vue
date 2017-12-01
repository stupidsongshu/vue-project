<template>
  <div>
    <v-header></v-header>
    <header-nav></header-nav>
    <div class="v-width padding-top-20">
      <el-row>
        <el-col :span="6" class="padding-right-20">
          <span class="big-title">博世学堂</span>
          <el-menu theme="light" :unique-opened="true" :default-active="active" :router="true">
            <el-menu-item index="catalog"><i class="el-icon-arrow-right icon-size"></i>产品目录</el-menu-item>
            <el-menu-item index="bosch-school-manual"><i class="el-icon-arrow-right icon-size"></i>产品手册</el-menu-item>
            <el-menu-item index="method"><i class="el-icon-arrow-right icon-size"></i>安装方法</el-menu-item>
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
    mounted() {
      this.active = this.$route.name
    },
    computed: {},
    data(){
      return {
        active: '',
      }
    },
    methods: {
      goToWeb(name){
        this.$router.push({name: name});
      },
    },
    watch: {
      '$route' (to, from) {
        this.active = this.$route.name
      }
    }
  }
</script>
<style>
</style>