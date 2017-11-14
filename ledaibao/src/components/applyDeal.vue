<template>
  <div class="deal-container">
    <mt-header fixed class="header" title="乐贷款">
      <router-link class="header-icon" to="/" slot="left">
        <mt-button></mt-button>
      </router-link>
    </mt-header>

    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <deal-banner :title="title" :isShow="isShow"></deal-banner>
      <step :curStatus="currentStatus"></step>

      <div class="wrapper">
        <div class="item">
          <div class="name">到账金额：</div>
          <div class="desc">
            485.00元（已扣除手续费<span class="icon-doubt"></span>）
          </div>
        </div>
        <div class="item">
          <div class="name">提现到：</div>
          <div class="desc">建设银行卡（尾号0146）</div>
        </div>
        <div class="item" @click="next">
          <div class="name">到期还款日：</div>
          <div class="desc">2017年02月15日</div>
        </div>
      </div>

      <div class="friendly-reminder">
        <span>友情提示：</span>贷款用户需在到期还款日钱还款，逾期不还将依法报送人民银行征信系统。未来可能会对您找工作、办理签证、车贷、房贷造成影响。
      </div>
    </mt-loadmore>
  </div>
</template>

<script type="text/ecmascript-6">
  import dealBanner from './common/dealBanner.vue'
  import step from './common/step.vue'

  export default {
    data() {
      return {
        title: '银行处理中',
        isShow: false,
        currentStatus: 1,
        allLoaded: false
      }
    },
    components: {
      dealBanner,
      step
    },
    methods: {
      loadTop() {
        this.$refs.loadmore.onTopLoaded()
        this.currentStatus ++
      },
      loadBottom() {
        // 加载更多数据
        this.allLoaded = true// 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded()
      },
      next() {
        this.$router.push('/repaymentDetail')
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../assets/sass/base.sass';

  /*.deal-container {
    background-color: #efefef !important;
  }*/

  .header {
    color: #333;
    background-color: #fff;
    .header-icon {
      background-image: url("../assets/img/my@2x.png")
      /*@include bg-img('../assets/img/my')*/
    }
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    padding: 10px 15px;
    margin-top: 5px;
    background-color: #fff;
    .item {
      display: flex;
      line-height: 25px;
      color: #666;
      font-size: 14px;
      .name {
        width: 95px;
      }
      .desc {
        flex-grow: 1;
        .icon-doubt {
          display: inline-block;
          width: 14px;
          height: 14px;
          margin: 0 2px;
          background-image: url("../assets/img/doubt@2x.png");
          background-size: 14px 14px;
        }
      }
    }
  }

  .friendly-reminder {
    padding: 75px 15px;
    color: #999;
    font-size: 14px;
    line-height: 20px;
    span {
      font-weight: 700;
    }
  }
</style>
