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
    <div class="v-width">
      <el-row>
        <el-col :span="14">
          <div>
            <span class="title-big">兑换流程</span>
          </div>
          <div class="text-align-center">
            <img src="../../assets/images/duihuan-img.png" style="width:438px;height:105px;"/>
          </div>
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
    <div class="v-width">
      <span class="title-big">礼品展示</span>
      <switch-item :imageList="imageList" :size="size"></switch-item>
    </div>
    <div class="v-width padding-top-50 padding-bottom-40">
      <div class="line-img padding-bottom-40 margin-auto"></div>
      <div class="clearfix advertisement-div">
        <div class="width--50 text-align-center" v-for="item in advertisement" :key="item.contentId">
          <img :src="getImageUrl(item.webImageUri)" class="home-advertisement pointer" @click="open(item.targetUrl)"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import vHeader from '../components/header.vue'
  import headerNav from '../components/header-nav.vue'
  import switchItem from '../components/switch-item.vue'
  import {mapState, mapGetters} from 'vuex'
  export default{
    mounted() {
      this.itemRecommendData();
      this.getContentData();
    },
    components: {
      'v-header': vHeader,
      'header-nav': headerNav,
      'switch-item': switchItem,
    },
    computed: {
      ...mapGetters({
        fileServer: 'config_g_fileServer'
      }),
    },
    data(){
      return {
        imageList: [],
        contentList: [],
        banner: [],
        advertisement: [],
        size: {
          show: 6,
          button: 'home',
          switchDiv: {
            width: '968',
            height: '200',
          },
          switchUl: {
            height: '200',
          },
          switchLi: {
            width: '160',
            height: '160',
          },
        },
        defaultItemImage: require('../../assets/images/image-not-found.png'),
      }
    },
    methods: {
      itemRecommendData(){
        this.$store.dispatch('websitie_a_getItemRecommendData').then((response) => {
          if (response.data.resultCode == 0) {
            this.imageList = response.data.resultData.recommendItemList;
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