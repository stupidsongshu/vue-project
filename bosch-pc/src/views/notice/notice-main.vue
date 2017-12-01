<template>
  <div>
    <v-header></v-header>
    <header-nav></header-nav>
    <div class="v-width padding-top-20">
      <el-row>
        <el-col :span="6" class="padding-right-20">
          <span class="big-title">公告</span>
          <el-menu theme="light" :unique-opened="true" :default-active="active" :router="true">
            <el-menu-item :index="item.noticeId" class="constraint-length" v-for="item in noticeList"
                          :key="item.noticeId">
              <i class="el-icon-arrow-right icon-size"></i>
              {{item.noticeTitle}}
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="18">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
    <div class="v-width padding-top-50 padding-bottom-40"></div>
    <v-footer></v-footer>
    <v-suspension></v-suspension>
  </div>
</template>
<script>
  import vHeader from '../components/header.vue'
  import headerNav from '../components/header-nav.vue'
  import vFooter from '../components/footer.vue'
  import vSuspension from '../components/suspension.vue'
  import {mapState, mapGetters} from 'vuex'
  export default{
    components: {
      'v-header': vHeader,
      'header-nav': headerNav,
      'v-footer': vFooter,
      'v-suspension': vSuspension,
    },
    created(){
      this.active = this.$route.params.noticeId;
    },
    mounted() {
      this.getNotice();
    },
    computed: {},
    data(){
      return {
        active: '',
        noticeList: [],
      }
    },
    methods: {
      getNotice(){
        this.$store.dispatch('logged_a_queryNoticeList').then((response) => {
            if (response.data.resultCode == 0) {
              this.noticeList = response.data.resultData.noticeList;
            }
          }
        )
      },
    },
    watch: {
      '$route'(to, from)
      {
        this.getNotice();
        this.active = this.$route.params.noticeId;
      }
    }
  }
</script>
<style>
</style>