<template>
  <div>
    <el-breadcrumb separator="/" class="big-title">
      <el-breadcrumb-item>全部分类</el-breadcrumb-item>
    </el-breadcrumb>
    <item-list-view :ids="ids"></item-list-view>
  </div>
</template>
<script>
  import itemListView from './components/item-list-view.vue'
  export default{
    components: {
      'item-list-view': itemListView,
    },
    mounted() {
      this.ids.keyword = this.$route.query.keyword;
//      console.log(this.ids.keyword)
    },
    computed: {},
    data(){
      return {
        ids: {
          categoryId: '',
          tagId: '',
          keyword: '',
        },
      }
    },
    methods: {},
    watch: {
      '$route' (to, from) {
        this.ids.keyword = this.$route.query.keyword;
      }
    }

  }
</script>
<style>
</style>