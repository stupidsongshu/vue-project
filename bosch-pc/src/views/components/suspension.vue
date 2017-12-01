<style>
  .supension {
    position: fixed;
    right: 50%;
    margin-right: -470px;
    bottom: 50px;
    background: url("../../assets/images/suspension.png") no-repeat;
    width: 34px;
    height: 82px;
  }

  .kefu-img {
    margin: 5px auto;
    /*background: url("../../assets/images/kefu-white.png") no-repeat center center;*/
    background: url("../../assets/images/top.png") no-repeat center center;
    width: 25px;
    height: 41px;
    /*visibility: hidden;*/
  }

  /*.kefu-img:hover {*/
  /*background: url("../../assets/images/kefu-blue.png") no-repeat center center;*/
  /*}*/

  .to-top {
    width: 34px;
    height: 30px;
  }

</style>
<template>
  <div class="supension">
    <!--<div class="pointer kefu-img" ></div>-->
    <!--<div class="pointer to-top" @click="toTop"></div>-->
    <div class="pointer kefu-img" @click="toTop"></div>
    <div class="pointer to-top" @click="toTop"></div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        isKefuImg: true,
      }
    },
    mounted() {


    },
    computed: {},
    methods: {
      toTop(){
        if (this.getPageScroll().Y >= 0) {
          window.scrollTo(0, 0);
        }
      },
//      getPageSize() {
//        var scrW, scrH;
//        if (window.innerHeight && window.scrollMaxY) {    // Mozilla
//          scrW = window.innerWidth + window.scrollMaxX;
//          scrH = wYindow.innerHeight + window.scrollMaxY;
//        }
//        else if (document.body.scrollHeight > document.body.offsetHeight) {    // all but IE Mac
//          scrW = document.body.scrollWidth;
//          scrH = document.body.scrollHeight;
//        } else if (document.body) { // IE Mac
//          scrW = document.body.offsetWidth;
//          scrH = document.body.offsetHeight;
//        }
//        var winW, winH;
//        if (window.innerHeight) { // all except IE
//          winW = window.innerWidth;
//          winH = window.innerHeight;
//        } else if (document.documentElement && document.documentElement.clientHeight) {    // IE 6 Strict Mode
//          winW = document.documentElement.clientWidth;
//          winH = document.documentElement.clientHeight;
//        } else if (document.body) { // other
//          winW = document.body.clientWidth;
//          winH = document.body.clientHeight;
//        }    // for small pages with total size less then the viewport
//        var pageW = (scrW < winW) ? winW : scrW;
//        var pageH = (scrH < winH) ? winH : scrH;
//        return {PageW: pageW, PageH: pageH, WinW: winW, WinH: winH};
//      },
      getPageScroll(){
        var x, y;
        if (window.pageYOffset) {    // all except IE
          y = window.pageYOffset;
          x = window.pageXOffset;
        } else if (document.documentElement && document.documentElement.scrollTop) {    // IE 6 Strict
          y = document.documentElement.scrollTop;
          x = document.documentElement.scrollLeft;
        } else if (document.body) {    // all other IE
          y = document.body.scrollTop;
          x = document.body.scrollLeft;
        }
        return {X: x, Y: y};
      }
    }
  }
</script>
