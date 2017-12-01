<template>
  <div>
    <v-header></v-header>
    <header-nav :showLoginImg="showLoginImg"></header-nav>
    <div class="v-width">
      <div>
        <el-breadcrumb separator="/" class="padding-bottom-5 margin-bottom-20 big-title">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>登录</el-breadcrumb-item>
        </el-breadcrumb>
        <v-login class="margin-auto" style="width:280px;"></v-login>
      </div>
    </div>
    <v-footer></v-footer>
    <v-suspension></v-suspension>
  </div>
</template>
<style>
</style>
<script type="text/ecmascript-6">
  import vHeader from '../components/header.vue'
  import headerNav from '../components/header-nav.vue'
  import login from '../components/login.vue'
  import vFooter from '../components/footer.vue'
  import vSuspension from '../components/suspension.vue'
  export default{
    components: {
      'v-login': login,
      'v-header': vHeader,
      'header-nav': headerNav,
      'v-footer': vFooter,
      'v-suspension': vSuspension,
    },
    mounted() {

    },
    data () {
      return {
        showLoginImg: true,
      }
    },
    methods: {
    }
  }
</script>