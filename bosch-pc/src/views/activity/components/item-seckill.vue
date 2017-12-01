<style scoped>
  .img {
    width: 250px;
    height: 250px;
  }

  .button-seckill {
    background-color: rgb(255, 223, 69);
    width: 200px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
  }

  .button-seckill-waiting {
    background-color: #808080;
    width: 200px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    color: #fff;
  }

  .kill-img {
    right: 0;
    top: 0;
    width: 170px;
  }

  .kill-font {
    right: 25px;
    top: 40px;
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
</style>


<template>
  <div class="margin-top-10">
    <h2 class="text-align-center">{{activityInfo.activityName}}</h2>
    <div class="margin-top-20" v-for="(item,index) in seckillItemList" :key="item.itemId">
      <el-row>
        <el-col :span="9">
          <div class="item-list-li-img img-mid">
            <img :src="getImageUrl(item.itemImageUri)" class="img"/>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="item-info-title relative">
            <div style="width:260px"> {{item.itemName}}</div>
            <img src="../../../assets/images/kill.png" class="absolute kill-img"/>
            <div class="absolute kill-font">
              <span class="font-weight color-red font-size-20">{{item.pointValue}}</span>
              <div class="font-size-12" style="line-height:12px;color:rgb(197,80,57)"> ({{item.pointTypeName}})</div>
            </div>
          </div>
          <el-row>
            <el-col :span="24">
              <div class="font-size-14 margin-top-10">礼品编码 : {{item.itemCode}}</div>
              <div class="font-size-14 margin-top-10">礼品数量 : {{item.totalQuantity}}</div>
              <div class="font-size-14 margin-top-10">可秒数量 : {{item.buyQuantity}}</div>
              <div class="font-size-14 margin-top-10">开始时间 : {{item.startTime | getDateTime}}</div>
              <div class="font-size-14 margin-top-10">结束时间 : {{item.endTime | getDateTime}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="button-seckill margin-top-20 pointer" @click="showDialog(item)"
                   v-if="(!waitingBtn)&&getEndTimeReturn()&&(!message[index].show)">立即秒杀
              </div>
              <div class="button-seckill-waiting margin-top-20"
                   v-if="waitingBtn||(!getEndTimeReturn())||message[index].show">
                <div v-if="waitingBtn">
                  <span id="t_d">{{time.d}}天</span>
                  <span id="t_h">{{time.h}}时</span>
                  <span id="t_m">{{time.m}}分</span>
                  <span id="t_s">{{time.s}}秒</span>
                </div>
                <div v-if="!getEndTimeReturn()">
                  秒杀已结束
                </div>
                <div v-if="message[index].show">{{message[index].text}}</div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <seckill-dialog ref="seckill-dialog" @refresh="refreshPage" @disable="changeButton"></seckill-dialog>
  </div>
</template>
<script>
  import {dateUtils, commonUtils} from '../../../utils'
  import seckillDialog from './seckill-dialog.vue'
  import {mapState, mapGetters} from 'vuex'
  export default{
    components: {
      'seckill-dialog': seckillDialog
    },
    computed: {
      ...mapGetters({
        fileServer: 'config_g_fileServer',
        apiServer: 'config_g_apiServer'
      }),
    },
    data(){
      return {
        activityInfo: {},
        seckillItemList: [],
        defaultItemImage: require('../../../assets/images/image-not-found.png'),
        time: {
          d: '00',
          h: '00',
          m: '00',
          s: '00',
        },
        waitingBtn: false,
        message: [],
      }
    },
    methods: {
      init(activityInfo){
        this.message = [];
        this.activityInfo = activityInfo;
        this.queryActivitySeckillList();
        this.getStartTimeReturn();
      },
      queryActivitySeckillList(){
        let params = {
          activityId: this.activityInfo.activityId
        };
        this.$store.dispatch('activity_a_queryActivitySeckillList', {params: params}).then((response) => {
          if (response.data.resultCode === '0') {
            this.seckillItemList = response.data.resultData.seckillItemList;
            for (let item in this.seckillItemList) {
              let params;
              if (this.seckillItemList[item].sellout === '1') {
                params = {
                  itemId: this.seckillItemList[item].itemId,
                  text: '礼品被抢完啦',
                  show: true,
                }
              } else if (this.seckillItemList[item].attended === '1') {
                params = {
                  itemId: this.seckillItemList[item].itemId,
                  text: '您已参与过此活动',
                  show: true,
                }
              } else {
                params = {
                  itemId: this.seckillItemList[item].itemId,
                  text: '',
                  show: false,
                }
              }
              this.message.push(params)
            }
          }
        })
      },
      getImageUrl (imageUri){
        return !!imageUri ? this.fileServer + imageUri : this.defaultItemImage
      },
      refreshPage(val){
        if (!!val) {
          this.queryActivitySeckillList();
        }
      },
      changeButton(params){
        for (let item in this.message) {
          if (!!params.attended) {
            if (this.message[item].itemId === params.itemId) {
              this.message[item].text = '您已参与过此活动';
              this.message[item].show = true;
            }
          } else if (!!params.sellout) {
            if (this.message[item].itemId === params.itemId) {
              this.message[item].text = '礼品被抢完啦';
              this.message[item].show = true;
            }
          }
        }
      },
      showDialog(item){
        this.$refs['seckill-dialog'].showSeckillDialog(item);
      },
      getEndTimeReturn(){
        let NowTime = dateUtils.getDateTime(new Date());
        let endTime = dateUtils.getDateTime(this.activityInfo.endDate);
        return dateUtils.comptime(NowTime, endTime)
      },
      getStartTimeReturn(){
        let NowTime = dateUtils.getDateTime(new Date());
        let startTime = dateUtils.getDateTime(this.activityInfo.startDate);
        if (dateUtils.comptime(NowTime, startTime)) {
          let _vm = this
          this.waitingBtn = true;
          let timer = setInterval(() => {
            let start = new Date(dateUtils.getDateTime(this.activityInfo.startDate));
            let now = new Date();
            let t = start.getTime() - now.getTime();
            if (t >= 0) {
              this.time.d = Math.floor(t / 1000 / 60 / 60 / 24);
              this.time.h = Math.floor(t / 1000 / 60 / 60 % 24);
              this.time.m = Math.floor(t / 1000 / 60 % 60);
              this.time.s = Math.floor(t / 1000 % 60);
            }
            if (this.time.d === 0 && this.time.h === 0 && this.time.m === 0 && this.time.s === 0) {
              _vm.waitingBtn = false;
              clearInterval(timer)
            }
          }, 1000)
        }
        return this.waitingBtn;
      },
    },
  }
</script>
<style>
</style>