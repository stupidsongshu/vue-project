<template>
  <div id="app" :class="{'has-footer': hasFooter}">
    <!--<mt-header class="header" title="卡还王">
      <router-link to="/identity" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link class="icon-news" to="/newsCenter" slot="right"></router-link>
    </mt-header>-->

    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <tab-bar :hasFooter="hasFooter"></tab-bar>
  </div>
</template>

<script>
  import Vue from 'vue'
  import tabBar from './components/common/tabbar.vue'

  export default {
    name: 'app',
    data() {
      return {
        hasFooter: true,
        transitionName: 'slide-left'
      }
    },
    components: {
      'tab-bar': tabBar
    },
    created() {
      /* eslint-disable no-undef */
      Vue.prototype.app = app
      Vue.prototype.retreat = app.back
      console.log(app)
    },
    // dynamically set transition based on route change
    watch: {
      '$route'(to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        console.log(this.transitionName)
        // 有个bug,刷新页面后watch $route不会执行
        /* if (to.meta.headerTitle !== undefined) {
          this.headerTitle = to.meta.headerTitle
        } */
      }
    },
    methods: {
      isLogin() {
        console.log(this.app.isLogin())
      }
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
