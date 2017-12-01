<style scoped>
  .bottom-dotted {
    border-bottom: 1px dotted #a1a1a1;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }

  .img {
    height: 100px;
    width: 100px;
    right: 20px;
    top: -20px;
  }

  .logistics {
    padding-left: 10px;
    color: #333;
    max-height: 300px;
    overflow-y: auto;
  }

  .logistics > li {
    line-height: 25px;
    border-left: 1px solid #808080;
    position: relative;
    padding: 10px 0 0 10px;
  }

  .logistics > li:first-child > .round {
    border-radius: 10px;
    width: 10px;
    height: 10px;
    background-color: #00545e;
    position: absolute;
    left: -6px;
    top: 17px;
  }

  .logistics > li + li > .round {
    border-radius: 8px;
    width: 8px;
    height: 8px;
    background-color: #a1a1a1;
    position: absolute;
    left: -5px;
    top: 17px;
  }

  .logistics > li:first-child > .text {
    color: #00545e;
  }

  .logistics > li > .date {
    display: block;
    color: #808080;
    text-align: right;
    padding-right: 6px;
  }
</style>

<template>
  <div class="text-align-center">
    <el-dialog title="物流信息" :visible.sync="dialogVisible">
      <div class="relative text-align-left">
        <el-row class="bottom-dotted">
          <el-form label-width="70px">
            <el-col :span="12">
              <el-form-item label="物流公司 : " class="margin-bottom-0">{{logistics.logisticsCompanyName}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="物流类型 : " class="margin-bottom-0">{{logistics.logisticsType}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="物流单号 : " class="margin-bottom-0">{{logistics.logisticsNumber}}</el-form-item>
            </el-col>
            <el-col :span="12" v-if="logistics.finishDate">
              <el-form-item label="送达时间 : " class="margin-bottom-0">{{logistics.finishDate | getDateTime}}
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <img class="absolute img" src="../../../../assets/images/yqiianshou.png" v-if="showIsSign"/>
        <ul class="logistics text-align-left" v-if="billList.length>0">
          <li v-for="item in billList" :key="item.remark">
            <span class="round"></span>
            <span class="text">{{item.desc}}</span>
            <span class="date">{{item.time | getDateTime}}</span>
          </li>
        </ul>
        <p class="text-align-center padding-top-20" v-else>暂无物流信息</p>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  export default{
    computed: {
      ...mapGetters({
        fileServer: 'config_g_fileServer'
      }),
      showIsSign(){
//        if (this.billList.length > 0) {
//          return this.billList[0].isSign === '0' ? false : true;
//        } else {
//          return false;
//        }
        if (this.logistics.finishDate !== '') {
          return true;
        } else {
          return false;
        }
      }
    },
    data(){
      return {
        dialogVisible: false,
        logistics: {
          logisticsNumber: '',
          logisticsType: '',
          logisticsCompany: '',
          logisticsCompanyName: '',
          finishDate: '',
        },
        billList: [],
      }
    },
    methods: {
      showDialog(baseInfo){
        this.logistics.logisticsNumber = baseInfo.logisticsNumber || '';
        this.logistics.logisticsType = baseInfo.logisticsType || '';
        this.logistics.logisticsCompany = baseInfo.logisticsCompany || '';
        this.logistics.logisticsCompanyName = baseInfo.logisticsCompanyName || '';
        this.logistics.finishDate = baseInfo.finishDate || '';
        this.getLogisticsInfo();
        this.dialogVisible = true;
      },
      getLogisticsInfo(){
        let params = {
          searchNumber: this.logistics.logisticsNumber,
          logisticsCompany: this.logistics.logisticsCompany,
        }
        this.$store.dispatch('order_a_queryLogistics', {params: params}).then((response) => {
          if (response.data.resultCode == 0) {
            this.billList = response.data.resultData.billList || [];
          }
        })
      },
    }
  }
</script>
<style>
</style>

