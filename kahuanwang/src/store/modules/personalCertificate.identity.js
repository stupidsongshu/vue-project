/**
 * 个人认证
 */

const state = {
  /**
   * 身份证
   * @param: status: false默认值 true识别成功
   * @param: name: 身份证姓名
   * @param: id: 身份证号码
   * @param: img: 身份证识别成功图片
   */
  idcardFrontInfo: {
    status: false,
    name: '',
    id: '',
    img: ''
  },
  idcardBackInfo: {
    status: false,
    img: ''
  },
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
  videoAuthImg: ''
}

const getters = {}

const mutations = {
  /**
   * 身份证
   */
  idcardFrontInfoSave(state, payload) {
    console.log(payload)
    state.idcardFrontInfo = payload
  },
  idcardBackInfoSave(state, payload) {
    console.log(payload)
    state.idcardBackInfo = payload
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
