<template>
  <div>
    <el-breadcrumb separator="/" class="big-title">
      <el-breadcrumb-item>积分有效期</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-loading="loading">
      <el-row style="padding:10px 10px;border:1px solid #d4d4d4;border-radius:3px;margin-top:8px;">
        <el-col>
          <el-form label-width="70px">
            <el-form-item label="我的积分 " class="margin-bottom-10">
            <span v-for="item in pointList">{{item.pointTypeName}}:
              <span class="padding-right-10">
              {{item.pointValue}}
              <span v-if="item.specialPoint>0">(特殊积分:{{getSpecialPoint(item)}})</span>
              </span>
            </span>
            </el-form-item>
          </el-form>
          <el-form :model="queryParam" label-width="70px" ref="queryParam">
            <el-row>
              <el-col :span="9" class="margin-right-10">
                <el-form-item label="积分类型" class="margin-bottom-10" prop="pointType">
                  <el-select v-model="queryParam.pointType" placeholder="请选择" clearable>
                    <el-option :key="item.pointType" :label="item.pointTypeName" :value='item.pointType' v-for="item in pointList"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-button type="primary" @click="queryPointDetailList(1)">搜索</el-button>
                <el-button type="primary" @click="resetForm()">重置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <el-row class="padding-top-10">
        <el-col>
          <template>
            <el-table :data="pointDetailList" style="width: 100%" border>
              <el-table-column prop="pointTypeName" label="积分类型" width="100"></el-table-column>
              <el-table-column prop="availablePoint" label="积分数值" width="100"></el-table-column>
              <el-table-column prop="availableSpecialPoint" label="含特殊积分" width="100"></el-table-column>
              <!--<el-table-column label="开始时间" width="100">-->
                <!--<template scope="scope">{{scope.row.createDate | getDate}}</template>-->
              <!--</el-table-column>-->
              <el-table-column label="有效期至" width="100">
                <template scope="scope">{{scope.row.endDate | getDate}}</template>
              </el-table-column>
              <el-table-column prop="remark" label="积分说明"></el-table-column>
            </el-table>
          </template>
          <div class="text-align-center margin-top-10 margin-bottom-10">
            <el-pagination layout="prev, pager, next"
                           :currentPage="page"
                           :total="total"
                           :page-size="10"
                           @current-change="queryPointDetailList"></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import _ from 'lodash'
  export default{
    mounted() {
      this.queryPointDetailList(1);
      this.getPoint();
    },
    computed: {},
    data(){
      return {
        queryParam: {
          pointType: '',
        },
        pointList: [],
        pointDetailList: [],
        page: 1,
        total: null,
        loading: false,
      }
    },
    methods: {
      queryPointDetailList(page){
        if (page < 1) {
          return;
        }
        this.page = page;
        let params = _.assign(this.queryParam, {
          page: this.page,
          pageSize: '10',
        });
        this.loading = true;
        this.$store.dispatch('user_a_queryPointDetailList', {params: params}).then((response) => {
          this.loading = false;
          if (response.data.resultCode == 0) {
            this.pointDetailList = response.data.resultData.pointDetailList;
            this.total = response.data.resultData.pageInfo.totalCounts;
          }
        }, () => {
          this.loading = false;
        })
      },
      getPoint(){
        this.$store.dispatch('user_a_getPoint').then((response) => {
          if (response.data.resultCode == 0) {
            this.pointList = response.data.resultData.pointList;
          }
        })
      },
      getSpecialPoint(item){
        if (item.specialPoint <= item.pointValue) {
          return item.specialPoint
        } else {
          return item.pointValue
        }
      },
      resetForm(){
        this.$refs.queryParam.resetFields();
        this.queryPointDetailList(1);
      },
    }
  }
</script>
<style>
</style>