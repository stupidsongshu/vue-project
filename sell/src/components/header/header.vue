<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="sellerData.avatar" width="64" height="64" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{sellerData.name}}</span>
        </div>
        <div class="description">
          {{sellerData.description}}/{{sellerData.deliveryTime}}分钟
        </div>
        <div class="support" v-if="sellerData.supports">
          <span class="icon" :class="classMap[sellerData.supports[0].type]"></span>
          <span class="text">{{sellerData.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="sellerData.supports" class="support-count" @click="showDetail">
        <span class="count">{{sellerData.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>

    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{sellerData.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>

    <div class="background">
      <img :src="sellerData.avatar" alt="" width="100%" height="100%">
    </div>

    <!--sticky footer-->
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{sellerData.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="sellerData.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports">
            <li class="support-item" v-for="(item,index) in sellerData.supports">
              <span class="icon" :class="classMap[sellerData.supports[index].type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>

          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p>{{sellerData.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star';

  export default {
    props: {
      sellerData: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    components: {
      star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";

  .header
    position: relative
    color: #fff
    background-color: rgba(7,17,27,.5)
    overflow: hidden
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        .title
          margin: 2px 0 8px 0
          font-size: 16px
          .brand
            display: inline-block
            width: 30px
            height: 18px
            bg-img('brand')
            background-size: 30px 18px
            vertical-align: top
          .name
            margin-left: 6px
            font-size: 16px
            font-weight: bold
            line-height: 18px
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .support
          font-size: 0
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-img('decrease_1')
            &.discount
              bg-img('discount_1')
            &.guarantee
              bg-img('guarantee_1')
            &.invoice
              bg-img('invoice_1')
            &.special
              bg-img('special_1')
          .text
            line-height: 12px
            font-size: 10px
      .support-count
        position: absolute
        right: 12px
        bottom: 18px
        padding: 0 8px
        height: 24px
        margin-right: 2px
        line-height: 26px
        font-size: 10px
        border-radius: 14px
        background-color rgba(0,0,0,.2)
        .count
          vertical-align: top
    .bulletin-wrapper
      position: relative
      height: 28px
      padding: 0 22px 0 12px
      line-height: 28px
      background-color: rgba(7,17,27,.2)
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      .bulletin-title
        display: inline-block
        width: 22px
        height: 12px
        margin-top: 8px
        bg-img('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
        vertical-align: top
      .bulletin-text
        margin: 0 4px
        font-size: 10px
        vertical-align: top
      .icon-keyboard_arrow_right
        position: absolute
        right: 12px
        top: 50%
        transform: translateY(-50%)
    .background
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0
      z-index: -1
      filter: blur(10px)
    .detail
      position: fixed
      top: 0
      left: 0
      z-index: 100
      width: 100%
      height: 100%
      background-color: rgba(7,17,27,.8)
      backdrop-filter: blur(10px)//背景模糊 olny ios
      overflow: auto
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            font-size: 16px
            font-weight: 700
            line-height: 16px
            text-align: center
          .star-wrapper
            margin-top: 16px
            text-align: center
          .title
            display: flex
            width: 80%
            margin: 28px auto 24px auto
            .line
              flex: 1
              position: relative
              top: -9px//(19-1)/2=9
              border-bottom: 1px solid rgba(255,255,255,.2)
            .text
              padding: 0 12px
              font-size: 14px
              font-weight: 700
          .supports
            width: 80%
            margin: 0 auto
            padding: 0 12px
            .support-item
              margin-bottom: 12px
              font-size: 0
              &:last-child
                margin-bottom: 0
              .icon
                display: inline-block
                width: 16px
                height: 16px
                margin-right: 6px
                background-size: 16px 16px
                background-repeat: no-repeat
                vertical-align: top
                &.decrease
                  bg-img('decrease_2')
                &.discount
                  bg-img('discount_2')
                &.special
                  bg-img('special_2')
                &.invoice
                  bg-img('invoice_2')
                &.guarantee
                  bg-img('guarantee_2')
              .text
                font-size: 12px
                line-height: 16px
          .bulletin
            width: 80%
            margin: 0 auto
            padding: 0 12px
            font-size: 12px
            line-height: 24px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both
        font-size: 32px
</style>
