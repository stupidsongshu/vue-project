<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="/goods">跳转到商品列表页面</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
