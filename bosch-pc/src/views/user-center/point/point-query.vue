<template>
  <div>
    <el-breadcrumb separator="/" class="big-title">
      <el-breadcrumb-item>积分查询</el-breadcrumb-item>
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
          <el-form :model="queryParam" label-width="70px" :rules="queryParamRulse" ref="queryParam">
            <el-row>
              <el-col :span="9">
                <el-form-item label="积分变更" class="margin-bottom-10" prop="inout">
                  <el-select v-model="queryParam.inout" placeholder="请选择" clearable>
                    <el-option key="1" label="获得" value="1"></el-option>
                    <el-option key="-1" label="消费" value="-1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="积分说明" class="margin-bottom-10" prop="remark">
                  <el-input v-model="queryParam.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="起止时间" class="margin-bottom-10">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item prop="recordTimeFrom">
                        <el-date-picker type="date" placeholder="选择日期"
                                        v-model="queryParam.recordTimeFrom"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="8">
                      <el-form-item prop="recordTimeTo" class="margin-bottom-10">
                        <el-date-picker type="date" placeholder="选择日期"
                                        v-model="queryParam.recordTimeTo"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="积分范围" class="margin-bottom-10">
                <el-col :span="4">
                  <el-form-item prop="pointValueFrom">
                    <el-input v-model="queryParam.pointValueFrom" class="width-100" placeholder="最小值"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line  padding-left-7" :span="1">-</el-col>
                <el-col :span="4">
                  <el-form-item prop="pointValueTo" class="margin-bottom-10">
                    <el-input v-model="queryParam.pointValueTo" class="width-100" placeholder="最大值"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-button type="primary" @click="queryPointHistoryList(1)">搜索</el-button>
                  <el-button type="primary" @click="resetForm()">重置</el-button>
                </el-col>
              </el-form-item>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <el-row class="padding-top-10">
        <el-col>
          <template>
            <el-table :data="pointHistoryList" style="width: 100%" border>
              <el-table-column prop="pointTypeName" label="积分类型" width="100"></el-table-column>
              <el-table-column prop="pointValue" label="积分数值" width="100"></el-table-column>
              <el-table-column label="积分变更" width="100">
                <template scope="scope">{{getInoutTypeName(scope.row.inout)}}</template>
              </el-table-column>
              <el-table-column label="记录时间" width="100">
                <template scope="scope">{{scope.row.recordTime | getDate}}</template>
              </el-table-column>
              <el-table-column prop="remark" label="积分说明"></el-table-column>
            </el-table>
          </template>
          <div class="text-align-center margin-top-10 margin-bottom-10">
            <el-pagination layout="prev, pager, next"
                           :currentPage="page"
                           :total="total"
                           :page-size="10"
                           @current-change="queryPointHistoryList"></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import _ from 'lodash'
  import {dateUtils} from '../../../utils'
  import validators from '../../../common/validators.js'
  export default{
    mounted() {
      this.queryPointHistoryList(1);
      this.getPoint();
    },
    computed: {},
    data(){
      return {
        queryParamRulse: {
          pointValueFrom: [
            {validator: validators.checkInteger, trigger: 'change'}
          ],
          pointValueTo: [
            {validator: validators.checkInteger, trigger: 'change'}
          ],
        },
        queryParam: {
          inout: '',
          recordTimeFrom: '',
          recordTimeTo: '',
          remark: '',
          pointValueFrom: '',
          pointValueTo: ''
        },
        pointList: [],
        page: 1,
        total: null,
        pointHistoryList: [],
        loading: false,
      }
    },
    methods: {
      queryPointHistoryList(page){
        this.loading = true;
        if (page < 1) {
          this.loading = false;
          return;
        }
        this.page = page;
        if (!!this.queryParam.recordTimeTo) {
          this.queryParam.recordTimeTo = dateUtils.getDate(this.queryParam.recordTimeTo)
        }
        if (!!this.queryParam.recordTimeFrom) {
          this.queryParam.recordTimeFrom = dateUtils.getDate(this.queryParam.recordTimeFrom)
        }
        let params = _.assign(this.queryParam, {
          page: this.page,
          pageSize: '10',
        });
        this.$refs.queryParam.validate((valid) => {
          if (valid) {
            this.$store.dispatch('user_a_queryPointHistoryList', {params: params}).then((response) => {
              if (response.data.resultCode == 0) {
                this.pointHistoryList = response.data.resultData.pointHistoryList;
                this.total = response.data.resultData.pageInfo.totalCounts;
                this.loading = false;
              }
              this.loading = false;
            }, () => {
              this.loading = false;
            })
          } else {
            this.loading = false;
            return false;
          }
        })

      },
      getPoint(){
        this.$store.dispatch('user_a_getPoint').then((response) => {
          if (response.data.resultCode == 0) {
            this.pointList = response.data.resultData.pointList;
          }
        })
      },
      resetForm(){
        this.$refs.queryParam.resetFields();
        this.queryPointHistoryList(1);
      },
      getInoutTypeName(inout){
        if (inout === -1) {
          return '消费'
        } else if (inout === 1) {
          return '获得'
        }
      },
      getSpecialPoint(item){
        if (item.specialPoint <= item.pointValue) {
          return item.specialPoint
        } else {
          return item.pointValue
        }
      },
    }
  }
</script>
<style>
</style>