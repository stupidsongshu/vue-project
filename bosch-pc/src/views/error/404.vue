<template>
    <div>
        <div>404 页面不存在</div>
        <el-button type="primary" @click="back">回到主页</el-button>
    </div>
</template>
<script>
    export default {
      data(){
        return{}
      },
        methods: {
            back(){
                this.$router.push({path:'/'});
            }
        }
    }
</script>
