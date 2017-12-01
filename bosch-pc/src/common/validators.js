const validators = {
  checkNumber: function(rule, value, callback) {
    if (null != value && ''!=value && !/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value )) {
      callback(new Error('请输入数字'));
    }else{
      callback();
    }
  },
  checkInteger: function(rule, value, callback) {
    if (null != value && ''!=value && !/^-?\d+$/.test( value )) {
      callback(new Error('请输入整数'));
    }else{
      callback();
    }
  },
  checkMobile: function(rule, value, callback) {
    if (null != value && ''!=value && !(value.length == 11 && /^(1[3|4|5|7|8][0-9]\d{8})$/.test(value))) {
      callback(new Error('请输入正确的手机号码'));
    }else{
      callback();
    }
  },
  checkEmail: function(rule, value, callback) {
    if (null != value && ''!=value && !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)) {
      callback(new Error('请输入正确的邮箱地址'));
    }else{
      callback();
    }
  },
}

export default validators
