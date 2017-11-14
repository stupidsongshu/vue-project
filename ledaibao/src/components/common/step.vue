<template>
  <div class="step">
    <ul class="step-progress" ref="stepList">
      <li class="step-content" :class="{active: curStatus >= 1}">
        <div class="step-line"></div>
        <div class="step-icon"></div>
        <div class="step-desc">
          <div class="text">提交成功</div>
          <div class="date">2017.02.09</div>
        </div>
      </li>
      <li class="step-content" :class="{active: curStatus  >= 2}">
        <div class="step-line"></div>
        <div class="step-icon"></div>
        <div class="step-desc">
          <div class="text">银行处理中</div>
          <div class="date">2017.02.10</div>
        </div>
      </li>
      <li class="step-content" :class="{active: curStatus  >= 3}">
        <div class="step-line"></div>
        <div class="step-icon"></div>
        <div class="step-desc">
          <div class="text">到账成功</div>
          <div class="date">2017.02.10</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      curStatus: {
        type: Number
      }
    },
    data() {
      return {
      }
    },
    mounted() {
//      console.log(this.$refs.stepList)
      console.log(this.$refs.stepList.getElementsByTagName('li'))
    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/sass/base';

  .step {
    padding: 15px 0;
    background-color: #fff;
    .step-progress {
      display: flex;
      .step-content {
        position: relative;
        flex: 1;
        text-align: center;
        .step-icon {
          position: relative;
          height: 28px;
          background: no-repeat center;
          background-image: url("../../assets/img/icon_nor@2x.png");
          background-size: 28px 28px;
          z-index: 999;
        }
        .step-line {
          position: absolute;
          top: 14px;
          left: 50%;
          width: 100%;
          height: 3px;
          background-color: #dcdcdc;
          z-index: 2;
        }
        &:last-child {
          .step-line {
            left: -50%;
            z-index: 1;
          }
        }
        .step-desc {
          margin-top: 10px;
          line-height: 16px;
          .text {
            color: #666;
            font-size: 14px;
          }
          .date {
            color: #999;
            font-size: 11px;
          }
        }
        &.active {
          .step-icon {
            background-image: url("../../assets/img/icon_sel@2x.png");
          }
          .step-line:before {
            position: absolute;
            content: '';
            left: -100%;
            width: 100%;
            height: 3px;
            background-color: $main-color;
            z-index: 2;
          }
          .step-line:after {
            position: absolute;
            content: '';
            left: 0;
            width: 70%;
            height: 3px;
            background-color: $main-color;
            z-index: 2;
          }
          .text {
            color: $main-color;
          }
          &:last-child {
            .step-line {
              left: -50%;
              z-index: 2;
            }
          }
          &:last-child {
            .step-line:before {
              left: 0;
              z-index: 2;
            }
          }
          /*&:last-child {
            .step-line:before {
              position: absolute;
              content: '';
              left: -100%;
              width: 100%;
              height: 3px;
              background-color: $main-color;
              z-index: 3;
            }
          }*/
        }
        &:first-child {
          .step-line:before {
            width: 0;
          }
        }
      }
    }
  }
</style>
