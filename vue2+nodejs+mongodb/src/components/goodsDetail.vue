<template>
  <div>
    这是商品详情页面,goodsId:{{$route.params.goodsId}}

    <div>
      <router-link to="/cart">进入购物车</router-link>
      <button @click="toCart">编程式导航</button>
    </div>

    <div>
      <h3>命名路由</h3>
      <router-link :to="{name:'cartName', params:{id: 3}}">进入购物车</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    created() {
      console.log(this.$route);
    },
    methods: {
      toCart() {
//        字符串
//        this.$router.push('/cart');

//        对象
//        this.$router.push({
//          path:'/cart'
//        });

//        传递参数
//        this.$router.push({
//          path: '/cart?id=1'
//        });

//        传递参数
        this.$router.push({
          path: '/cart',
          query: {
            id: 2
          }
        });
      }
    }
  }
</script>

<style>

</style>
