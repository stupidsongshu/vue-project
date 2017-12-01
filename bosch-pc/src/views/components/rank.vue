<template>
  <div>
    <span class="big-title">兑换排行</span>
    <el-row class="margin-top-10 pointer" v-for="item in rankingList" :key="item.itemId">
      <div @click="goToItemInfo(item)">
        <el-col :span="6">
          <img :src="getImageUrl(item.itemImageUri)" style="width:50px;height:50px;"/>
        </el-col>
        <el-col :span="14" class="padding-left-10 padding-top-5">
          <span class="block constraint-length" style="color:#8aa9b3;line-height:20px;">{{item.itemName || '无'}}</span>
          <span class="block">兑换数量:{{item.exchangeQuantity || '0'}}</span>
        </el-col>
      </div>
    </el-row>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  export default{
    mounted() {
      this.queryRankData();
    },
    computed: {
      ...mapGetters({
        fileServer: 'config_g_fileServer'
      }),
    },
    data(){
      return {
        rankingList: [],
        defaultItemImage: require('../../assets/images/image-not-found.png'),
      }
    },
    methods: {
      queryRankData(){
        this.$store.dispatch('logged_a_queryRankData').then((response) => {
          if (response.data.resultCode == 0) {
            this.rankingList = response.data.resultData.rankingList;
          }
        })
      },
      getImageUrl (imageUri){
        return !!imageUri ? this.fileServer + imageUri : this.defaultItemImage
      },
      goToItemInfo(item){
        if (!!item.itemId) {
          this.setRecentlyViewed(item);
          this.$router.push({name: 'item-info', params: {itemId: item.itemId}});
        } else {
          this.$message.error("未找到该礼品信息")
        }
      },
      setRecentlyViewed(item){
        var params = {
          itemName: item.itemName,
          exchangePoint: item.exchangePoint,
          itemImageUri: item.itemImageUri,
          itemId: item.itemId,
        };
        console.log(item)
        this.$store.dispatch('user_a_updateRecentlyViewed', {params: params})
      },
    }
  }
</script>
<style>
</style>