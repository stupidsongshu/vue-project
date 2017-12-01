<template>
  <div>
    <el-breadcrumb separator="/" class="big-title">
      <el-breadcrumb-item :to="{name:'activity-list',params:{activityType:activityType}}">{{getActivityTypeName}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{name:'activity-view',query:{activityId:activityId,activityType:activityType,activityName:activityName}}">{{activityName}}</el-breadcrumb-item>
      <el-breadcrumb-item>活动页面</el-breadcrumb-item>
    </el-breadcrumb>
    <question-answer ref="question-answer" v-if="show('05')" v-loading="loading"></question-answer>
    <red-packet ref="red-packet" v-if="show('04')"></red-packet>
    <item-seckill ref="item-seckill" v-if="show('02')"></item-seckill>
  </div>
</template>
<script>
  import _ from 'lodash'
  import {mapGetters, mapState} from 'vuex'
  import itemSeckill from './components/item-seckill.vue'
  import questionAnswer from './components/question-answer.vue'
  import redPacket from './components/red-packet.vue'
  export default{
    components: {
      'item-seckill': itemSeckill,
      'question-answer': questionAnswer,
      'red-packet': redPacket
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
            this.$nextTick(function () {
              if (this.activityType === '01') {
//                this.$refs['activity-promotion-info'].init(this.activityInfo)
              } else if (this.activityType === '02') {
                this.$refs['item-seckill'].init(this.activityInfo)
              } else if (this.activityType === '04') {
                this.$refs['red-packet'].init(this.activityInfo)
              } else if (this.activityType === '05') {
                this.$refs['question-answer'].init(this.activityInfo)
              }
            })
          }
        }, () => {
          this.loading = false;
        })
      },
      show(key){
        if (this.activityType !== '') {
          return key === this.activityType
        }
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