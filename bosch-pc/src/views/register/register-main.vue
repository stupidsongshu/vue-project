<template>
  <div>
    <v-header></v-header>
    <header-nav :showLoginImg="showLoginImg"></header-nav>
    <div class="v-width padding-top-20">

      <el-row>
        <el-col :span="6" class="padding-right-20">
          <span class="big-title">注册流程</span>
          <div class="text-align-center">
            <img src="../../assets/images/zhuceliucheng.png" class="padding-top-20"/>
          </div>
        </el-col>
        <el-col :span="18">
          <el-breadcrumb separator="/" class="padding-bottom-5 margin-bottom-20 big-title">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/register' }">注册</el-breadcrumb-item>
          </el-breadcrumb>
          <v-register class="margin-auto" style="width:450px;"></v-register>
        </el-col>
      </el-row>
    </div>
    <div class="v-width">
      <div>

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
  import register from '../register/register.vue'
  import vFooter from '../components/footer.vue'
  import vSuspension from '../components/suspension.vue'
  export default{
    components: {
      'v-register': register,
      'v-header': vHeader,
      'header-nav': headerNav,
      'v-footer': vFooter,
      'v-suspension': vSuspension,
    },
    mounted() {

    },
    data () {
      return {
        showLoginImg: false,
      }
    },
    methods: {}
  }
</script>