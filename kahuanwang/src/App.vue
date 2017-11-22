<template>
  <div id="app" :class="{'has-footer': hasFooter}" ref="app">
    <router-view/>
    <tab-bar :hasFooter="hasFooter"></tab-bar>
  </div>
</template>

<script>
  import tabBar from './components/common/tabbar.vue'
  export default {
    name: 'app',
    data() {
      return {
        hasFooter: true
      }
    },
    components: {
      'tab-bar': tabBar
    },
    mounted() {
      /* var w = document.documentElement.clientWidth
      var h = document.documentElement.clientHeight
      console.log(w, h)
      this.$refs.app.style.width = w + 'px'
      this.$refs.app.style.minHeight = h + 'px' */
    }
  }
</script>

<style lang="stylus">
  #app
    /*width: 10rem*/
    /*max-width: 600px*/
    min-height: 100%
    margin: 0 auto
    padding-top: 45px
  .has-footer
    padding-bottom: 56px
</style>
