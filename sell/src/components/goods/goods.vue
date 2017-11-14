<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul class="menu-list">
        <li class="menu-item border-1px" v-for="(item,index) in goods" :class="{current: currentIndex == index}" @click="selectMenu(index, $event)">
          <span class="text">
            <span class="icon" v-if="item.type > 0" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li class="foods-list food-list-hook" v-for="item in goods">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="foods-item border-1px" v-for="food in item.foods">
              <div class="icon">
                <img :src="food.icon" width="57" height="57" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <cart :delivery-price="seller.deliveryPrice" :minPrice="seller.minPrice" :selectedFoods="selectedFoods"></cart>
  </div>
</template>

<script type="text/ecmascript-6">
  import BetterScroll from 'better-scroll';
  import cart from '../cart/cart.vue';
  import cartControl from './../cartcontrol/cartcontrol';

  const ERROR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((res) => {
        res = res.body;
        if (res.errorNum === ERROR_OK) {
          this.goods = res.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
    },
    methods: {
      selectMenu(index, event) {
        /* if (event._constructed) {
          return;
        } */
//        this.currentIndex = index;
        console.log(index);
//        let height = this.listHeight[index];
//        console.log(this.$refs.foodsWrapper.style);
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let eleNode = foodList[index];
        this.foodsScroll.scrollToElement(eleNode, 500);
      },
//      初始化
      _initScroll() {
        this.menuScroll = new BetterScroll(this.$refs.menuWrapper, {
          click: true // better-scroll初始化默认阻止点击事件
        });
        this.foodsScroll = new BetterScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
          console.log(this.scrollY);
        });
      },
//      计算高度
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
//          注意:遍历到最后一个的时候height2是undefined
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectedFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    components: {
      cart,
      cartControl
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 48px
    width: 100%
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background-color: #f3f5f7
      overflow: hidden
      .menu-list
        .menu-item
          display: table
          width: 80px
          height: 54px
          padding: 0 12px
          line-height: 14px
          border-1px(rgba(7, 17, 27, .1))
          .text
            display: table-cell
            color: rgb(24, 20, 20)
            font-size: 12px
            vertical-align: middle
            .icon
              display: inline-block
              width: 12px
              height: 12px
              margin-right: 2px
              background-size: 12px 12px
              background-repeat: no-repeat
              vertical-align: top
              &.decrease
                bg-img('decrease_3')
              &.discount
                bg-img('discount_3')
              &.special
                bg-img('special_3')
              &.invoice
                bg-img('invoice_3')
              &.guarantee
                bg-img('guarantee_3')
          &.current
            position: relative
            z-index: 999
            margin-top: -1px
            font-weight: 700
            background-color: #fff
            border-none()
    .foods-wrapper
      flex-grow: 1
      overflow: hidden
      .foods-list
        .title
          height: 26px
          margin: 0
          padding-left: 14px
          line-height: 26px
          color: rgb(147, 153, 159)
          border-left: 2px solid #d9dde1
          background-color: #f3f5f7
          font-weight: normal
          font-size: 12px
        .foods-item
          display: flex
          padding: 18px
          border-1px(rgba(7, 17, 27, .1))
          &:last-child
            border-none()
          .icon
            flex-basis: 57px
            margin-right: 10px
          .content
            flex-grow: 1
            .name
              margin: 0
              padding-top: 2px
              line-height: 14px
              color: rgb(7, 17, 27)
              font-size: 14px
            .desc, .extra
              line-height: 10px
              font-size: 10px
              color: rgb(147, 153, 159)
            .desc
              margin: 8px 0
            .extra
              span:first-child
                margin-right: 12px
                font-size: 10px
            .price
              line-height: 24px
              font-weight: 700
              .now
                margin-right: 8px
                color: #f01414
                font-size: 14px
              .old
                color: rgb(147, 153, 159)
                font-size: 10px
                text-decoration: line-through
            .cart-control-wrapper
              position: absolute
              right: 0
              bottom: 12px
              z-index: 999
</style>
