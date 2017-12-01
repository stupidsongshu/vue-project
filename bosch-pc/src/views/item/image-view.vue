<style scoped>
  .small-image {
    position: relative;
    z-index: 1;
    border: 2px solid #EFF2F7;
  }

  .small-image > img {
    height: 190px;
    width: 190px;
  }

  .small-image-block {
    width: 50px;
    height: 50px;
    filter: alpha(opcity=50);
    opacity: 0.5;
    background-color: #58B7FF;
    font-size: 12px;
    position: absolute;
    left: 0px;
    top: 0px;
    cursor: move;
    display: none;
    z-index: 1;
  }

  .big-image {
    position: absolute;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    background: #ffffff;
    left: 33.5%;
    top: 10px;
    width: 300px;
    height: 300px;
    overflow: hidden;
    display: none;
    z-index: 99;
  }

  .big-image-block {
    width: 500px;
    height: 500px;
    z-index: 99;
    position: absolute;
  }

</style>
<template>
  <div class="v-image" v-image>
    <div class="small-image">
      <img :src="imgUrl" alt="">
      <div class="small-image-block"></div>
    </div>
    <div class="big-image">
      <img class="big-image-block" :src="imgUrl" alt="">
    </div>
  </div>
</template>
<script>
  import {commonUtils} from '../../utils'
  export default {
    props: {
      imgUrl: String,
    },
    computed: {},
    directives: {
      image: {
        inserted(el) {
          var small = el.getElementsByClassName('small-image')[0]
          var block = el.getElementsByClassName('small-image-block')[0]
          var big = el.getElementsByClassName('big-image-block')[0]
          bigZoom(small, big, block)
          function bigZoom(small, big, mblock) {
            var evtx, evty, eleleftx, elelefty, bigwidth, bigheight;
            small.onmouseover = function (evt) {
              mblock.style.display = "block";
              big.parentNode.style.display = "block";
            };
            small.onmouseout = function () {
              mblock.style.display = "none";
              big.parentNode.style.display = "none";
            };
            small.onmousemove = function (evt) {
              let x, y;
              if (window.pageYOffset || window.pageXOffset) {    // all except IE
                y = window.pageYOffset;
                x = window.pageXOffset;
              } else if ((document.documentElement && document.documentElement.scrollTop) || (document.documentElement && document.documentElement.scrollLeft)) {// IE 6 Strict
                y = document.documentElement.scrollTop;
                x = document.documentElement.scrollLeft;
              } else if (document.body) {// all other IE
                y = document.body.scrollTop;
                x = document.body.scrollLeft;
              }
              evt = getEvt(evt);
              if (((1920 - window.innerWidth) / 2) > 460) {
                evtx = evt.clientX - (710 - ((1920 - 1000) / 2) - x)
              } else {
                evtx = evt.clientX - (710 - ((1920 - window.innerWidth) / 2) - x);
              }
              evty = evt.clientY - (230 - y);
              eleleftx = small.offsetLeft;
              elelefty = small.offsetTop;
              if (mblock.offsetWidth !== 0) {
                mblock.style.left = evtx - eleleftx - (mblock.offsetWidth / 2) + "px";
//                console.log('watch: evtx='+evtx+'  eleleftx='+eleleftx+'   mblock.offsetWidth='+mblock.offsetWidth+'   mblock.style.left='+mblock.style.left);
              }
              if (mblock.offsetHeight !== 0) {
                mblock.style.top = evty - elelefty - (mblock.offsetHeight / 2) + "px";
//                console.log('watch: evty='+evty+'  elelefty='+elelefty+'   mblock.offsetHeight='+mblock.offsetHeight+'   mblock.style.top='+mblock.style.top);
              }
              if (mblock.offsetLeft < 0) {
                mblock.style.left = "0px";
              }
              if (mblock.offsetTop < 0) {
                mblock.style.top = "0px";
              }
              if (mblock.offsetLeft >= small.offsetWidth - (mblock.offsetWidth)) {
                mblock.style.left = small.offsetWidth - (mblock.offsetWidth) + "px";
              }
              if (mblock.offsetTop >= small.offsetHeight - (mblock.offsetHeight)) {
                mblock.style.top = small.offsetHeight - (mblock.offsetHeight) + "px";
              }
              bigwidth = big.offsetWidth;
              bigheight = big.offsetHeight;
              big.style.left = "-" + (mblock.offsetLeft / (small.offsetWidth / bigwidth)) + "px";
              big.style.top = "-" + (mblock.offsetTop / (small.offsetHeight / bigheight)) + "px";
//              console.log('mblock.style.left '+ mblock.style.left)
//              console.log('mblock.offsetLeft '+ mblock.offsetLeft)
//              console.log('mblock.style.top '+ mblock.style.top)
//              console.log('mblock.offsetTop '+ mblock.offsetTop)
            };
            function getEvt(evt) {
              return evt || window.event;
            }
          }
        }
      }
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>
