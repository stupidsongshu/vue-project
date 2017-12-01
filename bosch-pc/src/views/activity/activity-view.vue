<template>
  <div v-loading="loading">
    <el-breadcrumb separator="/" class="big-title">
      <el-breadcrumb-item :to="{name:'activity-list',params:{activityType:activityType}}">{{getActivityTypeName}}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{activityName}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="margin-top-10">
      <el-form label-width="70px">
        <el-form-item label="活动名称 : " class="margin-bottom-0">{{activityInfo.activityName}}</el-form-item>
        <el-form-item label="活动时间 : " class="margin-bottom-0">
          {{activityInfo.startDate|getDateTime}} ~{{activityInfo.endDate|getDateTime}}
        </el-form-item>
        <el-form-item label="活动地址 : " class="margin-bottom-0" v-if="activityType!='03'&&getTimeReturn">
          <router-link
            :to="{ name: 'activity-begin',query:{activityId:activityInfo.activityId,activityType:activityInfo.activityType,activityName:activityInfo.activityName}}"
            style="text-decoration:none;color:#333">点击进入活动页面
          </router-link>
        </el-form-item>
        <el-form-item label="活动状态 : " class="margin-bottom-0" v-if="!getTimeReturn">活动已结束</el-form-item>
        <el-form-item label="活动内容 : " class="margin-bottom-0">
          <div class="ql-editor-style" style="margin-top:4px;">
            <div v-html="activityInfo.activityDesc" style="max-width:100%;line-height:25px;"
                 class="ql-editor">
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import _ from 'lodash'
  import {dateUtils} from '../../utils'
  import {mapGetters, mapState} from 'vuex'
  export default{
    components: {
    },
    computed: {
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
      }),
      ...mapState({
        activityTypeMap: state => state.dict.activityTypeMap,
      }),
      getActivityTypeName(){
        for (let item in this.activityTypeMap) {
          if (this.activityTypeMap[item].key === this.activityType) {
            return this.activityTypeMap[item].value
          }
        }
      },
      getTimeReturn(){
        let NowTime = dateUtils.getDateTime(new Date());
        let endTime = dateUtils.getDateTime(this.activityInfo.endDate);
        return dateUtils.comptime(NowTime,endTime)
      }
    },
    mounted() {
      this.getActivityInfo();
    },
    data(){
      return {
        activityInfo: {},
        activityName: '',
        activityId: '',
        activityType: '',
        loading: false,
      }
    },
    methods: {
      getActivityInfo(){
        this.activityType = this.$route.query.activityType;
        this.activityId = this.$route.query.activityId;
        this.activityName = this.$route.query.activityName;
        let params = {
          activityId: this.activityId,
        };
        this.loading = true;
        this.$store.dispatch('activity_a_getActivityInfo', {params: params}).then((response) => {
          this.loading = false;
          if (response.data.resultCode === '0') {
            this.activityInfo = response.data.resultData.activityInfo;
          }
        }, () => {
          this.loading = false;
        })
      },
    },
    watch: {
      '$route' (to, from) {
        this.getActivityInfo();
      }
    }
  }
</script>
<style>
</style>
