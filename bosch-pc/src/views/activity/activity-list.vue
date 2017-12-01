<template>
  <div v-loading="loading">
    <el-breadcrumb separator="/" class="big-title">
      <el-breadcrumb-item>{{getActivityTypeName}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-if="activityList.length>0">
      <div class="table-style-none table-align-left">
        <el-table :data="activityList" style="width: 100%;margin-top:5px;text-align:left;">
          <el-table-column type="index" width="30"></el-table-column>
          <el-table-column label="活动名称">
            <template scope="scope">
              <router-link
                :to="{ name: 'activity-view',query:{activityId:scope.row.activityId,activityType:scope.row.activityType,activityName:scope.row.activityName}}"
                style="text-decoration:none;color:#333">{{scope.row.activityName}}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column label="活动状态">
            <template scope="scope">
              {{scope.row.endDate | getDateTime}}
            </template>
          </el-table-column>
          <el-table-column label="活动截止时间">
            <template scope="scope">
              {{scope.row.endDate | getDateTime}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="text-align-center margin-top-10 margin-bottom-10">
        <el-pagination layout="prev, pager, next"
                       :currentPage="page"
                       :total="total"
                       :page-size="10"
                       @current-change="queryActivityList"></el-pagination>
      </div>
    </div>
    <p v-if="activityList.length===0" class="text-align-center margin-top-10">暂时无该活动~</p>
  </div>
</template>
<script>
  import _ from 'lodash'
  import {mapGetters, mapState} from 'vuex'
  export default{
    computed: {
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
      }),
      ...mapState({
        activityTypeMap: state => state.dict.activityTypeMap,
      }),
      getActivityTypeName(){
        for (let item in this.activityTypeMap) {
          if (this.activityTypeMap[item].key === this.queryParam.activityType) {
            return this.activityTypeMap[item].value
          }
        }
      }
    },
    mounted() {
      this.queryParam.activityType = this.$route.params.activityType;
      this.queryActivityList();
      if (!!this.userInfo) {
        this.$store.dispatch('dict_a_queryDictByName', 'activityTypeMap')
      }
    },
    data(){
      return {
        activityList: [],
        queryParam: {
          activityCode: '',
          activityName: '',
          activityType: '',
        },
        page: 1,
        total: null,
        loading: false,
      }
    },
    methods: {
      queryActivityList(page){
        if (page < 1) {
          return;
        }
        this.page = page;
        let params = _.assign(this.queryParam, {
          page: this.page,
          pageSize: '10',
        });
        this.loading = true;
        this.$store.dispatch('activity_a_queryActivityList', {params: params}).then((response) => {
          this.loading = false;
          if (response.data.resultCode === '0') {
            this.activityList = response.data.resultData.activityList || [];
            this.total = response.data.resultData.pageInfo.totalCounts;
          }
        }, () => {
          this.loading = false;
        })
      },
      goToWeb(){

      },
    },
    watch: {
      '$route' (to, from) {
        this.queryParam.activityType = this.$route.params.activityType;
        this.queryActivityList();
        if (!!this.userInfo) {
          this.$store.dispatch('dict_a_queryDictByName', 'activityTypeMap')
        }
      }
    }
  }
</script>
<style>
</style>
