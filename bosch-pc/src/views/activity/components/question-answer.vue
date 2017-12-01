<style scoped>
  .must:after {
    content: '*';
    display: inline-block;
    color: red;
    margin-left: 5px;
    vertical-align: middle;
  }
</style>
<template>
  <div class="margin-top-10">
    <h2 class="text-align-center">{{activityInfo.activityName}}</h2>
    <h5 class="color-red" v-if="activityConfig.rewardWhole!=='y'&&replyList.length>0">积分结算 : 总共{{result.number}}道题 , 答对{{result.yes}}道 , 答错{{result.no}}道 , 总共获得积分 : {{result.pointValue + '(' + activityInfo.pointTypeName + ')'}}</h5>
    <h5 class="color-red" v-if="activityConfig.rewardWhole==='y'&&replyList.length>0">
      奖励积分 : {{activityInfo.pointValue + ' ( ' + activityInfo.pointTypeName + ' ) '}}</h5>
    <el-row v-for="(item,index) in questionList" :key="item.questionId" class="margin-bottom-10">
      <el-col :span="24">
        <div class="clearfix">
          <h4 class="v-left"
              :class="{'must':getMust(item)}">
            {{index + 1 + ' : ' + item.questionSubject + ' ( ' + item.questionTypeName + getPointValue(item.pointValue) + ')'}}
          </h4>
          <span class="color-red v-left" v-if="activityConfig.rewardWhole!=='y'&&replyList.length>0"
                style="line-height:50px;margin-left:10px;">{{' [ ' + getIsCorrect(index) + ' ] '}}</span>
        </div>
        <el-radio-group v-model="clientAnswerList[index].clientAnswer" class="margin-left-10 activity-question-radio"
                        v-if="item.questionType==='01'">
          <el-radio :label="item2.value" v-for="item2 in item.optionList" :key="item2.value">
            {{item2.value + ' : ' + item2.label}}
          </el-radio>
        </el-radio-group>
        <el-checkbox-group v-model="clientAnswerList[index].clientAnswer" class="margin-left-10 activity-question-radio"
                           v-if="item.questionType==='02'">
          <el-checkbox :label="item2.value" v-for="item2 in item.optionList" :key="item2.value">
            {{item2.value + ' : ' + item2.label}}
          </el-checkbox>
        </el-checkbox-group>
        <el-input type="textarea" v-model="clientAnswerList[index].clientAnswer" :autosize="{ minRows: 2, maxRows: 4}"
                  :placeholder="getPlaceholder(item)" v-if="item.questionType==='03'" style="width:600px"></el-input>
      </el-col>
      <el-col :span="24"></el-col>
    </el-row>
    <div class="text-align-center padding-top-20" v-if="replyList.length===0">
      <el-button type="primary" @click="submit()">提交答案</el-button>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    mounted() {

    },
    computed: {
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
      }),
    },
    data(){
      return {
        activityInfo: {},
        activityConfig: {
          rewardWhole: ''
        },
        questionList: [],
        clientAnswerList: [],
        replyList: [],
        result: {
          number: 0,
          yes: 0,
          no: 0,
          value: 0,
        },
      }
    },
    methods: {
      init(activityInfo){
        this.clientAnswerList = [];
        this.questionList = [];
        this.activityInfo = activityInfo;
        if (!!activityInfo.activityConfig) {
          this.activityConfig = JSON.parse(activityInfo.activityConfig)
          if (!this.activityConfig.rewardWhole) {
            this.activityConfig.rewardWhole = '';
          }
        }
        this.queryActivityQuestionAnswer();
      },
      queryActivityQuestionList(){
        let params = {
          activityId: this.activityInfo.activityId
        };
        this.$store.dispatch('activity_a_queryActivityQuestionList', {params: params}).then((response) => {
          if (response.data.resultCode === '0') {
            this.questionList = response.data.resultData.questionList;
            this.getClientAnswerList();
          }
        })
      },
      queryActivityQuestionAnswer(){
        let params = {
          activityId: this.activityInfo.activityId,
        };
        this.$store.dispatch('activity_a_queryActivityQuestionAnswer', {params: params}).then((response) => {
          if (response.data.resultCode === '0') {
            this.replyList = response.data.resultData.replyList || [];
            if (this.replyList.length === 0) {
              this.queryActivityQuestionList();
            } else {
              this.questionList = response.data.resultData.questionList;
              this.getClientAnswerList();
            }
          }
        })
      },
      getClientAnswerList(){
        this.clientAnswerList = [];
        this.result = {
          number: 0,
          yes: 0,
          no: 0,
          pointValue: 0,
        };
        if (this.replyList.length !== 0) {
          this.result.number = this.replyList.length;
          for (let i = 0; i < this.questionList.length; i++) {
            for (let j = 0; j < this.replyList.length; j++) {
              if (this.questionList[i].questionId === this.replyList[j].questionId) {
                this.replyList[j].pointType = this.questionList[i].pointType;
                if (this.questionList[i].questionType === '02') {
                  this.replyList[j].clientAnswer = this.replyList[j].clientAnswer.split(',');
                }
                if (this.replyList[j].isCorrect === 1) {
                  this.result.yes++;
                  this.result.pointValue = this.result.pointValue + this.replyList[j].pointValue
                } else {
                  this.result.no++
                }
                this.clientAnswerList.push(this.replyList[j])
                break;
              }
            }
          }
        } else {
          for (let item in  this.questionList) {
            if (this.questionList[item].questionType !== '02') {
              this.clientAnswerList.push({
                questionType: this.questionList[item].questionType,
                isMandatory: this.questionList[item].isMandatory || 0,
                charCountMin: this.questionList[item].charCountMin || 0,
                activityId: this.questionList[item].activityId,
                questionId: this.questionList[item].questionId,
                clientAnswer: '',
              })
            } else {
              this.clientAnswerList.push({
                questionType: this.questionList[item].questionType,
                isMandatory: this.questionList[item].isMandatory || 0,
                charCountMin: this.questionList[item].charCountMin || 0,
                activityId: this.questionList[item].activityId,
                questionId: this.questionList[item].questionId,
                clientAnswer: [],
              })
            }
          }
        }
      },
      getIsCorrect(index){
        return this.clientAnswerList[index].isCorrect === 0 ? '答案错误' : '答案正确'
      },
      submit(){
        this.$confirm('是否提交答案?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < this.clientAnswerList.length; i++) {
            if (this.clientAnswerList[i].questionType === '03') {
              if (this.clientAnswerList[i].isMandatory > 0) {
                if (this.clientAnswerList[i].clientAnswer === '') {
                  this.$message.error('第' + (i + 1) + '题,是必填题')
                  return;
                }
              }
              if (this.clientAnswerList[i].charCountMin > 0) {
                if (this.clientAnswerList[i].clientAnswer === '') {
                  this.$message.error('第' + (i + 1) + '题,是必填题')
                  return;
                } else if (this.clientAnswerList[i].clientAnswer.length < this.clientAnswerList[i].charCountMin) {
                  this.$message.error('第' + (i + 1) + '题,请输入超过要求的字数再提交')
                  return;
                }
              }
            } else if (this.clientAnswerList[i].questionType === '01') {
              if (this.clientAnswerList[i].isMandatory > 0) {
                if (this.clientAnswerList[i].clientAnswer === '') {
                  this.$message.error('第' + (i + 1) + '题,是必选题')
                  return;
                }
              }
            } else if (this.clientAnswerList[i].questionType === '02') {
              if (this.clientAnswerList[i].isMandatory > 0) {
                if (this.clientAnswerList[i].clientAnswer.length === 0) {
                  this.$message.error('第' + (i + 1) + '题,是必选题')
                  return;
                }
              }
            }
          }
          for (let item in this.clientAnswerList) {
            if (Object.prototype.toString.call(this.clientAnswerList[item].clientAnswer) == '[object Array]') {
              this.clientAnswerList[item].clientAnswer = this.clientAnswerList[item].clientAnswer.join(',')
            }
          }
          this.$store.dispatch('activity_a_queryActivityQuestionSubmit', {params: this.clientAnswerList}).then((response) => {
            if (response.data.resultCode === '0') {
              this.$message.success('提交成功~')
              this.queryActivityQuestionAnswer();
            }
          })
        }).catch(() => {
          console.log('close')
        });
      },
      getPointValue(val){
        if (!!val) {
          return ' , 积分 : ' + val
        } else {
          return '';
        }
      },
      getMust(item){
        if (item.questionType !== '03') {
          return (!!item.isMandatory) && item.isMandatory === 1
        } else {
          return ((!!item.isMandatory) && item.isMandatory === 1) || ((!!item.charCountMin) && item.charCountMin) > 0
        }
      },
      getPlaceholder(item){
        if (((!!item.charCountMin) && item.charCountMin) > 0) {
          return '请填写' + item.charCountMin + '字以上的内容'
        } else if ((!!item.isMandatory) && item.isMandatory === 1) {
          return '请填写内容'
        }
      }
    }
  }
</script>
<style>
</style>