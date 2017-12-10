/**
 * 个人认证
 */

const state = {
  /**
   * 申请资格认证状态
   * applyQualificationAuthStatus: false未通过(默认) true已通过
   */
  applyQualificationAuthStatus: false,
  /**
   * 个人认证swiper
   * personalCertificateProgress: 认证进度
   * personalCertificateShow: 是否显示
   */
  personalCertificateSwiperProgress: 1,
  personalCertificateSwiperShow: true,
  /**
   * 身份证
   * @param: status: false默认值 true识别成功
   * @param: name: 身份证姓名
   * @param: id: 身份证号码
   * @param: img: 身份证识别成功图片
   */
  // idcardFrontInfo: {
  //   status: false,
  //   name: '',
  //   id: '',
  //   img: ''
  // },
  idcardFront_shotStatus: false, // 正面拍摄完成返回本地图片状态
  idcardFront_identifyStatus: false, // 服务器识别状态
  idcardFront_name: '',
  idcardFront_id: '',
  idcardFront_img: '',
  // idcardBackInfo: {
  //   status: false,
  //   img: ''
  // },
  idcardBack_shotStatus: false, // 反面拍摄完成返回本地图片状态
  idcardBack_identifyStatus: false, // 服务器识别状态
  idcardBack_img: '',
  /**
   * 人脸识别
   * @param: faceRecognitionStep: 0默认值 1识别成功 2识别失败
   */
  faceRecognitionStep: 0,
  faceRecognitionImg: '',
  /**
   * 视频认证
   * @param: videoAuthStep: 0默认值 1已认证
   */
  videoAuthStep: 0,
  videoAuthImg: '',
  /**
   * 资料审核状态 waitAuditStatus
   * 0 等待审核
   * 1 审核拒绝
   * 2 审核通过
   * 3 调查问卷
   */
  waitAuditStatus: 0
}

const getters = {}

const mutations = {
  /**
   * 申请资格认证状态
   */
  applyQualificationAuthStatusSave(state, payload) {
    state.applyQualificationAuthStatus = payload
  },
  /**
   * 个人认证swiper
   */
  personalCertificateSwiperProgressSave(state, payload) {
    state.personalCertificateSwiperProgress = payload
  },
  personalCertificateSwiperShowSave(state, payload) {
    state.personalCertificateSwiperShow = payload
  },
  /**
   * 身份证
   */
  // idcardFrontInfoSave(state, payload) {
  //   state.idcardFrontInfo = payload
  // },
  // idcardBackInfoSave(state, payload) {
  //   state.idcardBackInfo = payload
  // },
  idcardFrontShotStatusSave(state, payload) {
    state.idcardFront_shotStatus = payload
  },
  idcardFrontIdentifyStatusSave(state, payload) {
    state.idcardFront_identifyStatus = payload
  },
  idcardFrontNameSave(state, payload) {
    state.idcardFront_name = payload
  },
  idcardFrontIdSave(state, payload) {
    state.idcardFront_id = payload
  },
  idcardFrontImgSave(state, payload) {
    state.idcardFront_img = payload
  },
  idcardBackShotStatusSave(state, payload) {
    state.idcardBack_shotStatus = payload
  },
  idcardBackIdentifyStatusSave(state, payload) {
    state.idcardBack_identifyStatus = payload
  },
  idcardBackImgSave(state, payload) {
    state.idcardBack_img = payload
  },
  /**
   * 人脸识别
   */
  faceRecognitionStepSave(state, payload) {
    state.faceRecognitionStep = payload
  },
  faceRecognitionImgSave(state, payload) {
    state.faceRecognitionImg = payload
  },
  /**
   * 视频认证
   */
  videoAuthStepSave(state, payload) {
    state.videoAuthStep = payload
  },
  videoAuthImgSave(state, payload) {
    state.videoAuthImg = payload
  },
  /**
   * 资料审核状态
   */
  waitAuditStatusSave(state, payload) {
    state.waitAuditStatus = payload
  }
}

const actions = {
  incrementSessionCountActions(context) {
    context.commit('incrementSessionCountMutation')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
