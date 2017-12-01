<template>
  <div>
    <span class="header-nav-bg border-radius" @click="goToItemSearch()"
          v-if="!!!userInfo">礼品商城</span>
    <el-dropdown menu-align="start" v-if="!!userInfo" @command="goToWeb">
      <span class="header-nav-bg border-radius" @click="goToItemSearch()">礼品商城<i
        class="el-icon-caret-bottom el-icon--right"></i></span>
      <el-dropdown-menu slot="dropdown" class="header-nav-sec border-radius">
        <div v-bar="{preventParentScroll: true,scrollThrottle: 30}" :class="getVbContentY()">
          <div :style="getMaxHeight()">
            <el-dropdown-item class="padding-left-10" v-for="item in filteredCategoryList" :key="item.categoryId"
                              :command="item">
              {{item.categoryName}}
            </el-dropdown-item>
            <el-dropdown-item class="padding-left-10" v-for="item in itemTagCategoryList" :key="item.tagId"
                              :command="item">
              {{item.tagName}}
            </el-dropdown-item>
          </div>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  export default{
    components: {},
    mounted() {
      if (!!this.userInfo) {
        this.$store.dispatch('dict_a_queryItemCategoryData');
        this.$store.dispatch('dict_a_queryItemTagCategoryData');
      }
    },
    computed: {
      ...mapState({
        itemCategoryList: state => state.dict.itemCategoryList,
        itemTagCategoryList: state => state.dict.itemTagCategoryList,
      }),
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
        fileServer: 'config_g_fileServer'
      }),
      filteredCategoryList(){
        let filteredCategoryList = [];
        for (let i = 0; i < this.itemCategoryList.length; i++) {
          if(this.itemCategoryList[i].frontView!==0){
            filteredCategoryList.push(this.itemCategoryList[i])
          }
        }
        return filteredCategoryList
      }
    },
    data(){
      return {
        MaxHeight: {
          maxHeight: '580px',
        }
      }
    },
    methods: {
      goToWeb(item){
        if (!!item.categoryId) {
          this.$router.push({name: 'item-list', query: {categoryId: item.categoryId}});
        } else if (!!item.tagId) {
          this.$router.push({name: 'item-list', query: {tagId: item.tagId}});
        }
      },
      goToItemSearch(){
        this.$router.push({name: 'item-search-all-list'});
      },
      getImageUrl (imageUri){
        return !!imageUri ? this.fileServer + imageUri : ''
      },
      getVbContentY(){
        if (window.innerHeight < 820) {
          return '';
        } else {
          return 'vb-content-y';
        }
      },
      getMaxHeight(){
        if (window.innerHeight < 820) {
          this.MaxHeight.maxHeight = (window.innerHeight - 300) + 'px'
        } else {
          this.MaxHeight.maxHeight = '800px'
        }
        return this.MaxHeight;
      },
    }
  }
</script>
<style>
</style>
