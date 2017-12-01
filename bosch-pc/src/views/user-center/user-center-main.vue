<template>
  <div>
    <v-header></v-header>
    <header-nav></header-nav>
    <div class="v-width padding-top-10">
      <el-row>
        <el-col :span="6" class="padding-right-20">
          <span class="user-img big-title" ref="userImg"
                style="padding: 10px 0 10px 40px;">{{userInfo.contactPerson}}</span>
          <el-menu :default-active="currentMenu" :router="true">
            <el-menu-item v-for="menuItem in filterMenu" :index="menuItem.path" :key="menuItem.name">
              <i :class="[menuItem.icon,'icon-size']"></i>
              {{menuItem.label}}
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="18" class="padding-top-10">
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
      if (!!this.userInfo.avatarImageUri && this.userInfo.avatarImageUri != '') {
        this.$refs.userImg.style.backgroundImage = 'url(' + this.fileServer + this.userInfo.avatarImageUri + ')'
      }
    },
    computed: {
      ...mapState({
        menuList: state => state.menu.userCenterMenu.menuList,
        currentMenu: state => state.menu.userCenterMenu.currentMenu
      }),
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
        fileServer: 'config_g_fileServer'
      }),
      filterMenu () {
        if (!this.userInfo) {
          return null
        }
        let filteredMenu = []
        for (let i = 0; i < this.menuList.length; i++) {
          let menuItem = this.menuList[i]
          filteredMenu.push(menuItem)
        }
        return filteredMenu
      }
    },
    data(){
      return {
        transitionName: 'slide-left',
      }
    },
    methods: {},
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      },
      'userInfo.avatarImageUri': function () {
        this.$refs.userImg.style.backgroundImage = 'url(' + this.fileServer + this.userInfo.avatarImageUri + ')'
      }
    },
  }
</script>
<style>
</style>