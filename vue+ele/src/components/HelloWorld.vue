<template>
    <div>
      <router-link to="/">ele UI</router-link>
      <router-link to="/assistantFn">assistantFn</router-link>
      <router-view></router-view>
    </div>
</template>

<script>
  export default {
    name: 'HelloWorld'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #adab52;
  }
</style>
