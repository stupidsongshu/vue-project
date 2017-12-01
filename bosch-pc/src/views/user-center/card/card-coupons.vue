<template>
  <div>
    <el-breadcrumb separator="/" class="big-title">
      <el-breadcrumb-item>我的卡券</el-breadcrumb-item>
    </el-breadcrumb>
    <p>正在装修中....</p>
  </div>
</template>
<script>
  export default{
    mounted() {
//      this.categoryId = this.$route.params.categoryId
    },
    data(){
      return {
        categoryId: ''
      }
    },
    methods: {}
  }
</script>
<style>
</style>