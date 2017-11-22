<template>
  <div class="index">
    <div class="bg-header">
      <div class="card-wrapper"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .index
    .bg-header
      width: 100%
      /*height: 238px*/
      height: 478px
      font-size: 20px
      background-image: url("../assets/img/bg.png")
      background-repeat: no-repeat
      /*background-size: 100% 238px*/
      background-size: 100% 478px
</style>
