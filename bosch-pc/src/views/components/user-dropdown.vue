<style>
  .user-img {
    background: url("../../assets/images/touxiang.png") no-repeat 4px center;
    background-size: 27px 27px;
    padding-left: 40px;
  }
</style>
<template>
  <div>
    <el-dropdown menu-align="start" @command="goToWeb">
      <span class="header-nav-bg border-radius user-img"
            ref="userImg" @click="goToWeb('/userCenter/user/info')">{{userInfo.contactPerson}}<span
        v-if="userInfo.verifyStatus==='01'" class="color-red">(待审核)</span>
        <i class="el-icon-caret-bottom el-icon--right"></i></span>
      <el-dropdown-menu slot="dropdown" class="header-nav-sec border-radius">
        <el-dropdown-item class="padding-left-10" v-for="menuItem in filterMenu" :key="menuItem.name"
                          :command="menuItem.path">
          {{menuItem.label}}
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
      if (!!this.userInfo.avatarImageUri && this.userInfo.avatarImageUri != '') {
        this.$refs.userImg.style.backgroundImage = 'url(' + this.fileServer + this.userInfo.avatarImageUri + ')'
      }
      this.getPoint();
    },
    watch: {
      'userInfo.avatarImageUri': function () {
        this.$refs.userImg.style.backgroundImage = 'url(' + this.fileServer + this.userInfo.avatarImageUri + ')'
      },
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
    },

  }
</script>
<style>
</style>