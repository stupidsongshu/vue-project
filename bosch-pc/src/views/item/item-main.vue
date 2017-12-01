<style>
  .submenu-selected .el-submenu__title {
    font-weight: 700;
    background-color: #f1f1f1;
    border-radius: 3px;
    color: #333;
  }
</style>
<style scoped>
  .image-style {
    width: 15px;
    height: 15px;
    top: 10px;
    left: 5px;
  }
.image-sub-style{
  width: 15px;
  height: 15px;
  top: 10px;
  left: 40px;
}
  .category-name {
    padding-left: 25px;
  }
</style>
<template>
  <div>
    <v-header></v-header>
    <header-nav></header-nav>
    <div class="v-width padding-top-20">
      <el-row>
        <el-col :span="6" class="padding-right-20">
          <span class="big-title pointer hover" @click="go()">礼品商城</span>
          <el-menu theme="light" :unique-opened="true" :default-active="active" @open="addActive"
                   @close="removeActive" ref="categoryMenu">
            <div v-for="item in filteredCategoryList" :key="item.categoryId">
              <el-menu-item :index="'category_'+item.categoryId" v-if="getMenu(item)"
                            @click="goToWeb(item,'category')" class="relative">
                <!--<i class="el-icon-arrow-right icon-size"></i>-->
                <img :src="getImageUrl(item.imageUri)" class="absolute image-style"/><span
                class="category-name">{{item.categoryName}}</span>
              </el-menu-item>
              <el-submenu :index="'category_'+item.categoryId" v-if="getSubMenu(item)"
                          :class="[checkSubmenuActive('category_'+item.categoryId) ? 'submenu-selected' : '']">
                <template slot="title">
                  <img :src="getImageUrl(item.imageUri)" class="absolute image-style"/><span
                  class="category-name">{{item.categoryName}}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item :index="'category_'+item2.categoryId" v-for="item2 in item.subList"
                                @click="goToWeb(item2,'category')"
                                :key="item2.categoryId">
                    <img :src="getImageUrl(item2.imageUri)" class="absolute image-sub-style"/><span
                    class="category-name">{{item2.categoryName}}</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </div>
            <div v-for="item in itemTagCategoryList" :key="item.tagId">
              <el-menu-item :index="'tag_'+item.tagId" @click="goToWeb(item,'tag')">
                <img :src="getImageUrl(item.imageUri)" class="absolute image-style"/><span
                class="category-name">{{item.tagName}}</span>
              </el-menu-item>
            </div>
          </el-menu>
          <el-row>
            <el-col class="padding-top-20">
              <v-rank v-if="$route.name=='item-list'||$route.name=='item-search-all-list'"></v-rank>
              <recently-viewed v-if="$route.name=='item-info'"></recently-viewed>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="18">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
    <div class="v-width padding-top-50 padding-bottom-40"></div>
    <div class="v-width padding-bottom-40" v-if="$route.name!='item-info'">
      <v-advertisement></v-advertisement>
    </div>
    <v-footer></v-footer>
    <v-suspension></v-suspension>
  </div>
</template>
<script>
  import vHeader from '../components/header.vue'
  import headerNav from '../components/header-nav.vue'
  import vAdvertisement from '../components/advertisement.vue'
  import vFooter from '../components/footer.vue'
  import vRank from '../components/rank.vue'
  import recentlyViewed from '../components/recently-viewed.vue'
  import vSuspension from '../components/suspension.vue'
  import {mapState, mapGetters} from 'vuex'
  export default{
    components: {
      'v-header': vHeader,
      'header-nav': headerNav,
      'v-advertisement': vAdvertisement,
      'v-footer': vFooter,
      'v-suspension': vSuspension,
      'v-rank': vRank,
      'recently-viewed': recentlyViewed,
    },
    created() {
      if (!!this.$route.query.categoryId) {
        this.active = 'category_' + this.$route.query.categoryId;
      } else if (!!this.$route.query.tagId) {
        this.active = 'tag_' + this.$route.query.tagId;
      } else if (!this.$route.query.categoryId && !this.$route.query.tagId) {
        this.active = '';
      }
      this.$store.dispatch('dict_a_queryItemCategoryData');
      this.$store.dispatch('dict_a_queryItemTagCategoryData');
    },
    computed: {
      ...mapState({
        itemCategoryList: state => state.dict.itemCategoryList,
        itemTagCategoryList: state => state.dict.itemTagCategoryList,
      }),
      ...mapGetters({
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
        active: '',
        whiteImage:require('../../assets/images/white.png')
      }
    },
    methods: {
      go(){
        this.$router.push({name: 'item-search-all-list'});
      },
      getImageUrl (imageUri){
        return !!imageUri ? this.fileServer + imageUri : this.whiteImage
      },
      goToWeb(item, type){
        if (type === 'category') {
          this.$router.push({name: 'item-list', query: {categoryId: item.categoryId}});
        }
        if (type === 'tag') {
          this.$router.push({name: 'item-list', query: {tagId: item.tagId}});
        }
      },
      addActive(index, indexPath){
        this.active = index;
        this.$router.push({name: 'item-list', query: {categoryId: index.slice(9)}});
      },
      removeActive(index, indexPath){
        this.active = index;
        this.$router.push({name: 'item-list', query: {categoryId: index.slice(9)}});
      },
      checkSubmenuActive(active){
        if (!!this.$refs['categoryMenu']) {
          return this.$refs['categoryMenu'].defaultActive === active
        } else {
          return false;
        }
      },
      getMenu(item){
        return !!!item.subList || item.subList.length == 0
      },
      getSubMenu(item){
        return !!item.subList && item.subList.length > 0
      },
    },
    watch: {
      '$route' (to, from) {
        if (!!this.$route.query.categoryId) {
          this.active = 'category_' + this.$route.query.categoryId;
        } else if (!!this.$route.query.tagId) {
          this.active = 'tag_' + this.$route.query.tagId;
        } else if (!this.$route.query.categoryId && !this.$route.query.tagId) {
          this.active = '';
        }
      }
    }
  }
</script>
<style>
</style>