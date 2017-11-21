import Vue from 'vue'
import Router from 'vue-router'
// 首页
import Home from '@/components/home'
// 登录注册
import Login from '@/components/login/login'
import ForgetPsw from '@/components/login/forgetPsw'
import Register from '@/components/login/register'
// 消息中心
import NewsCenter from '@/components/newsCenter/newsCenter'
import NewsActivity from '@/components/newsCenter/activity'
import NewsDeal from '@/components/newsCenter/deal'
import NewsNotification from '@/components/newsCenter/notification'
// 借款
import Loan from '@/components/loan/loan'
import LoanCode from '@/components/loan/loanCode'
import LoanDeal from '@/components/loan/loanDeal'
// 还款
import Repay from '@/components/repay/repay'
import OnTimeRepay from '@/components/repay/onTimeRepay'
import OverdueRepay from '@/components/repay/overdueRepay'
import InAdvanceRepay from '@/components/repay/inAdvanceRepay'
import RepayCode from '@/components/repay/repayCode'
import RepayDeal from '@/components/repay/repayDeal'
// 我的
import My from '@/components/my/my'
import LoanRecord from '@/components/my/loanRecord'
import LoanDesc from '@/components/my/loanDesc'
import RepayRecord from '@/components/my/repayRecord'
import RepayDesc from '@/components/my/repayDesc'
import BankCard from '@/components/my/bankCard'
import AboutUs from '@/components/my/aboutUs'
import Help from '@/components/my/help'
import Setting from '@/components/my/setting'
import ModifyLoginPsw from '@/components/my/modifyLoginPsw'
import ModifyPhone from '@/components/my/modifyPhone'
import ModifyPhoneOld from '@/components/my/modifyPhoneOld'
import ModifyPhoneNew from '@/components/my/modifyPhoneNew'
// 个人认证 身份信息
import Identity from '@/components/personalCertificate/identityInfo/identity'
import FaceRecognition from '@/components/personalCertificate/identityInfo/faceRecognition'
import FaceRecognitionS from '@/components/personalCertificate/identityInfo/faceRecognitionS'
import FaceRecognitionF from '@/components/personalCertificate/identityInfo/faceRecognitionF'
import Shot from '@/components/personalCertificate/identityInfo/shot'
import BankCardInfo from '@/components/personalCertificate/bankCardInfo/bankCard'
import AddDebitCard from '@/components/personalCertificate/bankCardInfo/addDebitCard'
import AddCreditCard from '@/components/personalCertificate/bankCardInfo/addCreditCard'
import BaseInfo from '@/components/personalCertificate/baseInfo/base'
import WriteStandard from '@/components/personalCertificate/baseInfo/writeStandard'
import Linkman from '@/components/personalCertificate/linkmanInfo/linkman'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/forgetPsw',
      name: 'forgetPsw',
      component: ForgetPsw
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/newsCenter',
      component: NewsCenter,
      children: [
        {
          path: '',
          name: 'activity',
          component: NewsActivity
        },
        {
          path: 'deal',
          name: 'deal',
          component: NewsDeal
        },
        {
          path: 'notification',
          name: 'notification',
          component: NewsNotification
        }
      ]
    },
    {
      path: '/loan',
      name: 'loan',
      component: Loan
    },
    {
      path: '/loanCode',
      name: 'loanCode',
      component: LoanCode
    },
    {
      path: '/loanDeal',
      name: 'loanDeal',
      component: LoanDeal
    },
    {
      path: '/repay',
      name: 'repay',
      component: Repay
    },
    {
      path: '/onTimeRepay',
      name: 'onTimeRepay',
      component: OnTimeRepay
    },
    {
      path: '/overdueRepay',
      name: 'overdueRepay',
      component: OverdueRepay
    },
    {
      path: '/inAdvanceRepay',
      name: 'inAdvanceRepay',
      component: InAdvanceRepay
    },
    {
      path: '/repayCode',
      name: 'repayCode',
      component: RepayCode
    },
    {
      path: '/repayDeal',
      name: 'repayDeal',
      component: RepayDeal
    },
    {
      path: '/my',
      name: 'my',
      component: My
    },
    {
      path: '/loanRecord',
      name: 'loanRecord',
      component: LoanRecord
    },
    {
      path: '/loanDesc',
      name: 'loanDesc',
      component: LoanDesc
    },
    {
      path: '/repayRecord',
      name: 'repayRecord',
      component: RepayRecord
    },
    {
      path: '/repayDesc',
      name: 'repayDesc',
      component: RepayDesc
    },
    {
      path: '/bankCard',
      name: 'bankCard',
      component: BankCard
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: AboutUs
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting
    },
    {
      path: '/modifyLoginPsw',
      name: 'modifyLoginPsw',
      component: ModifyLoginPsw
    },
    {
      path: '/modifyPhone',
      component: ModifyPhone,
      children: [
        {
          path: '',
          name: 'modifyPhoneOld',
          component: ModifyPhoneOld
        },
        {
          path: 'new',
          name: 'modifyPhoneNew',
          component: ModifyPhoneNew
        }
      ]
    },
    {
      path: '/identity',
      name: 'identity',
      component: Identity
    },
    {
      path: '/faceRecognition',
      name: 'faceRecognition',
      component: FaceRecognition
    },
    {
      path: '/faceRecognitionS',
      name: 'faceRecognitionS',
      component: FaceRecognitionS
    },
    {
      path: '/faceRecognitionF',
      name: 'faceRecognitionF',
      component: FaceRecognitionF
    },
    {
      path: '/shot',
      name: 'shot',
      component: Shot
    },
    {
      path: '/bankCardInfo',
      name: 'bankCardInfo',
      component: BankCardInfo
    },
    {
      path: '/addDebitCard',
      name: 'addDebitCard',
      component: AddDebitCard
    },
    {
      path: '/addCreditCard',
      name: 'addCreditCard',
      component: AddCreditCard
    },
    {
      path: '/baseInfo',
      name: 'baseInfo',
      component: BaseInfo
    },
    {
      path: '/writeStandard',
      name: 'writeStandard',
      component: WriteStandard
    },
    {
      path: '/linkman',
      name: 'linkman',
      component: Linkman
    }
  ]
})
