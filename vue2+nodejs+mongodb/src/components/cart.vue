<template>
  <div>
    <p>这是购物车页面</p>
    <p>$route.query:{{$route.query.id}}</p>
    <p>$route.params:{{$route.params.id}}</p>

    <button @click="back">返回上一页</button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      back() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style>

</style>
