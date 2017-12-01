<template>
  <div>
    <span class="big-title">最近浏览</span>
    <el-row class="margin-top-10 pointer" v-for="item in viewedList" :key="item.itemId">
      <div @click="goToItemInfo(item)">
        <el-col :span="6">
          <img :src="getImageUrl(item.itemImageUri)" style="width:50px;height:50px;"/>
        </el-col>
        <el-col :span="14" class="padding-left-10 padding-top-5">
          <span class="block constraint-length" style="color:#8aa9b3;line-height:20px;">{{item.itemName}}</span>
          <span class="block">积分:{{item.exchangePoint}}</span>
        </el-col>
      </div>
    </el-row>
  </div>
</template>
<script>
  import {localStorageUtils} from '../../utils'
  import {mapState, mapGetters} from 'vuex'
  export default{
    mounted() {
      this.getRecentlyViewed();
    },
    data(){
      return {
        viewedList: [],
        defaultItemImage: require('../../assets/images/image-not-found.png'),
      }
    },
    computed: {
      ...mapGetters({
        fileServer: 'config_g_fileServer',
        recentlyViewed: 'user_g_getRecentlyViewed',
      }),
    },
    methods: {
      getImageUrl (imageUri){
        return !!imageUri ? this.fileServer + imageUri : this.defaultItemImage
      },
      getRecentlyViewed(){
        if (!!this.recentlyViewed) {
          this.viewedList = this.recentlyViewed;
        }
      },
      goToItemInfo(item){
        this.setRecentlyViewed(item);
        this.$router.push({name: 'item-info', params: {itemId: item.itemId}});
      },
      setRecentlyViewed(item){
        var params = {
          itemName: item.itemName,
          exchangePoint: item.exchangePoint,
          itemImageUri: item.itemImageUri,
          itemId: item.itemId,
        };
        this.$store.dispatch('user_a_updateRecentlyViewed', {params: params})
      },
    }
  }
</script>
<style>
</style>