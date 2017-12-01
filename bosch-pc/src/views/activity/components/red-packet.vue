<style scoped>
  .red-packet {
    background: url("../../../assets/images/red-packet.png") no-repeat center 20px;
    width: 100%;
    height: 350px;
    background-size: 200px;

  }

  .button {
    width: 130px;
    height: 35px;
    left: 50%;
    margin-left: -65px;
    top: 225px;
  }
</style>

<template>
  <div class="margin-top-10">
    <h2 class="text-align-center">{{activityInfo.activityName}}</h2>
    <div class="red-packet relative">
      <div class="button absolute pointer" @click="obtainRedPacket()"></div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        activityInfo: {},
      }
    },
    methods: {
      init(activityInfo){
        this.activityInfo = activityInfo;
      },
      obtainRedPacket(){
        let params = {
          activityId: this.activityInfo.activityId
        };
        this.$store.dispatch('activity_a_obtainRedPacket', {params: params}).then((response) => {
          let pointTypeName;
          let pointValue;
          if (!!response.data.resultData) {
            pointTypeName = response.data.resultData.pointTypeName || '';
            pointValue = response.data.resultData.pointValue || '';
          }
          if (response.data.resultCode === '0') {
            this.$alert(pointTypeName + ' : ' + pointValue, '抢到一个红包~', {
              confirmButtonText: '确定',
              callback: action => {
                console.log('ok')
              }
            });
          } else if (response.data.resultCode === 'over') {
            this.$alert('每个人只可以抢一次噢~'+' ( 已抢'+pointTypeName + ' : ' + pointValue+' ) ', '您之前已经抢过红包啦~', {
              confirmButtonText: '确定',
              callback: action => {
                console.log('ok')
              }
            });
          } else if (response.data.resultCode === 'finish') {
            this.$alert('好可惜,下次活动不见不散~', '红包已经被抢完了~', {
              confirmButtonText: '确定',
              callback: action => {
                console.log('ok')
              }
            });
          }
        })
      },
    }
  }
</script>
<style>
</style>