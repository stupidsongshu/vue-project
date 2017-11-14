<template>
  <div class="header">
    <div class="header-icon">
      <img src="../assets/img/my@2x.png" width="24" height="24" alt="">
    </div>
    <div class="header-text">乐贷款</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
  }
</script>

<style scoped lang="scss">
  @import '../assets/sass/base.sass';

  .header{
    position: relative;
    width: 100%;
    height: 45px;
    padding: 10px 15px 0 15px;
    /*padding: 0 15px;*/
    .header-icon{
      width:24px;
      height:100%;
      background-size: 24px 24px;
      //@include bg-img('../assets/img/my');
    }
    .header-text{
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      color: #333;
      font-size: 20px;
    }

  }

</style>
