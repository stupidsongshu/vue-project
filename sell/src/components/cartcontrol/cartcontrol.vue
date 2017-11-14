<template>
  <div class="cart-control">
    <transition name="animate">
      <div class="cart-decrease" v-show="food.count > 0" @click="decreaseCart">
        <i class="icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-increase" @click="increaseCart">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      increaseCart() {
        if (!this.food.count) {
//          受现代 JavaScript 的限制 (以及废弃 Object.observe)，Vue 不能检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，所以属性必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的。
//          this.food.count = 1;
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        console.log(this.food.count);
      },
      decreaseCart() {
        this.food.count--;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*.cart-control
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      .icon-remove_circle_outline
        color: rgb(7, 17, 27)
        font-size: 24px
        line-height: 24px
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      color: rgb(147, 153, 159)
      font-size: 10px
    .cart-increase
      display: inline-block
      padding: 6px
      color: rgb(0, 160, 220)
      font-size: 24px
      line-height: 24px

  .animate-enter, .animate-leave-to
    opacity: 0
    transform: translateX(40px) rotate(180deg)
  .animate-enter-active
    transition: all .5s ease
  .animate-leave-active
    transition: all .5s ease*/

  .cart-control
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      .icon-remove_circle_outline
        display: inline-block
        color: rgb(7, 17, 27)
        font-size: 24px
        line-height: 24px
        transition: all 1s ease
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      color: rgb(147, 153, 159)
      font-size: 10px
    .cart-increase
      display: inline-block
      padding: 6px
      color: rgb(0, 160, 220)
      font-size: 24px
      line-height: 24px

  /*.animate-transition
    opacity: 1
    transform: translate3D(20px, 0, 0)*/

  .animate-enter, .animate-leave-to
    opacity: 0
    transform: translate3D(40px, 0, 0) rotate(180deg)
    /*.icon-remove_circle_outline
      transform: rotate(180deg)*/

  .animate-enter-active, .animate-leave-active
    transition: all .3s ease
    /*.icon-remove_circle_outline
      transition: all 5s ease*/
</style>
