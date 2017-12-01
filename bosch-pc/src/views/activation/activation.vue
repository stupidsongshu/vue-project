<template>
  <div>
    <v-header></v-header>
    <div class="v-width clearfix">
      <div class="header-nav-bg border-radius v-right" @click="logout">我要退出登录</div>
    </div>
    <h1 class="v-width text-align-center">激活账号</h1>
    <div class="v-width">
      <el-row class="text-align-center padding-top-20" style="margin-left:150px">
        <el-steps :space="200" :active="active" finish-status="success">
          <el-step title="网站条款"></el-step>
          <el-step title="确认注册资料"></el-step>
          <el-step title="修改密码"></el-step>
        </el-steps>
      </el-row>
    </div>

    <div class="margin-auto v-width padding-bottom-40" style="padding-top:20px;">
      <transition-group name="fade" mode="out-in" tag="div">
        <activation-terms :key="key[0]" v-if="active==0" @get="getActive"></activation-terms>
        <activation-confirm :key="key[1]" v-if="active==1" @get="getActive"></activation-confirm>
        <activation-revise :key="key[2]" v-if="active==2" @get="getActive"></activation-revise>
      </transition-group>
    </div>
    <v-footer></v-footer>
    <v-suspension></v-suspension>
  </div>
</template>
<script>
  import vHeader from '../components/header.vue'
  import activationTerms from './activation-terms.vue'
  import activationConfirm from './activation-confirm.vue'
  import activationRevise from './activation-revise.vue'
  import vFooter from '../components/footer.vue'
  import vSuspension from '../components/suspension.vue'
  export default{
    components: {
      'v-header': vHeader,
      'activation-terms': activationTerms,
      'activation-confirm': activationConfirm,
      'activation-revise': activationRevise,
      'v-footer': vFooter,
      'v-suspension': vSuspension,
    },
    data(){
      return {
        key: [1, 2, 3],
        active: 0
      }
    },
    methods: {
      getActive(active){
        this.active = active;
      },
      logout(){
        this.$confirm('是否要退出登录?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('user_a_logout').then((response) => {
            this.$store.commit('user_m_clearUserInfo');
            this.$router.push({name: 'home'});
          });
        }).catch(() => {
          console.log('cancel');
        })
      },
    }
  }
</script>
<style>
</style>