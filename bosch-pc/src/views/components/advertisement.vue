<template>
  <div>
    <el-row>
      <el-col :span="14">
        <img :src="getImageUrl(advertisementOne.webImageUri)" class="home-advertisement-login-one pointer"
             @click="open(advertisementOne.targetUrl)"/>
      </el-col>
      <el-col :span="10">
        <el-row>
          <el-col :span="11" class="margin-right-20">
            <img :src="getImageUrl(advertisementTwo.webImageUri)" class="home-advertisement-login-two pointer"
                 @click="open(advertisementTwo.targetUrl)"/>
          </el-col>
          <el-col :span="11">
            <img :src="getImageUrl(advertisementThree.webImageUri)" class="home-advertisement-login-two pointer"
                 @click="open(advertisementThree.targetUrl)"/>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  export default{
    computed: {
      ...mapGetters({
        fileServer: 'config_g_fileServer'
      }),
    },
    mounted() {
      this.getContentData();

    },
    data(){
      return {
        advertisement: [],
        defaultItemImage: require('../../assets/images/image-not-found.png'),
        advertisementOne: {},
        advertisementTwo: {},
        advertisementThree: {},
      }
    },
    methods: {
      getContentData(){
        this.$store.dispatch('websitie_a_getContentData').then((response) => {
          if (response.data.resultCode == 0) {
            this.contentList = response.data.resultData.contentList;
            for (let item in this.contentList) {
              if (this.contentList[item].contentType == '03') {
                this.advertisement.push(this.contentList[item]);
              }
            }
            if (this.advertisement.length == 1) {
              this.advertisementOne = this.advertisement[0];
            } else if (this.advertisement.length == 2) {
              this.advertisementOne = this.advertisement[0];
              this.advertisementTwo = this.advertisement[1];
            } else if (this.advertisement.length >= 3) {
              this.advertisementOne = this.advertisement[0];
              this.advertisementTwo = this.advertisement[1];
              this.advertisementThree = this.advertisement[2];
            } else if (this.advertisement.length == 0) {
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