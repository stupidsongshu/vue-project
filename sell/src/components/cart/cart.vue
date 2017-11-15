<template>
  <div class="cart">
    <div class="content">
      <div class="content-left" @click="toggleCart">
        <div class="logo-wrapper">
          <div class="logo" :class="{highlight: totalCount > 0}">
            <i class="icon-shopping_cart" :class="{highlight: totalCount > 0}"></i>
          </div>
          <div class="num" v-if="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{highlight: totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" :class="payClass">{{payDesc}}</div>
    </div>

    <transition name="toggle">
      <div class="cart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="food in selectedFoods">
              <span class="name">{{food.name}}</span>
              <div class="cartcontrol-wrapper">
                <span class="price">￥{{food.price * food.count}}</span>
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from '../cartcontrol/cartcontrol';

  export default {
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectedFoods: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        listShow: false,
        fold: true // 购物车详情是否折叠
      };
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectedFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectedFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}起送`;
        } else if (this.totalPrice < this.minPrice) {
          return `还差${this.minPrice - this.totalPrice}起送`;
        } else {
          return `去结算`;
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      }
    },
    components: {
      cartcontrol
    },
    methods: {
      toggleCart() {
        if (this.selectedFoods.length > 0) {
          this.listShow = !this.listShow;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cart
    position: fixed
    left: 0
    right: 0
    bottom: 0
    z-index: 0
    width: 100%
    height: 48px
    background-color: #141d27
    .content
      display: flex
      .content-left
        flex-grow: 1
        font-size: 0
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          width: 56px
          height: 56px
          margin: 0 12px
          padding: 6px
          border-radius: 50%
          background-color: #141d27
          .logo
            position: absolute
            width: 44px
            height: 44px
            text-align: center
            border-radius: 50%
            background-color: #2b343c
            &.highlight
              background-color: rgb(0,160,220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            font-size: 9px
            font-weight: 700
            border-radius: 16px
            color: #fff
            background-color: rgb(240,20,20)
            box-shadow: 0 4px 8px 0 rgba(0,0,0,.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          padding-right: 12px
          line-height: 24px
          border-right: 1px solid rgba(255,255,255,.1)
          font-size: 16px
          font-weight: 700
          color: rgba(255,255,255,.4)
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin-left: 12px
          line-height: 48px
          font-size: 14px
          color: rgba(255,255,255,.4)
      .content-right
        flex: 0 0 105px
        width: 105px
        line-height: 48px
        text-align: center
        font-size: 12px
        font-weight: 700
        color: rgba(255,255,255,.4)
        &.not-enough
          background-color: #2b333b
        &.enough
          color: #fff
          background-color: rgb(0,160,220)

    .cart-list
      position: absolute
      left: 0
      bottom: 48px
      z-index: -999
      width: 100%
      &.toggle-enter, &.toggle-leave-to
        transform: translate3d(0,100%,0)
      &.toggle-enter-active, &.toggle-leave-active
        transition: all 1s ease
      .list-header
        display: flex
        justify-content: space-between
        width: 100%
        height: 40px
        padding: 0 18px
        line-height: 40px
        border-bottom: 1px solid rgba(7,17,27,.1)
        background-color: #f3f5f7
        .title
          color: rgb(7,17,27)
          font-size: 14px
          font-weight: normal
        .empty
          color: rgb(0,160,220)
          font-size: 12px
      .list-content
        width: 100%
        padding: 0 18px
        max-height: 217px
        background-color: #fff
        overflow: scroll
        .food
          display: flex
          justify-content: space-between
          align-items: center
          width: 100%
          height: 48px
          border-bottom: 1px solid rgba(7,17,27,.1)
          .name
            color: rgb(7,17,27)
            font-size: 14px
          .cartcontrol-wrapper
            display: flex
            align-items: center
            .price
              margin-right: 12px
              color: rgb(240,20,20)
              font-size: 14px
              font-weight: 700
</style>
