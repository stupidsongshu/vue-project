<template>
  <div class="v-width clearfix padding-bottom-10">
    <div class="header-nav"></div>
    <div class="v-left">
      <ul class="header-nav-link">
        <li>
          <router-link to="/home"><img src="../../assets/images/nav-home.png" class="nav-home"/></router-link>
        </li>
        <li class="relative">
          <bosch-school-dropdown></bosch-school-dropdown>
          <img src="../../assets/images/boshixuetang.png" class="absolute img-position"/>
        </li>
        <li>
          <item-dropdown></item-dropdown>
        </li>
        <li>
          <activity-dropdown></activity-dropdown>
        </li>
        <li>
          <brand-information-dropdown></brand-information-dropdown>
        </li>
        <li>
          <notice-dropdown></notice-dropdown>
        </li>
      </ul>
    </div>
    <div class="v-right relative" v-if="!userInfo">
      <el-popover ref="popover4" placement="bottom" trigger="click">
        <div class="header-nav-login-bg border-radius">
          <v-login></v-login>
        </div>
      </el-popover>
      <img src="../../assets/images/login-button.png" class="header-nav-login" v-popover:popover4
           v-if="!!!showLoginImg"/>
    </div>
    <div class="v-right" v-if="!!userInfo">
      <ul class="header-nav-link">
        <li>
          <user-dropdown></user-dropdown>
        </li>
        <li>
          <point-dropdown></point-dropdown>
        </li>
        <li class="header-nav-bg border-radius" @click="goToWeb('shopping-cart')">购物车:{{getCartListLength}}</li>
        <li class="header-nav-bg border-radius" @click="alertSign()" v-if="!!userInfo&&userInfo.isSigned===0">
          签到
        </li>
        <li class="header-nav-bg border-radius" @click="alertSign()" v-if="!!userInfo&&userInfo.isSigned===1">
          已签到
        </li>
        <li class="header-nav-bg border-radius" @click="logout">退出</li>
      </ul>
    </div>
  </div>
</template>
<script>
  import vLogin from './login.vue'
  import itemDropdown from './item-dropdown.vue'
  import boschSchoolDropdown from './bosch-school-dropdown.vue'
  import brandInformationDropdown from './brand-information-dropdown.vue'
  import userDropdown from './user-dropdown.vue'
  import pointDropdown from './point-dropdown.vue'
  import noticeDropdown from './notice-dropdown.vue'
  import activityDropdown from './activity-dropdown.vue'
  import {mapGetters, mapState} from 'vuex'
  export default{
    props: {
      showLoginImg: Boolean,
    },
    components: {
      'v-login': vLogin,
      'item-dropdown': itemDropdown,
      'bosch-school-dropdown': boschSchoolDropdown,
      'user-dropdown': userDropdown,
      'point-dropdown': pointDropdown,
      'brand-information-dropdown': brandInformationDropdown,
      'notice-dropdown': noticeDropdown,
      'activity-dropdown': activityDropdown,
    },
    mounted(){
      if (!!this.userInfo) {
        this.$store.dispatch('order_a_getCartList', {params: {clientId: this.userInfo.clientId}})
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
      }),
      ...mapState({
        cartList: state => state.order.cartList,
      }),
      getCartListLength(){
        return this.cartList.length
      }
    },
    data(){
      return {}
    },
    methods: {
      goToWeb(name){
        this.$router.push({name: name});
      },
      logout(){
        this.$confirm('是否要退出登录?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('user_a_logout').then((response) => {
            this.$store.commit('user_m_clearUserInfo');
            this.$router.push({path: '/home'});
          });
        }).catch(() => {
          console.log('cancel');
        })
      },
      alertSign(){
        if (!!this.userInfo && this.userInfo.isSigned === 1) {
//          this.$message.error('您已经签过到啦,不要再点啦')
          this.$router.push({name:'my-sign'})
        } else if (!!this.userInfo && this.userInfo.isSigned === 0) {
          this.$store.dispatch('user_a_getClientSign', {params: {signFrom: 'web'}}).then((response) => {
            if (response.data.resultCode == 0) {
              let title = '恭喜您,今日签到成功!' + (response.data.resultData.pointTypeName || '') + '+' + (response.data.resultData.pointValue || '0');
              this.$alert(title, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$store.commit('user_m_updateUserInfoData', {isSigned: 1});
                }
              });
            }
          })
        }
      },
    }
  }
</script>
