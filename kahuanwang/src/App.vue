<template>
  <div id="app" :class="{'has-footer': hasFooter}">
    <router-view/>
    <!--<tab-bar :hasFooter="hasFooter"></tab-bar>-->
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
    }
  }
</script>

<style lang="stylus">
  #app
    max-width: 600px
    /*min-height: 100%*/
    margin: 0 auto
    padding-top: 45px
  .has-footer
    padding-bottom: 56px
</style>
