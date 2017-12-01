<template>
  <div>
    <home-before-login v-if="!userInfo"></home-before-login>
    <home-after-login v-if="!!userInfo"></home-after-login>
    <v-footer></v-footer>
    <v-suspension></v-suspension>
  </div>
</template>
<style>
</style>
<script type="text/ecmascript-6">
  import homeBeforeLogin from './home-before-login.vue'
  import homeAfterLogin from './home-after-login.vue'
  import vFooter from '../components/footer.vue'
  import vSuspension from '../components/suspension.vue'
  import {mapGetters} from 'vuex'
  export default{
    components: {
      'home-before-login': homeBeforeLogin,
      'home-after-login': homeAfterLogin,
      'v-footer': vFooter,
      'v-suspension': vSuspension,
    },
    mounted() {
    },
    computed: {
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
      }),
    },
    data () {
      return {}
    },
    methods: {}
  }
</script>
