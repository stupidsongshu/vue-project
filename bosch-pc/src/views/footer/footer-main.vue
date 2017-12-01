<template>
  <div>
    <v-header></v-header>
    <header-nav v-if="showHeaderNav"></header-nav>
    <div class="v-width padding-top-20">
      <el-row>
        <el-col :span="6" class="padding-right-20">
          <span class="big-title">帮助中心</span>
          <el-menu theme="light" :unique-opened="true" :default-active="active" :router="true">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-arrow-right icon-size"></i>
                <span>配送说明</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="terms">网站使用条款</el-menu-item>
                <el-menu-item index="distribution">配送说明</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-arrow-right icon-size"></i>
                <span>积分兑换</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="point-exchange">积分兑换方法</el-menu-item>
                <el-menu-item index="common-problem">网站使用常见问题</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-arrow-right icon-size"></i>
                <span>客服服务</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="about-us">关于我们</el-menu-item>
                <el-menu-item index="manual">用户手册</el-menu-item>
                <el-menu-item index="authorization">授权书</el-menu-item>
                <el-menu-item index="item-authorization">礼品兑换授权书</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
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
    created(){
    },
    mounted() {
      this.active = this.$route.name
    },
    computed: {
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
      }),
      showHeaderNav(){
        return !!this.userInfo && this.userInfo.isActivated === 0 ? false : true;
      }
    },
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