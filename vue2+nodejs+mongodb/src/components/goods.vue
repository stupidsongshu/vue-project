<template>
  <div>
    <h1>这是商品列表goods页面</h1>

    <div>
      <router-link to="/goodsDetail/123">跳转到商品详情页</router-link>
    </div>

    <div>
      <h2>商品子组件</h2>
      <router-link to="/goods/title">商品标题</router-link>
      <router-link to="/goods/image">商品图片</router-link>
    </div>

    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {

  }
</script>

<style>

</style>
