<template>
  <div>
    <el-steps :space="100" :active="active" finish-status="success">
      <el-step title="购物车"></el-step>
      <el-step title="确认订单"></el-step>
      <el-step title="等待发货"></el-step>
      <el-step title="货物送达"></el-step>
    </el-steps>
    <!--<el-button style="margin-top: 12px;" @click="next">下一步</el-button>-->
  </div>
</template>
<script>
  export default{
    props: {
      active: Number,
    },
    data(){
      return {}
    },
    methods: {
      next() {
//        if (this.active++ > 2) this.active = 0;
      }
    }
  }
</script>
<style>
</style>