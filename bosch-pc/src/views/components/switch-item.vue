<style scoped>
  .button-side .el-carousel__arrow--left {
    left: -38px;
    top: 22px;
    background-color: rgba(31, 45, 61, 0);
    color: #333;
  }

  .button-side .el-carousel__arrow--right {
    right: -38px;
    top: 22px;
    background-color: rgba(31, 45, 61, 0);
    color: #333;
  }

  .select-img-item {
    border: 1px solid #F7BA2A;
  }

</style>

<template>
  <div>
    <div class="relative button-side">
      <button class="el-carousel__arrow el-carousel__arrow--left" @click="remove('left',maxWidth)"
              v-if="imageList.length>size.show&&size.button=='user-info'"><i class="el-icon-arrow-left"></i>
      </button>
      <button class="el-carousel__arrow el-carousel__arrow--right" @click="remove('right',maxWidth)"
              v-if="imageList.length>size.show&&size.button=='user-info'"><i class="el-icon-arrow-right"></i>
      </button>
    </div>
    <div :style="switchDiv">
      <button class="el-carousel__arrow el-carousel__arrow--left" @click="remove('left',maxWidth)"
              v-if="imageList.length>size.show&&size.button=='home'"><i class="el-icon-arrow-left"></i></button>
      <button class="el-carousel__arrow el-carousel__arrow--right" @click="remove('right',maxWidth)"
              v-if="imageList.length>size.show&&size.button=='home'"><i class="el-icon-arrow-right"></i>
      </button>
      <ul ref="ul" :style="switchUl">
        <li v-for="item in imageList" :key="item.itemImageId" style="display:inline-block;vertical-align:top">
          <img :src="getImageUrl(item.itemImageUri)" :style="switchImg"
               @click="getImg(getImageUrl(item.itemImageUri))"
               :class="{'pointer':size.button=='user-info','select-img-item':getActive(getImageUrl(item.itemImageUri))}"
               ref="switchImg"/>
          <div v-if="size.button==='home'" class="color-green"
               :style="switchText">
            <span class="block" style="line-height:18px;"> {{item.itemName}}</span>
            <span class="block" style="line-height:18px;"> {{item.summaryInfo}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  export default{
    props: {
      imageList: Array,
      size: Object,
    },
    mounted() {
      this.getStyle();
    },
    beforeUpdate(){
      this.getMaxWidth();
      this.getFirstImageUri();
    },
    computed: {
      ...mapGetters({
        fileServer: 'config_g_fileServer'
      }),
      getSwitchUlWidth(){
        return this.imageList.length * this.size.switchLi.width + 'px';
      },
    },
    data(){
      return {
        switchDiv: {
          position: 'relative',
          overflow: 'hidden',
          width: '',
          height: '',
        },
        switchUl: {
          position: 'absolute',
          width: this.getSwitchUlWidth,
          height: '',
          left: 0,
        },
        switchLi: {
          width: '',
          height: '',
          float: 'left',
          textAlign: 'center',
          lineHeight: '5px',
          marginRight: '10px',
        },
        switchImg: {
          width: '',
          height: '',
        },
        switchText: {
          width: '',
          height:'34px',
          paddingTop: '3px',
          paddingLeft: '10px',
          paddingRight: '10px',
        },
        maxWidth: '',
        defaultItemImage: require('../../assets/images/image-not-found.png'),
      }
    },
    methods: {
      getImageUrl (imageUri){
        return !!imageUri ? this.fileServer + imageUri : this.defaultItemImage
      },
      remove(position, maxWidth){
        let vm = this;
        let n = vm.$refs.ul.offsetLeft / vm.size.switchLi.width;
        if (position == 'left') {
          if (vm.$refs.ul.offsetLeft <= maxWidth) {
            return;
          } else {
            this.animate(vm.$refs.ul, vm.size.switchLi.width * (n - 1));
          }
        } else if (position == 'right') {
          if (vm.$refs.ul.offsetLeft >= 0) {
            return;
          } else {
            this.animate(vm.$refs.ul, vm.size.switchLi.width * (n + 1));
          }
        }
      },
      animate(ele, target){
        clearInterval(ele.timer);
        var speed = target > ele.offsetLeft ? 10 : -10;
        ele.timer = setInterval(function () {
          var val = target - ele.offsetLeft;
          ele.style.left = ele.offsetLeft + speed + "px";
          if (Math.abs(val) < Math.abs(speed)) {
            ele.style.left = target + "px";
            clearInterval(ele.timer);
          }
        }, 5)
      },
      getStyle(){
        this.switchUl.hieght = this.size.switchUl.height + 'px';
        this.switchDiv.width = this.size.switchDiv.width + 'px';
        this.switchDiv.height = this.size.switchDiv.height + 'px';
        this.switchLi.width = this.size.switchLi.width + 'px';
        this.switchLi.height = this.size.switchLi.height + 'px';
        this.switchImg.width = this.size.switchLi.width + 'px';
        this.switchImg.height = this.size.switchLi.height + 'px';
        this.switchText.width = (this.size.switchLi.width - 20) + 'px';
      },
      getMaxWidth(){
        this.maxWidth = -(this.imageList.length * this.size.switchLi.width - this.size.switchDiv.width);
      },
      getFirstImageUri(){
        if (this.size.button == 'user-info') {
          if (!!this.imageList[0]) {
            this.$emit('get', this.getImageUrl(this.imageList[0].itemImageUri))
          }
        }
      },
      getImg(url){
        if (this.size.button == 'user-info') {
          this.$emit('get', url)
        }
      },
      getActive(fileUri){
//        console.log(this.$refs.switchImg)
//        return this.$refs.switchImg.currentSrc==
      }
    }
  }
</script>
<style>
</style>