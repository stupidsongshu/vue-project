<template>
  <div>
    <el-breadcrumb separator="/" class="big-title">
      <el-breadcrumb-item :to="{name:'item-search-all-list'}">全部分类</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in categoryInfo.parentList" :key="item.categoryId"
                          :to="{name:'item-list',query:{categoryId:item.categoryId}}">
        {{item.categoryName}}
      </el-breadcrumb-item>
      <el-breadcrumb-item v-if="!!this.ids.categoryId && this.ids.categoryId != ''">{{categoryInfo.categoryName}}
      </el-breadcrumb-item>
      <el-breadcrumb-item v-if="!!this.ids.tagId && this.ids.tagId != ''">{{tagName}}</el-breadcrumb-item>
    </el-breadcrumb>
    <item-list-view :ids="ids"></item-list-view>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  import itemListView from './components/item-list-view.vue'
  export default{
    components: {
      'item-list-view': itemListView,
    },
    mounted() {
      if (!!this.$route.query.categoryId) {
        this.ids.categoryId = this.$route.query.categoryId;
        this.ids.tagId = this.$route.query.tagId || '';
      } else if (!!this.$route.query.tagId) {
        this.ids.tagId = this.$route.query.tagId;
        this.ids.categoryId = this.$route.query.categoryId || '';
        this.$store.dispatch('dict_a_queryItemTagCategoryData');
      }
      this.getItemCategoryOrTag();
    },
    computed: {
      ...mapState({
        itemTagCategoryList: state => state.dict.itemTagCategoryList,
      }),
    },
    data(){
      return {
        ids: {
          categoryId: '',
          tagId: '',
        },
        categoryInfo: {},
        tagName: ''
      }
    },
    methods: {
      getItemCategoryOrTag(){
        if (!!this.ids.categoryId && this.ids.categoryId != '') {
          this.$store.dispatch('item_a_getItemCategoryInfo', {params: this.ids.categoryId}).then((response) => {
            if (response.data.resultCode == 0) {
              this.categoryInfo = response.data.resultData.categoryInfo;
            }
          })
        } else if (!!this.ids.tagId && this.ids.tagId != '') {
          this.categoryInfo = {};
          for (let item in this.itemTagCategoryList) {
            if (this.itemTagCategoryList[item].tagId === this.ids.tagId) {
              this.tagName = this.itemTagCategoryList[item].tagName
            }
          }
        }

      },
    },
    watch: {
      '$route' (to, from) {
        if (!!this.$route.query.categoryId) {
          this.ids.categoryId = this.$route.query.categoryId;
          this.ids.tagId = this.$route.query.tagId || '';
        } else if (!!this.$route.query.tagId) {
          this.ids.tagId = this.$route.query.tagId;
          this.ids.categoryId = this.$route.query.categoryId || '';
        }
        this.getItemCategoryOrTag();
      }
    }
  }
</script>
<style>
</style>