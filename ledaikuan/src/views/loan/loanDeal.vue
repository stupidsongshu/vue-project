<template>
  <div class="loan-deal">
    <mt-header fixed class="header" title="借款"></mt-header>

    <div class="deal-banner">
      <div class="status" v-show="status === 0">提交成功</div>
      <div class="status" v-show="status === 1">银行处理中</div>
      <div class="status" v-show="status === 2">借款成功</div>
      <div class="loan-amount">
        <span class="icon-money"></span>{{payAmtInt}}.<span class="decimals">{{payAmtFlo}}</span>
      </div>
    </div>

    <deal-step :status="status" :dealInfo="dealInfo"></deal-step>

    <p class="friendly-tip" style="margin: 62px 0;">
      <b>友情提示：</b>贷款用户需在到期还款日前还款，逾期不还将依法报送人民银行征信系统，未来可能会对您找工作、办理签证、车贷、房贷造成影响。
    </p>

    <div class="common-btn" v-show="status > 1">
      <mt-button class="btn" disabled>{{restTime}}s后返回</mt-button>
    </div>

    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      :modal="true"
      :closeOnClickModal="false">
      <div class="deal-success">
        <img class="deal-success-loan-gif" src="../../assets/img/deal-success-loan.gif" alt="">
        <div class="deal-success-txt">您的借款正在处理哦~请耐心等待</div>
      </div>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import dealStep from '../components/dealStep'

  export default {
    components: {
      dealStep
    },
    data() {
      return {
        popupVisible: false,
        // 借款处理状态 0提交成功 1银行处理中 2借款成功 3借款失败
        status: 0,
        // 是否刷新接口
        isRefresh: true,
        restTime: 5,
        payAmtInt: 10000,
        payAmtFlo: '00',
        // 处理进度文本信息
        dealInfo: {
          step1: '提交成功',
          step2: '银行处理中',
          step3: '借款成功'
        }
      }
    },
    created() {
      this.checkLoanDeal()

      let that = this
      let timer = setInterval(function() {
        that.checkLoanDeal()

        if (!that.isRefresh) {
          clearInterval(timer)
        }
      }, 3000)
    },
    methods: {
      // 更新借款处理结果状态
      updateLoanDealStatus() {
        let that = this

        let cashExtract = this.$store.state.common.common_cashExtract

        let common_params = this.$store.state.common.common_params
        let common_loanAcctInfo = this.$store.state.common.common_loanAcctInfo
        let ua = common_params.ua
        let call = 'Loan.singleTrans'
        let timestamp = new Date().getTime()
        let sign = this.getSign(call, timestamp)

        let paramString = JSON.stringify({
          ua: ua,
          call: call,
          args: {
            customerId: common_params.customerId,
            loanAcctNo: common_loanAcctInfo.loanAcctNo,
            // 单笔交易金额(交易后服务器返回)
            returnAmt: cashExtract.amount,
            // 单笔交易订单号(交易后服务器返回)
            oriMerchantOrderId: cashExtract.merchantOrderId
            // 单笔交易交易时间(交易后服务器返回)
            // oriPayTime:
          },
          sign: sign,
          timestamp: timestamp
        })

        this.$http.post(this.$store.state.common.common_api, paramString).then(res => {
          // fix ios 底部tab空白
          setTimeout(function() {
            that.popupVisible = true
          }, 100)
          let data = res.data
          if (data.returnCode === '000000') {
            let res = data.response
            // transStus 0成功 1失败 2处理中 9订单不存在
            if (res.transStus === 0) {
              that.status = 2
              that.toast({
                message: '借款成功'
              })
            } else if (res.transStus === 1) {
              that.status = 3
              that.toast({
                message: '借款失败，请稍后重试'
              })
            } else if (res.transStus === 2) {
              that.status = 1
            } else if (res.transStus === 9) {
              that.status = 3
              that.toast({
                message: '订单不存在'
              })
            }

            // 返回处理结果后
            if (res.transStus !== 2) {
              that.isRefresh = false
              that.popupVisible = false
              that.updateLoanAcctInfo()
            }
          } else {
            that.popupVisible = false
            that.toast({
              message: data.returnMsg,
              duration: 1000
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 更新账户汇总信息
      updateLoanAcctInfo() {
        let that = this

        let cashExtract = that.$store.state.common.common_cashExtract

        let common_params = this.$store.state.common.common_params
        let common_loanAcctInfo = this.$store.state.common.common_loanAcctInfo
        let ua = common_params.ua
        let call = 'Loan.loanAcctInfo'
        let timestamp = new Date().getTime()
        let sign = this.getSign(call, timestamp)

        let paramString = JSON.stringify({
          ua: ua,
          call: call,
          args: {
            customerId: common_params.customerId,
            loanAcctNo: common_loanAcctInfo.loanAcctNo
          },
          sign: sign,
          timestamp: timestamp
        })

        this.$http.post(this.$store.state.common.common_api, paramString).then(res => {
          let data = res.data
          if (data.returnCode === '000000') {
            let loanAcctInfo = data.response
            // 更新汇总信息
            that.$store.commit('common_loanAcctInfo_save', loanAcctInfo)

            if (cashExtract.amount && cashExtract.merchantOrderId) { // 正常情况(有单笔交易信息)
              // 5秒倒计时
              let timer = setInterval(function() {
                that.restTime --
                if (that.restTime === 1) {
                  clearInterval(timer)
                  that.restTime = 5
                  that.checkLoanAcctInfo()
                }
              }, 1000)
            } else { // 异常情况(借款处理中未出结果重新进入，无单笔交易信息)
              // 临时冻结额度为0时，停止请求并关闭动画
              if (loanAcctInfo.tempFrozenAmt === 0) {
                that.isRefresh = false
                that.popupVisible = false
              }
              that.checkLoanAcctInfo()
            }
          } else {
            that.toast({
              message: data.returnMsg
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      checkLoanDeal() {
        let that = this
        let cashExtract = this.$store.state.common.common_cashExtract
        console.log(cashExtract.amount, cashExtract.merchantOrderId)
        if (cashExtract.amount && cashExtract.merchantOrderId) {
          // 正常情况(有单笔交易信息): 不断更新单笔交易结果接口(Loan.singleTrans)
          this.updateLoanDealStatus()
        } else {
          // 异常情况(借款处理中未出结果重新进入，无单笔交易信息): 不断更新账户汇总信息(Loan.loanAcctInfo)
          // fix ios 底部tab空白
          setTimeout(function() {
            that.popupVisible = true
          }, 100)
          this.updateLoanAcctInfo()
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'
  @import '../../assets/css/loanRepayDeal.styl'

  .loan-deal
    width: 100%
    height: 100%
</style>
