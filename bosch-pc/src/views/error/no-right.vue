<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>访问错误</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <div>
                <div>您暂时没有相关权限！</div>
                <el-button type="primary" @click.native="backIndex">返回主页</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {}
        },
        computed: {},
        methods: {
            backIndex (){
                this.$router.push({name: 'home'});
            }
        }
    }
</script>
