/**
 * Created by fs-dev on 2016/10/19.
 */
import Vue from 'vue'
import router from './routers/index'
import store from './store'
import {Message, MessageBox} from 'element-ui';
import moment from 'moment'
import CryptoJS from 'crypto-js'
import _ from 'lodash'

const interceptor = function (request, next) {
  var noRefreshUris = ['/auth/token/refresh', '/auth/logout']
  let needRefresh = true;
  for (let i = 0; i < noRefreshUris.length; i++) {
    if (request.url.indexOf(noRefreshUris[i]) >= 0) {
      needRefresh = false;
      break;
    }
  }
  var token = tokenUtils.getToken(needRefresh)
  if (!!token) {
    // console.log('add token in header')
    request.headers.set('Authorization', "Bearer " + token)
  }
  request.credentials = true
  next((response) => {
    // ...
    // console.log(response)
    // 请求发送后的处理逻辑
    if (response.status == 401) {
      tokenUtils.clearToken()
      localStorageUtils.remove('userInfo')
      store.commit('user_m_clearUserInfo')
      console.log('need re-auth!')
      router.push({name: 'home'})
    } else if (response.status != 200) {
      //routers.push({ name:String(response.status) });
      Message.error({
        showClose: true,
        message: '服务器异常'
      })
    }
    else {
      if (response.data.resultCode && response.data.resultCode != '0' && !!response.data.resultMsg) {
        Message.error({
          showClose: true,
          message: response.data.resultMsg
        })
      }
    }
    // 根据请求的状态，response参数会返回给successCallback或errorCallback
    return response
  })
}

const tokenUtils = {
  setToken: function (token, expireTime) {
    localStorageUtils.setWithExpire('bosch-extra-front-token', token, expireTime)
  },
  getToken: function (refresh) {
    var token = localStorageUtils.get('bosch-extra-front-token')
    if (!token) {
      return null
    }
    var tokenExpireTime = localStorageUtils.getExpireTime('bosch-extra-front-token')
    if (!tokenExpireTime) {
      return token
    }
    var curTime = (new Date()).getTime()
    if (tokenExpireTime <= curTime) {
      return null
    }
    if (refresh) {
      var triggerLimit = 60 * 60 * 1000
      if ((tokenExpireTime - curTime) <= triggerLimit) {
        console.log('try to refresh token')
        store.dispatch('user_a_refreshToken')
      }
    }
    return token;
  },
  clearToken: function () {
    localStorageUtils.remove('bosch-extra-front-token')
  }
}

const localStorageUtils = {
  setWithExpire: function (key, value, expireTime) {
    localStorage.setItem(key, value);
    if (!!expireTime) {
      localStorage.setItem(key + '__et', expireTime);
    }
  },
  set: function (key, value, seconds) {
    localStorage.setItem(key, value);
    if (typeof seconds === 'number' && seconds > 0) {
      var expireTime = (new Date()).getTime() + seconds * 1000
      localStorage.setItem(key + '__et', expireTime);
    }
  },
  get: function (key) {
    var value = localStorage.getItem(key);
    if (!value) {
      return null
    }
    var expireTime = localStorage.getItem(key + '__et');
    if (!expireTime) {
      return value
    }
    var curTime = (new Date()).getTime();
    if (curTime > expireTime) {
      this.remove(key)
      return null
    } else {
      return value
    }
  },
  getExpireTime: function (key) {
    return localStorage.getItem(key + '__et')
  },
  remove: function (key) {
    localStorage.removeItem(key)
    localStorage.removeItem(key + '__et')
  }
}

const dateUtils = {
  getDate: function (dateStr) {
    var date = new Date(dateStr);
    if (!dateStr || date == 'Invalid Date') {
      return '';
    }
    var momentDate = moment(date);
    return momentDate.isValid() ? momentDate.format('YYYY-MM-DD') : '';
  },
  getDateTime: function (dateStr) {
    var date = new Date(dateStr);
    if (!dateStr || date == 'Invalid Date') {
      return '';
    }
    var momentDate = moment(date);
    return momentDate.isValid() ? momentDate.format('YYYY-MM-DD HH:mm:ss') : '';
  },
  dateToString: function (dateStr) {
    var date = new Date(dateStr);
    if (!dateStr || date == 'Invalid Date') {
      return '';
    }
    var momentDate = moment(date);
    return momentDate.isValid() ? momentDate.format('YYYY-MM-DD') : '';
  },
  exactTime: function (dateStr) {
    var date = new Date(dateStr);
    if (!dateStr || date == 'Invalid Date') {
      return '';
    }
    var momentDate = moment(date);
    return momentDate.isValid() ? momentDate.format('HH:mm') : '';
  },
  strToDate: function (dateStr) {
    if (!dateStr) {
      return null;
    }
    var momentDate = moment(dateStr);
    return momentDate.isValid() ? momentDate.toDate() : null
  },
  currentDateStr: function () {
    return moment().format('YYYY-MM-DD')
  },
  comptime: function (beginTime, endTime) {
    //beginTime,endTime格式:'YYYY-MM-DD HH:mm:ss'
    let beginTimes = beginTime.substring(0, 10).split('-');
    let endTimes = endTime.substring(0, 10).split('-');
    beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
    endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);
    let a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
    if (a < 0) {
      return false; //beginTime大
    } else if (a > 0) {
      return true; //endTime大
    } else if (a === 0) {
      return true; //beginTime大和endTime大一样
    } else {
      return 'false'
    }
  }
}

const mathUtils = {
  undefinedToNull: function (object) {
    var temp = false;   //是否存在至少一个数据
    for (var i in object) {
      if (object[i] === undefined) {
        object[i] = '';     //undefined数据转空
      }
      if (!!object[i]) {
        temp = true;
      }
    }
    return {object, temp};
  },
  amountFormat: function (amount) {
    if (!amount) {
      return '0.00';
    }
    var point = String(amount).indexOf('.');
    if (point == -1) {
      return amount + '.00';
    }
    else {
      var decimal;
      if (String(amount).substr(point + 3, 1) >= 5) {
        decimal = Number(String(amount).substr(point + 1, 2)) + 1;
        if (decimal == 100) {
          decimal = '.00'
          return Number(String(amount).substring(0, point)) + 1 + decimal;
        }
      } else if (!String(amount).substr(point + 2, 1)) {
        decimal = String(amount).substr(point + 1, 1) + '0';
      }
      else {
        decimal = String(amount).substr(point + 1, 2);
      }
      return String(amount).substring(0, point) + '.' + decimal;
    }
  },
  numberRegExp(val) {
    /*正浮点数*/
    var reg = new RegExp('^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$');
    return reg.test(val);
  },
  checkNumber (val) {
    return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(val)
  },
  checkInteger(val) {
    if (val == 0) return true
    if (val < 0) return false
    return /^-?\d+$/.test(val);
  },
  floatAdd(arg1, arg2)  {
    var r1, r2, m;
    try {
      r1 = arg1.toString().split(".")[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split(".")[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
  },
  floatSub(arg1, arg2)  {
    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split(".")[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((arg2 * m - arg1 * m) / m).toFixed(n);
  },
  floatMul(arg1, arg2)  {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
      m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  },
  floatDiv(arg1, arg2)  {
    var t1 = 0, t2 = 0, r1, r2;
    try {
      t1 = arg1.toString().split(".")[1].length
    } catch (e) {
    }
    try {
      t2 = arg2.toString().split(".")[1].length
    } catch (e) {
    }
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * pow(10, t2 - t1);
  },
}

const commonUtils = {
  arrayRemove() {
    Array.prototype.remove = function (val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1)
      }
    }
  },
  getImageUrl (imageUri){
    return !!imageUri ? store.getters.config_g_fileServer + imageUri : ''
  },
  checkImageBeforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    const isLt2M = file.size / 1024 < 500;
    if (!isJPG && !isPNG) {
      Message.error('上传图片必须是PNG或JPG格式!');
      return false;
    }
    if (!isLt2M) {
      Message.error('上传图片大小不能超过 500KB!');
      return false;
    }
    return true
  },
  //数组对象去重
  deDuplication(array, attribute){
    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (array[i][attribute] === array[j][attribute]) {
          array.splice(j, 1);
        }
      }
    }
  },
  //textarea保留空格和换行
  textareaConversion(html){
    return html.replace(/\n/g, "<br>").replace(/\s/g, "&nbsp;&nbsp;");
  },
}

const userUtils = {
  checkLocalUserRight(checkRights, checkLogic) {
    return this.checkUserRight(store.getters.user_g_getUserInfo, checkRights, checkLogic)
  },
  checkUserRight(userInfo, checkRights, checkLogic) {
    if (!checkRights || checkRights.length === 0) {
      return true
    }
    if (!userInfo || !userInfo.roleList) {
      return false
    }
    let userRights = []
    userInfo.roleList.map((role) => {
      userRights = userRights.concat(role.privilegeList)
    })
    if (checkLogic === 'AND') {
      let passed = true
      for (let i = 0; i < checkRights.length; i++) {
        passed = passed && userRights.indexOf(checkRights[i]) >= 0
      }
      return passed
    } else {
      let passed = false
      for (let i = 0; i < checkRights.length; i++) {
        passed = passed || userRights.indexOf(checkRights[i]) >= 0
      }
      return passed
    }
    return false
  }
}
const statusUtils = {}
const cryptoUtils = {
  getEncKey(){
    return CryptoJS.enc.Utf8.parse(CryptoJS.MD5('bosch-extra-aes').toString().substr(0, 16))
  },
  getEncIv() {
    return CryptoJS.enc.Utf8.parse(CryptoJS.MD5(this.getEncKey()).toString().substr(0, 16))
  },
  AESEncrypt(srcStr) {
    let encrypted = CryptoJS.AES.encrypt(srcStr, this.getEncKey(), {
      iv: this.getEncIv(),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    })
    return encrypted.toString()
  },
  AESDecrypt(message) {
    let decrypted = CryptoJS.AES.decrypt(message, this.getEncKey(), {
      iv: this.getEncIv(),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}

const shareUtils = {
  getTemplates() {
    return {
      qzone: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}',
      qq: 'http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}&pics={{IMAGE}}',
      tencent: 'http://share.v.t.qq.com/index.php?c=share&a=index&title={{TITLE}}&url={{URL}}&pic={{IMAGE}}',
      weibo: 'http://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}&appkey={{WEIBOKEY}}',
      wechat: '',
      douban: 'http://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11',
      diandian: 'http://www.diandian.com/share?lo={{URL}}&ti={{TITLE}}&type=link',
      linkedin: 'http://www.linkedin.com/shareArticle?mini=true&ro=true&title={{TITLE}}&url={{URL}}&summary={{SUMMARY}}&source={{SOURCE}}&armin=armin',
      facebook: 'https://www.facebook.com/sharer/sharer.php?u={{URL}}',
      twitter: 'https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}&via={{ORIGIN}}',
      google: 'https://plus.google.com/share?url={{URL}}'
    }
  },
  getDefaultConfig(){
    //TODO 需要确定分享默认内容
    return {
      url: document.location.href,
      title: document.title,
      description: '分享一个好站点',
      source: '',
      image: 'http://www.bosch-extra.com.cn/platform/extra_file!showImage.action?id=4533',
    }
  },
  makeUrl(target, config) {
    config.summary = config.description
    let template = this.getTemplates()[target] || ''
    if (!template) {
      return ''
    }
    return template.replace(/\{\{(\w)(\w*)\}\}/g, function (m, fix, key) {
      let nameKey = target + fix + key.toLowerCase();
      key = (fix + key).toLowerCase();
      return encodeURIComponent((config[nameKey] === undefined ? config[key] : config[nameKey]) || '');
    });
  },
  share(target, config){
    let shareConfig = _.assign(this.getDefaultConfig(), config)
    let targetUrl = this.makeUrl(target, shareConfig)
    if (!targetUrl) {
      return
    }
    window.open(targetUrl)
  },

}

export {
  interceptor,
  localStorageUtils,
  mathUtils,
  dateUtils,
  commonUtils,
  tokenUtils,
  userUtils,
  statusUtils,
  cryptoUtils,
  shareUtils
}
