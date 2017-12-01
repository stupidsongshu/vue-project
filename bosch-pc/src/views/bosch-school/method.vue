<template>
  <div>
    <el-row>
      <el-col class="padding-right-20">
        <span class="big-title">安装方法</span>
      </el-col>
      <div class="padding-top-50">
        <el-row>
          <el-col :span="24" v-for="(item,index) in methodFile" :key="item.text" class="margin-bottom-10">
            <el-card :body-style="{ padding: '10px', }">
              <el-row>
                <el-col :span="2" class="margin-right-10"><img :src="item.image" style="width:60px;height:60px">
                </el-col>
                <el-col :span="18" class="margin-right-10"><span style="line-height:60px;"
                                                                 class="constraint-length block">{{item.text}}</span>
                </el-col>
                <el-col :span="3" style="line-height:60px;">
                  <el-button type="primary">
                    <a style="color:#fff;text-decoration:none;" @click="canDownload(item.file)">下载文件</a>
                  </el-button>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-row>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    computed: {
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
      }),
    },
    data(){
      return {
        methodFile: [
          {
            image: require('../../assets/images/catalog.png'),
            text: '博世学堂_喷油器安装方法',
            file: require('../../assets/files/博世学堂_喷油器安装方法.pdf'),
          },
        ],
      }
    },
    methods: {
      canDownload(file){
        if (!!this.userInfo) {
          window.open(file)
        } else {
          this.$confirm('必须登录才能下载,是否登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push({name: 'login', query: {path: 'bosch-school/method'}})
          }).catch(() => {
            console.log('000')
          });
        }

      },
    }
  }
</script>
<style>
</style>