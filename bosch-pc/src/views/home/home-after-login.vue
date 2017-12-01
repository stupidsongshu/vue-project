<template>
  <div>
    <v-header></v-header>
    <header-nav></header-nav>
    <div class="v-width">
      <el-carousel indicator-position="outside" trigger="click">
        <el-carousel-item v-for="item in banner" :key="item.contentId">
          <img :src="getImageUrl(item.webImageUri)" @click="open(item.targetUrl)" class="pointer"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="v-width padding-top-20" v-if="noticeList.length > 0">
      <div class="notice">
        <span>最新公告 :</span>
        <span class="pointer hover" @click="goToWeb(notice.noticeId)" @mouseover="stop()"
              @mouseout="start()">{{notice.noticeTitle}}</span>
      </div>
    </div>
    <div class="v-width">
      <el-row>
        <el-col :span="14">
          <div>
            <span class="title-big">兑换排行</span>
          </div>
          <el-row>
            <el-col :span="13" class="padding-top-10 pointer" style="border-right:1px solid #d4d4d4">
              <el-row>
                <div @click="goToItemInfo(rankingOne)">
                  <el-col :span="4">
                    <img src="../../assets/images/no-1.png"/>
                  </el-col>
                  <el-col :span="10">
                    <span class="block constraint-length" style="color:#f26125;line-height:20px;">{{rankingOne.itemName || '无'}}</span>
                    <!--<span class="block">积分:{{ rankingOne.exchangePoint || '0'}}</span>-->
                    <span class="block">兑换数量:{{rankingOne.exchangeQuantity || '0'}}</span>
                  </el-col>
                  <el-col :span="10">
                    <img :src="getImageUrl(rankingOne.itemImageUri)" class="width-100 height-100"/>
                  </el-col>
                </div>
              </el-row>
            </el-col>
            <el-col :span="10" class="padding-left-20">
              <el-row>
                <el-col :span="24" class="padding-bottom-10 pointer" style="border-bottom:1px solid #d4d4d4">
                  <el-row>
                    <div @click="goToItemInfo(rankingTwo)">
                      <el-col :span="4">
                        <img src="../../assets/images/no-2.png"/>
                      </el-col>
                      <el-col :span="14" class="padding-left-10">
                        <span class="block constraint-length"
                              style="color:#8aa9b3;line-height:20px;">{{rankingTwo.itemName || '无'}}</span>
                        <!--<span class="block">积分:{{rankingTwo.exchangePoint || '0'}}</span>-->
                        <span class="block">兑换数量:{{rankingTwo.exchangeQuantity || '0'}}</span>
                      </el-col>
                      <el-col :span="6">
                        <img :src="getImageUrl(rankingTwo.itemImageUri)" style="width:50px;height:50px;"/>
                      </el-col>
                    </div>
                  </el-row>
                </el-col>
                <el-col :span="24" class="padding-top-10 pointer">
                  <el-row>
                    <div @click="goToItemInfo(rankingThree)">
                      <el-col :span="4">
                        <img src="../../assets/images/no-3.png"/>
                      </el-col>
                      <el-col :span="14" class="padding-left-10">
                      <span class="block constraint-length"
                            style="color:#8aa9b3;line-height:20px;">{{rankingThree.itemName || '无'}}</span>
                        <!--<span class="block">积分:{{rankingThree.exchangePoint || '0'}}</span>-->
                        <span class="block">兑换数量:{{rankingThree.exchangeQuantity || '0'}}</span>
                      </el-col>
                      <el-col :span="6">
                        <img :src="getImageUrl(rankingThree.itemImageUri)" style="width:50px;height:50px;"/>
                      </el-col>
                    </div>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="10">
          <div>
            <span class="title-big">请扫码下载App</span>
          </div>
          <div class="text-align-center">
            <img src="../../assets/images/ios.png" class="scan-img"/>
            <img src="../../assets/images/android.png" class="scan-img"/>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="v-width padding-top-50">
      <img :src="getImageUrl(promotion.webImageUri)" style="width:970px;height:150px;"
           @click="open(promotion.targetUrl)" class="pointer"/>
    </div>
    <div class="v-width padding-top-50 padding-bottom-40">
      <div class="line-img padding-bottom-40 margin-auto"></div>
      <v-advertisement></v-advertisement>
    </div>
  </div>
</template>
<script>
  import vHeader from '../components/header.vue'
  import headerNav from '../components/header-nav.vue'
  import switchItem from '../components/switch-item.vue'
  import vAdvertisement from '../components/advertisement.vue'
  import {mapState, mapGetters} from 'vuex'
  export default{
    components: {
      'v-header': vHeader,
      'header-nav': headerNav,
      'switch-item': switchItem,
      'v-advertisement': vAdvertisement,
    },
    computed: {
      ...mapGetters({
        fileServer: 'config_g_fileServer'
      }),
    },
    data()
    {
      return {
        noticeList: [],
        rankingList: [],
        contentList: [],
        banner: [],
        promotion: {},
        advertisement: [],
        notice: {
          noticeTitle: '',
          noticeContent: '',
          noticeId: '',
          i: '',
        },
        defaultItemImage: require('../../assets/images/image-not-found.png'),
        rankingOne: {},
        rankingTwo: {},
        rankingThree: {},
        step: '',
      }
    },
    mounted() {
      this.queryNoticeList();
      this.queryRankData();
      this.getContentData();

    },
    methods: {
      goToWeb(id){
        this.$router.push({name: 'notice-text', params: {noticeId: id}});
      },
      stop(){
        clearInterval(this.step)
      },
      start(){
        setTimeout(this.changeNotice, 1000);
      },
      changeNotice(){
        var i = 1;
//        if(this.notice.i===''){
//          var i = 1;
//        } else{
//          var i = this.notice.i+1;
//        }
        let vm = this;
        this.notice.noticeTitle = this.noticeList[0].noticeTitle;
        this.notice.noticeId = this.noticeList[0].noticeId;
        this.notice.i = 0;
        this.step = setInterval(function () {
          if (i < vm.noticeList.length) {
            vm.notice.noticeTitle = vm.noticeList[i].noticeTitle;
            vm.notice.noticeId = vm.noticeList[i].noticeId;
            vm.notice.i = i;
            i++;
          } else {
            i = 1;
            vm.notice.noticeTitle = vm.noticeList[0].noticeTitle
            vm.notice.noticeId = vm.noticeList[0].noticeId;
            vm.notice.i = i;
          }
        }, 3000)
      },
      queryNoticeList(){
        this.$store.dispatch('logged_a_queryNoticeList').then((response) => {
          if (response.data.resultCode == 0) {
            this.noticeList = response.data.resultData.noticeList;
            if (this.noticeList.length > 0) {
              this.changeNotice();
            }
          }
        })
      },
      queryRankData(){
        this.$store.dispatch('logged_a_queryRankData').then((response) => {
          if (response.data.resultCode == 0) {
            this.rankingList = response.data.resultData.rankingList;
            if (this.rankingList.length == 1) {
              this.rankingOne = this.rankingList[0];
            } else if (this.rankingList.length == 2) {
              this.rankingOne = this.rankingList[0];
              this.rankingTwo = this.rankingList[1];
            } else if (this.rankingList.length >= 3) {
              this.rankingOne = this.rankingList[0];
              this.rankingTwo = this.rankingList[1];
              this.rankingThree = this.rankingList[2];
            } else if (this.rankingList.length == 0) {
            }
          }
        })
      },
      getContentData(){
        this.$store.dispatch('websitie_a_getContentData').then((response) => {
          if (response.data.resultCode == 0) {
            this.contentList = response.data.resultData.contentList;
            for (let item in this.contentList) {
              if (this.contentList[item].contentType == '01') {
                this.banner.push(this.contentList[item]);
              } else if (this.contentList[item].contentType == '02') {
                this.promotion = this.contentList[item];
              } else if (this.contentList[item].contentType == '03') {
                this.advertisement.push(this.contentList[item]);
              }
            }
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
        this.$store.dispatch('user_a_updateRecentlyViewed', {params: params})
      },
      open(url){
        if (!!url && url !== '') {
          window.open(url)
        }
      }
    }
  }
</script>
<style>
</style>