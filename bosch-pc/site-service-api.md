# Bosch-Extra项目前端应用接口文档 #

>Author: Allan

>Version: 1.0

>Created: 2017-08-09

>测试服务地址（内部）：http://192.168.100.210:9080/site-service

>文件服务地址（内部）：http://192.168.100.210:8081

>测试服务地址（外部）：http://extra-service.chinanorth.cloudapp.chinacloudapi.cn:8000/site-service

>文件服务地址（外部）：http://extra-img.chinanorth.cloudapp.chinacloudapi.cn:8000

>PROD应用服务地址：http://extra-service.chinanorth.cloudapp.chinacloudapi.cn/site-service

>PROD文件服务地址：http://extra-img.chinanorth.cloudapp.chinacloudapi.cn

* **客户登录接口**

	请求URI：/api/auth/login

	请求类型：POST

	content-type: application/json

	请求参数：json

		loginAccount : 登录账号
		password: 登录密码(AES加密字符串）
		loginType: 登录类型 web/app, 默认值web
		loginDevice: 登录设备， APP端特有信息  

		示例
		{
			"loginAccount":"test123",
			"password":"/wzGfHPhP7MlS6IGb4nGxw==",
			"loginType":"app",
			"loginDevice":"iPhone7"
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"clientInfo":{
					"clientId":string, //客户ID
					"loginAccount":string, //登录账号
					"clientStatus":string, //客户状态 01创建 02活跃 03冻结
					"verifyStatus":string, //审核状态 01待审核 02已审核
					"isActivated":int, //0未激活 1已激活
					"clientName":string, //客户名称
					"clientCode":string, //客户编码
					"contactPerson": string, //促销负责人
					"contactMobile": string, //促销负责人手机
					"marketId":string, //所属市场ID
					"marketName":string, //所属市场名称
					"channelId":string, //所属渠道ID
					"channelName":string, //所属渠道名称
					"areaId":string, //所属区域ID
					"areaName":string, //所属区域名称
					"clientType":string, //客户类型 01dealer 02retailer 03workshop
					"avatarImageId":string, //头像图片文件ID
					"avatarImageUri":string, //头像图片文件URI
					"lastLoginTime":date, //最后登录时间,日期对象
					"lastLoginIp":string, //最后登录IP,ipv4
					"isSigned": int, //当日是否已签到 1已签到 0未签到
					"pointList": [ //客户积分信息
						{
							pointId: string, //主键ID
							pointValue: int, //积分值
							specialPoint: int, //特殊积分值
							pointType: string, //积分类型ID
							remark: string, //备注
							pointTypeName: string, //积分类型名称
						},
						...
					]
				},
				"clientToken":string, //身份凭证token串
				"tokenExpireTime":date, //token失效时间,日期对象
				"cartList": [ //客户购物车信息
					cartId: string, //购物车主键ID
					itemId: string, //礼品ID
					itemName: string, //礼品名称
					itemCode: string, //礼品编码
					itemImageUri: string, //礼品列表显示图片URI
					itemQuantity: int, //礼品数量
					exchangePoint: int, //当前兑换积分
					pointType:int, //积分类型ID
					pointTypeName:string, //积分类型名称
					addTime: datet, //加入购物车时间	
					publishStatus: int, //礼品发布状态， 0未发布， 1已发布
					activeStatus: int, //礼品有效状态， 0无效，已删除 1有效
					physicalStock: int, //礼品当前物理库存
					logicalStock: int, //礼品虚拟库存
					usableStock: int, //礼品可用库存
					isPreOrder: int, //是否允许预订 1允许 0不允许
					selected: int, //礼品是否已选中，标记用户在购物车中选择礼品的状态 0未选中，1已选中
				],
				"favoriteList": [ //客户收藏夹信息
					favoriteId: string, //收藏夹主键ID
					itemId: string, //礼品ID
					itemName: string, //礼品名称
					itemCode: string, //礼品编码
					itemImageUri: string, //礼品列表显示图片URI
					exchangePoint: int, //当前兑换积分
					pointType:int, //积分类型ID
					pointTypeName:string, //积分类型名称
					addTime: datet, //加入收藏夹时间	
					publishStatus: int, //礼品发布状态， 0未发布， 1已发布
					activeStatus: int, //礼品有效状态， 0无效，已删除 1有效
					physicalStock: int, //礼品当前物理库存
					logicalStock: int, //礼品虚拟库存
					usableStock: int, //礼品可用库存
				],
				"activityMessage":string //用户参与登录有礼活动成功后获得的信息，客户端检测此属性是否有值决定是否需要额外展示
			}	
		}

	说明：  

	1. 客户端发起登录请求时，需将客户密码进行AES加密后发送至后端
	
	2. 登录请求成功后返回的clientToken作为后续接口请求的用户身份凭证，客户端需实现本地存储，定期请求刷新机制 
	
	3. 请求需要验证用户身份的接口时，向服务端传递Token的两种方法，方法1：将Token加入请求Header中，key=Authorization, value=Bearer tokenValue，示例：{Authorization: Bearer c106df6996bf21c886974fcb92076417}； 方法2：在请求URI后附加请求参数token，示例： /api/xxx/xxx?token=c106df6996bf21c886974fcb92076417
	
	4. 用户密码加密要求：AES/CBC/ZeroPadding. 初始密钥串keyStr=bosch-extra-aes, key=MD5(keyStr).substring(0,16), iv=MD5(key).substring(0,16), key和iv字符串均为小写。  示例代码
		
			import CryptoJS from 'crypto-js'
			...
			key = CryptoJS.enc.Utf8.parse(CryptoJS.MD5('bosch-extra-aes').toString().substr(0,16))
			iv = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(key).toString().substr(0,16))
			let encrypted = CryptoJS.AES.encrypt(srcStr, key, {
		      iv : iv,
		      mode : CryptoJS.mode.CBC,
		      padding : CryptoJS.pad.ZeroPadding
		    })
		    return encrypted.toString()
	5. 用户登录时其他业务逻辑判断，如是否有可参与的活动，是否有新消息提醒等业务逻辑待明确后补充
	

* **客户Token刷新接口**

	请求URI：/api/auth/token/refresh

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：无
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"clientToken":string, //新的身份凭证token串
				"tokenExpireTime":date //token失效时间,日期对象
			}	
		}


* **客户注销登陆接口**

	请求URI：/api/auth/logout

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：无
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string
		}



* **数据字典获取接口**

	请求URI：/api/dictionary/get

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：querystring

		name : 字典对象名称，后台可供查询字典对象名称列表另行提供
		type : 字典数据返回类型，可选传值map/list, 不传值默认返回list  

		示例
		/api/dictionary/get?name=clientTypeMap  
	
	返回结果：json
		
		//返回类型为list时,假设name参数值为clientTypeMap
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"clientTypeMap":[ 
					{
						key:string, //字典值
						value: string, //字典显示信息
					},
					....
				], 
			}	
		}
		//返回类型为map时,假设name参数值为clientTypeMap
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"clientTypeMap":{
					key1: value1, 
					key2: value2, 
				},
					
			}	
		}



* **文件上传接口（登录前）**

	请求URI：/api/public/file/upload

	请求类型：POST

	content-type: multipart/form-data

	请求参数：二进制文件对象

		 file: 文件对象参数名
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"fileDTO":{
					"fileId":string, //文件ID
					"mediaType":string, //文件content-type
					"fileFormat":string, //文件格式,一般为文件后缀名
					"filePath":string, //文件在服务端存储相对路径
					"isZip":int, //是否压缩存储 0-no 1-yes
					"isEncrypt":int, //是否加密存储 0-no 1-yes
					"originalName":string, //文件原始名称
					"fileSize":long, //文件尺寸，byte为单位
					"imageWidth":int, //当上传文件为图片时，图片宽度
					"imageHeight":int, //当上传文件为图片时，图片高度
				}
			}	
		}

	说明：  

	1. 此接口提供未登录状态下前端调用，主要用于客户注册界面上传授权书图片后获取文件ID


* **Base64图片数据上传接口（登录前）**

	请求URI：/api/public/file/base64/upload

	请求类型：POST

	content-type: application/json

	请求参数：json

		imageData: 图片文件base64数据，必填

		示例
		{
			"imageData":"data:image/png;base64,iVB......",
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"fileDTO":{
					"fileId":string, //文件ID
					"mediaType":string, //文件content-type
					"fileFormat":string, //文件格式,一般为文件后缀名
					"filePath":string, //文件在服务端存储相对路径
					"isZip":int, //是否压缩存储 0-no 1-yes
					"isEncrypt":int, //是否加密存储 0-no 1-yes
					"originalName":string, //文件原始名称
					"fileSize":long, //文件尺寸，byte为单位
					"imageWidth":int, //当上传文件为图片时，图片宽度
					"imageHeight":int, //当上传文件为图片时，图片高度
				}
			}	
		}

	说明：  

	1. 此接口提供未登录状态下前端调用



* **文件上传接口（登录后）**

	请求URI：/api/file/upload

	请求类型：POST

	content-type: multipart/form-data
	
	请求头：附带客户Token信息

	请求参数：二进制文件对象

		filePath: 文件服务器端保存目录，为空则使用默认值 
		file: 文件对象参数名
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"fileDTO":{
					"fileId":string, //文件ID
					"mediaType":string, //文件content-type
					"fileFormat":string, //文件格式,一般为文件后缀名
					"filePath":string, //文件在服务端存储相对路径
					"isZip":int, //是否压缩存储 0-no 1-yes
					"isEncrypt":int, //是否加密存储 0-no 1-yes
					"originalName":string, //文件原始名称
					"fileSize":long, //文件尺寸，byte为单位
					"imageWidth":int, //当上传文件为图片时，图片宽度
					"imageHeight":int, //当上传文件为图片时，图片高度
				}
			}	
		}

	说明：  

	1. 此接口提供登录状态下前端调用，所有涉及文件上传的功能模块都应当先调用此接口上传文件，获取文件ID


* **Base64图片数据上传接口（登录后）**

	请求URI：/api/file/base64/upload

	请求类型：POST

	content-type: application/json
	
	请求头：附带客户Token信息

	请求参数：json

		filePath: 文件服务器端保存目录，为空则使用默认值 
		imageData: 图片文件base64数据，必填

		示例
		{
			"imageData":"data:image/png;base64,iVB......",
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"fileDTO":{
					"fileId":string, //文件ID
					"mediaType":string, //文件content-type
					"fileFormat":string, //文件格式,一般为文件后缀名
					"filePath":string, //文件在服务端存储相对路径
					"isZip":int, //是否压缩存储 0-no 1-yes
					"isEncrypt":int, //是否加密存储 0-no 1-yes
					"originalName":string, //文件原始名称
					"fileSize":long, //文件尺寸，byte为单位
					"imageWidth":int, //当上传文件为图片时，图片宽度
					"imageHeight":int, //当上传文件为图片时，图片高度
				}
			}	
		}

	说明：  

	1. 此接口提供登录状态下前端调用，所有涉及文件上传的功能模块都应当先调用此接口上传文件，获取文件ID


	

* **全部省市区信息获取接口**

	请求URI：/api/public/district/all

	请求类型：GET

	content-type: application/json

	请求头：无要求

	请求参数：无
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"provinceList":[ //省份列表信息
					{
						provinceId:string, //省份ID
						provinceName: string, //省份名称
						provinceCode: string, //省份代码
						provinceDesc: string, //省份描述
						cityList: [ //城市列表信息
							{
								cityId:string, //城市ID
								cityName: string, //城市名称
								cityCode: string, //城市代码
								cityDesc: string, //城市描述
								provinceCode: string, //所属省份代码
								countyList:[ //区县列表信息
									{
										countyId:string, //区县ID
										countyName: string, //区县名称
										countyCode: string, //区县代码
										countyDesc: string, //区县描述
										cityCode: string //所属城市代码
									},
									....
								], 
							},
							....
						], 
					},
					....
				], 
			}	
		}


* **省份信息获取接口**

	请求URI：/api/public/district/province/list

	请求类型：GET

	content-type: application/json

	请求头：无要求

	请求参数：无
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"provinceList":[ //省份列表信息
					{
						provinceId:string, //省份ID
						provinceName: string, //省份名称
						provinceCode: string, //省份代码
						provinceDesc: string, //省份描述
					},
					....
				], 
			}	
		}


* **城市信息获取接口**

	请求URI：/api/public/district/city/list

	请求类型：GET

	content-type: application/json

	请求头：无要求

	请求参数：querystring

		provinceCode : 省份代码  

		示例
		/api/public/district/city/list?provinceCode=110000  
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"cityList":[ //城市列表信息
					{
						cityId:string, //城市ID
						cityName: string, //城市名称
						cityCode: string, //城市代码
						cityDesc: string, //城市描述
						provinceCode: string, //所属省份代码
					},
					....
				], 
			}	
		}


* **区县信息获取接口**

	请求URI：/api/public/district/county/list

	请求类型：GET

	content-type: application/json

	请求头：无要求

	请求参数：querystring

		cityCode : 城市代码  

		示例
		/api/public/district/county/list?cityCode=130100  
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"countyList":[ //区县列表信息
					{
						countyId:string, //区县ID
						countyName: string, //区县名称
						countyCode: string, //区县代码
						countyDesc: string, //区县描述
						cityCode: string //所属城市代码
					},
					....
				], 
			}	
		}


* **客户注册接口**

	请求URI：/api/register/submit

	请求类型：POST

	content-type: application/json

	请求头：无要求

	请求参数：json

		applyInviteCode: 邀请码
		clientName: 客户名称，必填
		telephone: 客户电话
		faxNumber: 客户传真
		provinceId: 省份ID，必填
		cityId: 城市ID，必填
		countyId: 区县ID
		detailAddress: 详细地址，必填
		contactPerson: 促销负责人，必填
		contactMobile: 促销负责人手机，必填
		contactEmail: 促销负责人邮件，必填
		authorizeFileId: 授权书文件图片ID，必填

		示例
		{
			"applyInviteCode": "ABCDEFGH"
			"clientName":"测试用户",
			"telephone":"021-12345678",
			"faxNumber":"",
			"provinceId":"1",
			"cityId":"11",
			"countyId":"",
			"detailAddress": "上海市浦东新区",
			"contactPerson": "张三",
			"contactMobile": "13345678909",
			"contactEmail": "zhangsan@test.com",
			"authorizeFileId": "002329db-2132-1232-ef98-34300fde9873",
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string
		}


* **客户重置密码获取验证码接口**

	请求URI：/api/public/reset-password/verify-code

	请求类型：GET

	content-type: application/json

	请求头：无要求

	请求参数：querystring

		mobileNo : 促销负责人手机号码  

		示例
		/api/public/reset-password/verify-code?mobileNo=13312345678 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string
		}


* **客户重置密码提交接口**

	请求URI：/api/public/reset-password

	请求类型：POST

	content-type: application/json

	请求头：无要求

	请求参数：json

		loginAccount: 登录账号，必填
		mobileNo: 促销负责人手机，必填
		verifyCode: 短信验证码，必填
		password: AES加密串，同登录接口，必填

		示例
		{
			"loginAccount":"test123",
			"mobileNo":"13312345678",
			"verifyCode":"123456",
			"password":"/wzGfHPhP7MlS6IGb4nGxw=="
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string
		}


* **客户信息获取接口**

	请求URI：/api/client/info

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：无
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"clientInfo":[ //客户信息
					{
						clientId:string, //客户ID
						clientName: string, //客户名称
						clientCode: string, //客户编码
						marketId: string, //所属市场ID
						marketName: string, //所属市场名称
						channelId: string, //所属渠道ID
						channelName: string, //所属渠道名称
						areaId: string, //所属区域ID
						areaName: string, //所属区域名称
						clientType:string, //客户类型 01dealer 02retailer 03workshop
						telephone: string, //客户电话
						faxNumber: string, //客户传真
						clientDesc: string, //客户备注
						activationCode: string, //激活码
						clientStatus:string, //客户状态 01创建 02活跃 03冻结
						verifyStatus:string, //审核状态 01待审核 02已审核
						isActivated:int, //0未激活 1已激活
						verifyDate: data, //审核日期
						activateDate: date, //激活日期
						provinceId: string, //所属省份ID
						provinceName: string, //所属省份名称
						cityId: string, //所属城市ID
						cityName: string, //所属城市名称
						countyId: string, //所属区县ID
						countyName: string, //所属区县名称
						detailAddress: string, //客户详细地址
						contactPerson: string, //促销负责人
						contactMobile: string, //促销负责人手机
						contactPhone: string, //促销负责人电话
						contactEmail: string, //促销负责人邮件
						avatarImageId: string, //客户头像图片文件ID
						avatarImageUri: string, //客户头像图片URI地址，不包含HOST信息，需另外拼接
						loginAccount: string, //登录账号
						lastLoginTime:date, //最后登录时间,日期对象
						lastLoginIp:string, //最后登录IP,ipv4
						loginFailCount: int, //登录失败次数
					},
					....
				], 
			}	
		}



* **客户基本信息修改获取验证码接口**

	请求URI：/api/client/update-general/verify-code

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数： 无
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string
		}


* **客户基本信息修改接口**

	请求URI：/api/client/update-general

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json

		clientId: 客户ID
		telephone: 客户电话
		faxNumber: 客户传真
		provinceId: 省份ID，必填
		cityId: 城市ID，必填
		countyId: 区县ID
		detailAddress: 详细地址，必填
		contactEmail: 促销负责人邮件，必填
		verifyCode: 手机验证码

		示例
		{
			"clientInfo":{
				"clientId":"12",
				"telephone":"021-12345678",
				"faxNumber":"",
				"provinceId":"1",
				"cityId":"11",
				"countyId":"",
				"detailAddress": "上海市浦东新区",
				"contactEmail": "zhangsan@test.com",
			},
			"verifyCode": "123456",
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string
		}


* **客户关键息申请修改接口**

	请求URI：/api/client/update-key

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json

		clientId: 客户ID
		clientName: 客户名称，必填
		contactPerson: 促销负责人，必填
		contactMobile: 促销负责人手机，必填
		authorizeFileId: 授权书文件图片ID，必填

		示例
		{
			"clientId":"12",
			"clientName":"测试用户",
			"contactPerson": "张三",
			"contactMobile": "13345678909",
			"authorizeFileId": "002329db-2132-1232-ef98-34300fde9873",
		}
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string
		}


* **客户密码修改接口**

	请求URI：/api/client/update-password

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json

		oldPassword: 原密码，AES加密串，同登录接口
		newPassword: 新密码，AES加密串，同登录接口
		示例
		{
			"oldPassword":"/wzGfHPhP7MlS6IGb4nGxw==",
			"newPassword":"silkdfoi023k4lksdfu8=kd"
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string
		}


* **客户头像修改接口**

	请求URI：/api/client/update-avatar

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json

		avatarImageId: 头像图片文件ID
		示例
		{
			"avatarImageId":"002329db-2132-1232-ef98-34300fde9873",
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"avatarImageUri":string //头像图片URI地址
			}	
		}


* **客户激活流程修改资料提交接口**

	请求URI：/api/client/activation/modify-info

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json

		clientName: 客户名称，必填
		telephone: 客户电话
		faxNumber: 客户传真
		provinceId: 省份ID，必填
		cityId: 城市ID，必填
		countyId: 区县ID
		detailAddress: 详细地址，必填
		contactPerson: 促销负责人，必填
		contactMobile: 促销负责人手机，必填
		contactEmail: 促销负责人邮件，必填
		authorizeFileId: 授权书文件图片ID，必填

		示例
		{
			"clientName":"测试用户",
			"telephone":"021-12345678",
			"faxNumber":"",
			"provinceId":"1",
			"cityId":"11",
			"countyId":"",
			"detailAddress": "上海市浦东新区",
			"contactPerson": "张三",
			"contactMobile": "13345678909",
			"contactEmail": "zhangsan@test.com",
			"authorizeFileId": "002329db-2132-1232-ef98-34300fde9873",
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string
		}



* **客户激活流程获取激活码接口**

	请求URI：/api/client/activation/verify-code

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数： 无
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string
		}


* **客户激活流程最终激活提交接口**

	请求URI：/api/client/activation/submit

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json

		newPassword: 新密码，AES加密串，同登录接口
		activationCode: 激活码

		示例
		{
			"newPassword":"239sjl8l2ndfdsf983dddlkf==",
			"activationCode":"456789",
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string
		}




* **客户签到接口**

	请求URI：/api/client/sign

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json

		signFrom: 签到来源，web/app, 默认值web

		示例
		{
			"signFrom":"app"
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"continuousCount": int, //连续签到天数
				"pointType":string, //积分类型ID，如有奖励则返回，无奖励不返回
				"pointTypeName":string, //积分类型名称，如有奖励则返回，无奖励不返回
				"pointValue":int, //奖励积分值，如有奖励则返回，无奖励不返回
			}	
		}



* **客户签到记录查询接口**

	请求URI：/api/client/sign/list

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：querystring

		page: 当前页数，默认值为1
		pageSize: 每页显示数据条数，不传入则使用服务器默认配置
		startDate: 查询开始日期，YYYY-MM-DD格式字符串，默认值为当前日期往前反推30天
		endDate: 查询结束日期，YYYY-MM-DD格式字符串，默认值为当前日期

		示例
		/api/client/sign/list?page=1&pageSize=10&startDate=2017-08-01&endDate=
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"signList":[ //签到记录
					{
						signDate: datetime, //签到日期时间
						signFrom: string, //签到来源，web/app
						continuousCount: int, //连续签到天数
					},
					....
				], 
				"pageInfo":{
					totalCounts: int, //总记录数
					totalPages: int, //总页数
					curPage: int, //当前页码
				}
			}	
		}



* **客户收货地址获取接口**

	请求URI：/api/client/address/list

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：无
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"addressList":[ //收货地址列表
					{
						addressId: string, //收货地址ID
						clientId: string, //客户ID
						provinceId: string, //省份ID
						provinceName: string, //省份名称
						cityId: string, //城市ID
						cityName: string, //城市名称
						countyId: string, //区县ID
						countyName: string, //区县名称
						detailAddress: string, //详细地址
						isDefault: int, //是否默认地址
						contactPerson: string, //收货人
						contactMobile: string, //收货人手机
						contactPhone: string, //收货人电话
						contactEmail: string, //收货人邮件
						zipCode: string, //邮编编码
					},
					....
				], 
			}	
		}



* **客户收货地址修改获取验证码接口**

	请求URI：/api/client/address/verify-code

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数： 无
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string
		}


* **客户收货地址新建接口**

	请求URI：/api/client/address/create

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json

		provinceId: 省份ID，必填
		cityId: 城市ID，必填
		countyId: 区县ID
		detailAddress: 详细地址，必填
		isDefault: 是否默认地址 0不是 1是 
		contactPerson: 收货人，必填
		contactMobile: 收货人手机，必填
		contactPhone: 收货人电话
		contactEmail: 收货人邮件
		zipCode: 邮编
		verifyCode: 验证码

		示例
		{
			"addressInfo":{
				"provinceId":"1",
				"cityId": "2",
				"countyId": "3",
				"detailAddress": "...",
				"isDefault": 1,
				"contactPerson": "aaa",
				"contactMobile": "13345678909",
				"contactPhone": "021-12345678",
				"contactEmail": "11@11.com",
				"zipCode": "",
			},
			"verifyCode": ""
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
		}


* **客户收货地址更新接口**

	请求URI：/api/client/address/update

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json

		addressId: 地址ID
		provinceId: 省份ID，必填
		cityId: 城市ID，必填
		countyId: 区县ID
		detailAddress: 详细地址，必填
		isDefault: 是否默认地址 0不是 1是 
		contactPerson: 收货人，必填
		contactMobile: 收货人手机，必填
		contactPhone: 收货人电话
		contactEmail: 收货人邮件
		zipCode: 邮编
		verifyCode: 验证码

		示例
		{
			"addressInfo":{
				"addressId": "12",
				"provinceId":"1",
				"cityId": "2",
				"countyId": "3",
				"detailAddress": "...",
				"isDefault": 1,
				"contactPerson": "aaa",
				"contactMobile": "13345678909",
				"contactPhone": "021-12345678",
				"contactEmail": "11@11.com",
				"zipCode": "",
			},
			"verifyCode": ""
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
		}


* **客户收货地址删除接口**

	请求URI：/api/client/address/remove

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json

		addressId: 地址ID
		verifyCode: 验证码

		示例
		{
			"addressId": "12",
			"verifyCode": ""
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
		}


* **网站内容配置信息接口**

	请求URI：/api/public/content

	请求类型：GET

	content-type: application/json

	请求头：未登录状态无要求，登录后附带客户Token信息

	请求参数：querystring

		useScope : 应用范围，如不传值默认为web，可选参数web,app

		示例
		/api/public/content  或 /api/public/content?useScope=app  
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"contentList":[ //网站内容配置信息
					{
						contentId:string, //配置项ID
						contentTitle: string, //配置项名称
						contentType: string, //配置项类型 01=主页banner 02=主页促销位 03=广告位
						scenarioType: string, //使用场景 01=未登录 02=已登陆
						useScope: string, //应用范围 web, app, both
						targetUrl: string, //链接地址
						webImageFile: string, //网页端使用图片文件ID
						mobileImageFile: string, //移动端使用图片文件ID
						startDate: date, //配置项有效期开始时间
						endDate: date, //配置项有效期结束时间
						dspOrder: int, //排序顺序，倒序排列
						webImageUri: string, //网页端图片URI地址，不包含HOST信息，需另外拼接
						mobileImageUri: string //移动端图片URI地址，不包含HOST信息，需另外拼接
					},
					....
				], 
			}	
		}

	说明：  

	1. 登录前、登录后的网站配置内容通过同一个接口返回，根据客户端请求时是否附带用户身份凭证判断。
	
	2. 主页banner，促销位，广告位配置内容都包含在返回的contentList数组中，客户端根据contentType筛选所需内容 



* **新闻公告列表信息接口**

	请求URI：/api/public/notice/list

	请求类型：GET

	content-type: application/json

	请求头：未登录状态无要求，登录后附带客户Token信息

	请求参数：无
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"noticeList":[ //公告列表信息
					{
						noticeId:string, //公告ID
						noticeTitle: string, //公告名称
						noticeType: string, //公告类型 01=新闻 02=品牌资讯
						scenarioType: string, //使用场景 01=未登录 02=已登陆
						noticeContent: string, //公告内容
						publishStatus: int, //发布状态 1已发布 0未发布
						fileId: string, //附件ID
						fileUri: string, //附件文件URI
						fileName: string, //附件文件名称
						createDate: date, //创建日期
					},
					....
				], 
			}	
		}

	说明：  

	1. 登录前、登录后的公告内容通过同一个接口返回，根据客户端请求时是否附带用户身份凭证判断。
	

* **新闻公告具体信息接口**

	请求URI：/api/public/notice/info/{noticeId}

	请求类型：GET

	content-type: application/json

	请求头：未登录状态无要求，登录后附带客户Token信息

	请求参数：path variable

		noticeId : 公告id

		示例
		/api/public/notice/info/23
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"noticeInfo": {//公告信息
					noticeId:string, //公告ID
					noticeTitle: string, //公告名称
					noticeType: string, //公告类型 01=新闻 02=品牌资讯
					scenarioType: string, //使用场景 01=未登录 02=已登陆
					noticeContent: string, //公告内容
					publishStatus: int, //发布状态 1已发布 0未发布
					fileId: string, //附件ID
					fileUri: string, //附件文件URI
					fileName: string, //附件文件名称
					createDate: date, //创建日期
				}
			}	
		}

	说明：  

	1. 登录前、登录后的公告内容通过同一个接口返回，根据客户端请求时是否附带用户身份凭证判断,未登录用户访问需要登录用户才可见的公告信息系统会返回错误提示。
	


* **推荐礼品信息获取接口**

	请求URI：/api/public/item/recommend

	请求类型：GET

	content-type: application/json

	请求头：无要求

	请求参数：无
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"recommendItemList":[ //推荐礼品列表
					{
						recommendId:string, //主键
						itemId: string, //礼品ID
						itemName: string, //礼品名称
						itemCode: string, //礼品编码
						marketId: string, //所属市场
						dspOrder: int, //排序顺序，倒序排列
						itemImageUri: string, //礼品图片URI地址，不包含HOST信息，需另外拼接
					},
					....
				], 
			}	
		}


* **兑换排行信息获取接口**

	请求URI：/api/exchange-ranking/list

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：无
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"rankingList":[ //兑换排行礼品列表
					{
						rankingId:string, //主键
						itemId: string, //礼品ID
						itemName: string, //礼品名称
						itemCode: string, //礼品编码
						marketId: string, //所属市场
						exchangeQuantity: int, //兑换数量
						dspOrder: int, //排序顺序，倒序排列
						exchangePoint: int, //兑换积分
						pointType: string, /积分类型
						pointTypeName: string, //积分类型名称
						isSpecial: int, //是否需要特殊积分 0不需要，1需要
						isPromotion: int, //礼品当前是否处于促销活动中， 1是 0否
						promotionPoint: int, //礼品促销积分，如礼品当前处于促销活动时，用于兑换的所需积分
						itemImageUri: string, //礼品图片URI地址，不包含HOST信息，需另外拼接
					},
					....
				], 
			}	
		}


* **礼品分类信息（列表）查询接口**

	请求URI：/api/item/category/list

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：querystring

		parentId : 父分类id，默认值为0，全部分类  

		示例
		/api/item/category/list  或 /api/item/category/list?parentId=12  
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"categoryList":[ //礼品分类信息列表
					{
						categoryId:string, //分类ID
						categoryName: string, //分类名称
						categoryCode: string, //分类代码
						categoryDesc: string, //分类描述
						parentCategoryId: string, //父分类ID
						dspOrder: int, //排序顺序，倒序排列
						subList: [  //子分类列表
							{
								categoryId:string, //分类ID
								categoryName: string, //分类名称
								categoryCode: string, //分类代码
								categoryDesc: string, //分类描述
								parentCategoryId: string, //父分类ID
								dspOrder: int, //排序顺序，倒序排列
								subList: array,
							},
							...
						], 
					},
					....
				], 
			}	
		}


* **礼品分类信息（单个）查询接口**

	请求URI：/api/item/category/info/{categoryId}

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：path variable

		categoryId : 分类id

		示例
		/api/item/category/info/10
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"categoryInfo":{ //礼品分类信息
					categoryId:string, //分类ID
					categoryName: string, //分类名称
					categoryCode: string, //分类代码
					categoryDesc: string, //分类描述
					parentCategoryId: string, //父分类ID
					dspOrder: int, //排序顺序，倒序排列
					parentList: [  //父分类列表，从根节点开始顺序排列
						{
							categoryId:string, //分类ID
							categoryName: string, //分类名称
							categoryCode: string, //分类代码
							categoryDesc: string, //分类描述
							parentCategoryId: string, //父分类ID
							dspOrder: int, //排序顺序，倒序排列
						},
						...
					], 
					subList: [  //子分类列表
						{
							categoryId:string, //分类ID
							categoryName: string, //分类名称
							categoryCode: string, //分类代码
							categoryDesc: string, //分类描述
							parentCategoryId: string, //父分类ID
							dspOrder: int, //排序顺序，倒序排列
							subList: array,
						},
						...
					], 
				}
			}	
		}


* **礼品标签(分类显示)查询接口**

	请求URI：/api/item/tag/show-in-category/list

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：无参数

		示例
		/api/item/tag/show-in-category/list
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"tagList":[ //需要同分类一起展示的标签信息
					{
						tagId:string, //标签ID
						tagName: string, //标签名称
						dspOrder: int, //排序顺序，倒序排列
					},
					....
				], 
			}	
		}


* **礼品热搜显示关键字查询接口**

	请求URI：/api/item/keyword/show/list

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：无参数

		示例
		/api/item/keyword/show/list
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"keywordList":[ //需要同分类一起展示的标签信息
					{
						searchWordId:string, //关键字主键ID
						wordLabel: string, //关键字文本
						showInPage: int, //是否在页面显示
						showInAssociate: int, //是否在输入联想时显示
						dspOrder: int, //排序顺序，倒序排列
					},
					....
				], 
			}	
		}


* **礼品搜索联想关键字查询接口**

	请求URI：/api/item/keyword/associate/list

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：querystring

		label : 用户输入内容  

		示例
		/api/item/keyword/associate/list?label=test
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"keywordList":[ //需要同分类一起展示的标签信息
					{
						searchWordId:string, //关键字主键ID
						wordLabel: string, //关键字文本
						showInPage: int, //是否在页面显示
						showInAssociate: int, //是否在输入联想时显示
						dspOrder: int, //排序顺序，倒序排列
					},
					....
				], 
			}	
		}




* **礼品信息列表查询接口**

	请求URI：/api/item/list

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：querystring

		page: 当前页数，默认值为1
		pageSize: 每页显示数据条数，不传入则使用服务器默认配置
		keyword: 搜索关键字
		pointFrom: 积分区间从
		pointTo: 积分区间到
		categoryId: 商品分类ID
		tagId: 商品标签ID，一般情况下，categoryId和tagId不会同时传入

		示例
		/api/item/list?page=1&pageSize=10&keyword=test&pointFrom=&pointTo=100&categoryId=1&tagId=
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"itemList":[ //礼品列表
					{
						itemId:string, //礼品ID
						itemName: string, //礼品名称
						itemCode: string, //礼品编码
						briefIntro: string, //礼品概述
						categoryId: string, //礼品所属分类ID
						marketId: string, //礼品所属市场ID
						publishStatus: int, //礼品发布状态， 0未发布， 1已发布
						publishDate: date, //礼品发布时间
						isGroup: int,//是否礼品组 1是 0否
						belongGroupId: string, //当不是礼品组时，此礼品所属礼品组，0表示不属于礼品组
						showLabel: string, //当礼品属于礼品组时，在礼品组下作为选择项时的文本内容，为空时用itemName显示
						itemDesc: string, //礼品描述，具体内容是否包含HTML片段待定
						specInfo: string, //规格参数，具体内容是否包含HTML片段待定
						isSpecial: int, //是否需要特殊积分 0不需要，1需要
						firstPointType: string, //首选积分类型ID
						secondPointType: string, //次选积分类型ID
						unitId: string, //计量单位ID
						brandId: string, //礼品品牌ID
						basePoint: int, //礼品基础积分
						physicalStock: int, //礼品当前物理库存（可用库存+未发货订单占用库存）
						logicalStock: int, //礼品虚拟库存
						lockStock: int, //礼品锁定库存
						safetyStock: int, //礼品安全库存
						usableStock: int, //礼品可用库存，礼品可用库存小于等于物理库存
						dspOrder: int, //礼品排序顺序，倒序排列
						isPreOrder: int, //是否允许预订 1允许 0不允许
						isLasts: int, //是否售完即止 1是 0否
						exchangePoint: int, //按当前用户渠道计算所得的礼品兑换积分
						isPromotion: int, //礼品当前是否处于促销活动中， 1是 0否
						promotionPoint: int, //礼品促销积分，如礼品当前处于促销活动时，用于兑换的所需积分
						isFavorite: int, //是否被当前用户收藏
						marketName: string, //礼品所属市场名称
						firstPointTypeName: string, //首选积分类型名称
						secondPointTypeName: string, //次选积分类型名称
						unitName: string, //计量单位名称
						brandName: string, //品牌名称
						itemCategory: { //商品所属分类对象
							categoryId: string, //分类ID
							categoryName: string, //分类名称
							categoryCode: string, //分类编码
							categoryDesc: string, //分类描述
							parentCategoryId: string, //父分类ID
							dspOrder: int, //排序顺序，倒序排列
						},
						itemImageUri: string, //礼品列表显示图片URI,
						subItems:[ //当前为礼品组（即isGroup==1）时，附带此礼品组下关联的礼品信息，每个itemInfo对象结构同标准itemInfo对象
							{
								itemInfo object...
							}
						]
						
					},
					....
				], 
				"pageInfo":{
					totalCounts: int, //总记录数
					totalPages: int, //总页数
					curPage: int, //当前页码
				}
			}	
		}



* **礼品详情查询接口**

	请求URI：/api/item/info/{itemId}

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：path variable

		itemId : 礼品id

		示例
		/api/item/info/10
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"itemInfo":{ //礼品详细信息
					itemId:string, //礼品ID
					itemName: string, //礼品名称
					itemCode: string, //礼品编码
					briefIntro: string, //礼品概述
					categoryId: string, //礼品所属分类ID
					marketId: string, //礼品所属市场ID
					publishStatus: int, //礼品发布状态， 0未发布， 1已发布
					publishDate: date, //礼品发布时间
					itemDesc: string, //礼品描述，具体内容是否包含HTML片段待定
					specInfo: string, //规格参数，具体内容是否包含HTML片段待定
					isSpecial: int, //是否需要特殊积分 0不需要，1需要
					firstPointType: string, //首选积分类型ID
					secondPointType: string, //次选积分类型ID
					unitId: string, //计量单位ID
					brandId: string, //礼品品牌ID
					basePoint: int, //礼品基础积分
					physicalStock: int, //礼品当前物理库存
					logicalStock: int, //礼品虚拟库存
					lockStock: int, //礼品锁定库存
					safetyStock: int, //礼品安全库存
					usableStock: int, //礼品可用库存
					dspOrder: int, //礼品排序顺序，倒序排列
					isPreOrder: int, //是否允许预订 1允许 0不允许
					isLasts: int, //是否售完即止 1是 0否
					exchangePoint: int, //按当前用户渠道计算所得的礼品兑换积分
					isPromotion: int, //礼品当前是否处于促销活动中， 1是 0否
					promotionPoint: int, //礼品促销积分，如礼品当前处于促销活动时，用于兑换的所需积分
					isFavorite: int, //是否被当前用户收藏
					marketName: string, //礼品所属市场名称
					firstPointTypeName: string, //首选积分类型名称
					secondPointTypeName: string, //次选积分类型名称
					unitName: string, //计量单位名称
					brandName: string, //品牌名称
					itemCategory: { //商品所属分类对象
						categoryId: string, //分类ID
						categoryName: string, //分类名称
						categoryCode: string, //分类编码
						categoryDesc: string, //分类描述
						parentCategoryId: string, //父分类ID
						dspOrder: int, //排序顺序，倒序排列
					},
					itemImageUri: string, //礼品列表显示图片URI
				},
				"imageList":[ //礼品图片列表
					{
						itemImageId: string, //礼品图片主键ID
						fileName: string, //图片名称
						imageFileId: string, //图片文件ID
						dspOrder: int, //排列顺序
						fileUri: string, //礼品图片URI
					}
				]
			}	
		}



* **购物车信息查询接口**

	请求URI：/api/cart/list

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：无参数

		示例
		/api/cart/list
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"cartList":[ //购物车商品信息列表
					{
						cartId: string, //购物车主键ID
						itemId: string, //礼品ID
						itemName: string, //礼品名称
						itemCode: string, //礼品编码
						itemImageUri: string, //礼品列表显示图片URI
						itemQuantity: int, //礼品数量
						exchangePoint: int, //当前兑换积分
						pointType:int, //积分类型ID
						pointTypeName:string, //积分类型名称
						isSpecial: int, //是否需要特殊积分 0不需要，1需要
						addTime: datet, //加入购物车时间
						publishStatus: int, //礼品发布状态， 0未发布， 1已发布
						activeStatus: int, //礼品有效状态， 0无效，已删除 1有效
						physicalStock: int, //礼品当前物理库存
						logicalStock: int, //礼品虚拟库存
						usableStock: int, //礼品可用库存
						isPreOrder: int, //是否允许预订 1允许 0不允许
						selected: int, //礼品是否已选中，标记用户在购物车中选择礼品的状态 0未选中，1已选中
						
					},
					....
				], 
			}	
		}



* **购物车添加礼品接口**

	请求URI：/api/cart/add

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json array

		itemId: 礼品ID，必填
		itemQuantity: 礼品数量，必填

		示例
		[
			{
				"itemId":"11",
				"itemQuantity": "1",
			},
			...
		] 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
		}


* **购物车直接购买礼品接口**

	请求URI：/api/cart/buy

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json

		itemId: 礼品ID，必填
		itemQuantity: 礼品数量，必填

		示例
		{
			"itemId":"11",
			"itemQuantity": "1",
		}
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
		}



* **购物车修改礼品数量接口**

	请求URI：/api/cart/update

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json

		itemId: 礼品ID，必填
		itemQuantity: 礼品数量，必填

		示例
		{
			"itemId":"11",
			"itemQuantity": "2",
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
		}



* **购物车移除礼品接口**

	请求URI：/api/cart/remove

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json array

		itemId: 礼品ID，必填

		示例
		[
			{
				"itemId":"11",
			},
			...
		] 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
		}



* **购物车礼品选中状态更新及结算前校验接口**

	请求URI：/api/cart/settlement-check

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json array

		itemId: 礼品ID，必填
		selected: 是否选中

		示例
		[
			{
				"itemId":"11",
				"selected": "1",
			}
		] 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
		}

	说明：

	1. 用户在购物车点击结算时调用此接口，用于将用户在购物车内选中的礼品信息提交至服务端，服务端校验所选中礼品是否可进入订单结算页面
	
	2. 服务端将用户标记为已选中的商品设置为选中状态，购物车中其他不在参数中的商品，选中状态会被自动设为未选中
	
	3. 服务端校验发现不能提交订单则返回错误代码和错误消息
	
	4. 接口反馈成功状态时，客户端主动跳转进入订单结算界面  


* **收藏夹信息查询接口**

	请求URI：/api/favorite/list

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：无参数

		示例
		/api/favorite/list
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"favoriteList":[ //收藏夹商品信息列表
					{
						favoriteId: string, //收藏夹主键ID
						itemId: string, //礼品ID
						itemName: string, //礼品名称
						itemCode: string, //礼品编码
						itemImageUri: string, //礼品列表显示图片URI
						exchangePoint: int, //当前兑换积分
						pointType:int, //积分类型ID
						pointTypeName:string, //积分类型名称
						isSpecial: int, //是否需要特殊积分 0不需要，1需要
						addTime: datet, //加入收藏夹时间
						publishStatus: int, //礼品发布状态， 0未发布， 1已发布
						activeStatus: int, //礼品有效状态， 0无效，已删除 1有效
						physicalStock: int, //礼品当前物理库存
						logicalStock: int, //礼品虚拟库存
						usableStock: int, //礼品可用库存
					},
					....
				], 
			}	
		}



* **收藏夹添加礼品接口**

	请求URI：/api/favorite/add

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json

		itemId: 礼品ID，必填
		itemQuantity: 礼品数量，必填

		示例
		[
			{
				"itemId":"11",
			},
			...	
		] 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
		}



* **收藏夹移除礼品接口**

	请求URI：/api/favorite/remove

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json

		itemId: 礼品ID，必填

		示例
		[
			{
				"itemId":"11",
			},
			...
		] 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
		}



* **客户积分查询接口**

	请求URI：/api/point/list

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：无参数

		示例
		/api/point/list
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"pointList": [ //客户积分信息
					{
						pointId: string, //主键ID
						pointValue: int, //积分值
						specialPoint: int, //特殊积分值
						pointType: string, //积分类型ID
						remark: string, //备注
						pointTypeName: string, //积分类型名称
					},
					...
				]
			}	
		}


* **客户积分明细查询接口**

	请求URI：/api/point/detail/list

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：无参数

		示例
		/api/point/detail/list
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"pointDetailList": [ //客户积分明细信息
					{
						pointDetailId: string, //主键ID
						totalPoint: int, //积分总数
						availablePoint: int, //当前可用积分值
						totalSpecialPoint: int, //特殊积分总数
						availableSpecialPoint: int, //当前可用特殊积分值
						pointType: string, //积分类型ID
						startDate: date, //有效期起始日期
						endDate: date, //有效期终止日期
						remark: string, //备注
						pointTypeName: string, //积分类型名称
					},
					...
				]
			}	
		}


* **客户积分变更历史查询接口**

	请求URI：/api/point/history/list

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：querystring

		page: 当前页数，默认值为1
		pageSize: 每页显示数据条数，不传入则使用服务器默认配置
		inout: 积分变更类型， 1积分获得 -1积分使用，默认值1，查询积分获取记录
		remark: 积分说明
		recordTimeFrom: 查询起始日期，yyyy-MM-dd格式字符串
		recordTimeTo: 查询终止日期，yyyy-MM-dd格式字符串
		pointValueFrom: 积分值从
		pointValueTo: 积分值到
		pointType: 积分类型ID

		示例
		/api/point/history/list?page=1&pageSize=10&inout=1&remark=&recordTimeFrom=2017-05-01&recordTimeTo=&pointValueFrom=&pointValueTo&pointType=

		示例
		/api/point/detail/list
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"pointHistoryList": [ //客户积分明细信息
					{
						historyId: string, //主键ID
						orderId: string, //对应订单ID，积分使用记录时可能存在对应值
						orderNumber: string, //对应订单编号
						orderDetailId: string, //订单明细记录ID,客户退货时可能存在
						activityId: string, //活动ID
						activityName: string, //活动名称，活动可能获得积分，也可能使用积分
						pointValue: int, //积分值
						specialPoint: int, //特殊积分值
						pointType: string, //积分类型ID
						inout: int, //积分变更类型 1积分获得 -1积分使用
						inoutType: int, //积分变更具体类型，获取和使用有不同的字典选项
						startDate: date, //有效期起始日期
						endDate: date, //有效期终止日期
						remark: string, //积分说明
						recordTime: date, //积分变更记录时间
						pointTypeName: string, //积分类型名称
						inoutTypeName: string, //积分变更具体类型名称
					},
					...
				], 
				"pageInfo":{
					totalCounts: int, //总记录数
					totalPages: int, //总页数
					curPage: int, //当前页码
				}
			}	
		}


* **博世产品扫码验真伪接口**

	请求URI：/api/product/qr-code/scan

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：querystring

		scanCode : 扫码结果  

		示例
		/api/product/qr-code/scan?scanCode=1232132132123
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				pointValue: int, //获得积分值
				pointType: string, //积分类型ID
				pointTypeName: string, //积分类型名称
			}	
		}

	说明：

	1. 目前尚未明确扫码返积分的业务逻辑，可能会延后实现




* **订单创建获取初始化数据接口**

	请求URI：/api/order/create/init

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：无参数

		示例
		/api/order/create/init
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"orderItems":[ //订单包含礼品信息列表
					{
						itemId: string, //礼品ID
						itemName: string, //礼品名称
						itemCode: string, //礼品编码
						listImageUri: string, //礼品列表显示图片URI
						itemQuantity: int, //礼品数量
						pointValue: int, //兑换积分（礼品详情中所显示的兑换积分，等价于商品单价信息）
						pointType: string, //积分类型ID
						pointTypeName: string, //积分类型名称
						isSpecial: int, //是否使用特殊积分
						physicalStock: int, //礼品当前物理库存
						logicalStock: int, //礼品虚拟库存
						usableStock: int, //礼品可用库存
						isPreOrder: int, //是否允许预订 1允许 0不允许
						detailUsePoint: int, //明细所需总共积分
						isGroup: int, //礼品类型 0=普通礼品 2=礼品套包
						subOrderItemList: [ //当isGroup=2时，所对应的子礼品信息
							{
								itemId: string，
								itemCode: string,
								......
							},
							...
						],
					},
					....
				], 
				orderPoint:[ //订单所需积分，即所有订单礼品兑换积分汇总
					{
						pointValue: int, //积分值
						pointType:int, //积分类型ID
						pointTypeName:string, //积分类型名称
						isSpecial: int, //是否需要特殊积分 0不需要，1需要
					},
					...
				],
				couponList:[ //订单礼品可使用的卡券列表
					{
						couponId: string, //卡券ID
						couponType: string, //卡券类型 01-积分兑换 02-积分满减 03-礼品兑换
						couponCode: string, //卡券编号
						couponName: string, //卡券名称
						pointType: string, //卡券相关积分类型ID
						deductPointLimit: int, //卡券满减积分要求
						deductPointValue: int, //卡券满减积分值
						limitCategoryCode: string, //卡券满减限制礼品分类编码，为空时不限制
						limitCategoryId: string, //卡券满减限制礼品分类ID，为空时不限制
						limitItemCode: string, //礼品兑换限制礼品编码
						limitItemId: string, //礼品兑换限制礼品ID
						exchangeRatio: double, //礼品兑换折扣比例 >0 & <1
						generateTime: string, //卡券生成时间
						expireDate: datetime, //卡券过期日期
						couponStatus: string, //卡券状态 01创建 02有效 03已使用 04过期
						assignTime: datetime, //卡券分配时间
						clientId: string, //卡券分配客户ID
						couponTypeName: string, //卡券类型名称
						pointTypeName: string, //卡券相关积分类型名称
						limitCategoryName: string, //卡券满减限制礼品分类名称，为空时不限制
						limitItemName: string, //礼品兑换限制礼品名称
						couponStatusName: string //卡券状态名称
					},
					...
				],
				presentList:[ //订单礼品符合满赠活动条件下的活动及赠品信息列表
					{
						activityId: string, //活动ID
						itemId: string, //赠品礼品ID
						addPayType: string, //赠品礼品所需积分类型ID
						addPay: int, //赠品礼品所需积分值，为0时表示免费赠送
						addPayTypeName: string, //赠品礼品所需积分类型名称
						categoryId: string, //参与满赠限制礼品分类ID，为空时不限制
						limitPointType: string, //参与满赠消费积分类型ID
						limitPointValue: int, //参与满赠消费积分最小值
						limitPointTypeName: string, //参与满赠消费积分类型名称
						activityName: string, //活动名称		
						itemDTO:{ //赠品礼品对象，详细信息参考礼品信息查询接口返回结果
						...
					},
					....
				],
				channelInfo:{ //当前用户所属渠道信息
					channelId: string, //渠道ID
					channelName: string, //渠道名称
					limitOrderPoint: int, //免运费要求订单最低积分值，为0或为空时无运费限制，订单内多种积分类型的值直接相加
					logisticsPointValue: int, //订单积分不满足要求时所需额外支付运费积分值，基于这个值和补运费礼品单价计算需要额外增加的补运费礼品购买数量
				}，
				logisticsItem: { //补运费礼品对象，详细信息同标准礼品对象返回信息，此处返回是为了前端代码区分订单礼品列表中是否存在此类礼品
					...
				}，
				quickLogisticsItem: { //加急发货运费礼品对象，详细信息同标准礼品对象返回信息，此处返回是为了前端代码区分订单礼品列表中是否存在此类礼品
					...
				}
			}	
		}

	说明：

	1. 用户由购物车进入订单结算时，客户端自动向服务端发起订单创建初始化数据的查询请求，获取真实兑换积分信息
	
	2. 返回礼品信息正常情况下即用户在购物车界面选中的礼品信息
	
	3. 若由于各种不可测原因，返回结果中不存在orderItems数据时，可视为出现脏数据引用，客户端自动跳转至购物车界面

	4. presentList和couponList的界面操作基于可能存在的数据和用户是否选择，若用户无相关数据则不显示或显示无对应数据

	4. channelInfo对象用于前端判断当前用户的当前订单是否需要额外加收运费



* **订单创建检查接口**

	请求URI：/api/order/create/check

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json array

		addressId: 收货地址ID，必填
		orderRemark: 订单备注
		itemId: 礼品ID，必填
		itemQuantity: 兑换数量
		couponId: 用户选择的优惠券ID

		示例
		{
			"addressId": "10",
			"orderRemark": "",
			"detailList": [
				{
					"itemId": "1",
					"itemQuantity": 1
				},
				...
			],
			"couponId": 6,
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"useSecond": int, //是否需要使用次选类型积分，1是 0否，表示用户当前主选积分不足，但可用次选积分补足
				"useSecondRemark", string, //用于前端展示的提示消息
				"orderPoint": [ //以选中商品下单所需消耗积分信息
					{
						pointValue: int, //积分值
						pointType:int, //积分类型ID
						pointTypeName:string, //积分类型名称
						isSpecial: int, //是否需要特殊积分 0不需要，1需要
					},
					...
				]
			}
		}

	说明：

	1. 用户在点击订单提交按钮时，首先调用此接口检查订单是否可以提交
	
	2. 服务端校验发现不能提交订单则返回错误代码和错误消息
	
	3. 接口反馈成功状态时，程序应继续调用/order/create接口用于真正创建订单  




* **订单创建提交接口**

	请求URI：/api/order/create

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json

		addressId: 收货地址ID，必填
		orderRemark: 订单备注
		itemId: 礼品ID，必填
		itemQuantity: 兑换数量
		couponId: 用户选择的优惠券ID
		activityId: 满赠活动ID，即代表用户选择了哪个满赠的礼品
		

		示例
		{
			"addressId": "10",
			"orderRemark": "",
			"detailList": [
				{
					"itemId": "1",
					"itemQuantity": 1
				},
				...
			],
			"couponId": 6,
			"activityId": 6,
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"orderInfo":{ //订单信息
					orderId: string, //订单ID
					orderNumber: string, //订单号
				}, 
			}
		}

	说明：

	1. 订单结算页面提交订单时调用此接口；
	
	2. 服务端返回成功状态时，同时返回新创建订单的ID和编号
	
	3. 订单创建失败时，服务端返回错误信息



* **订单列表查询接口**

	请求URI：/api/order/list

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：querystring

		page: 当前页数，默认值为1
		pageSize: 每页显示数据条数，不传入则使用服务器默认配置
		orderNumber: 订单号，可模糊搜索
		orderStatus: 订单状态，订单状态字典集另行提供
		orderDateFrom: 订单搜索开始日期，yyyy-MM-dd格式字符串
		orderDateTo: 订单搜索结束日期，yyyy-MM-dd格式字符串

		示例
		/api/order/list?page=1&pageSize=10&orderNumber=0001&orderStatus=&orderDateFrom=2017-08-01&orderDateTo=
	

	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"orderList":[ //订单列表信息
					{
						baseInfo:{
							orderId: string, //订单ID
							orderNumber: string, //订单号
							orderStatus: string, //订单状态
							orderStatusName: string, //订单状态显示值
							splitStatus: string, //订单拆分状态  01未拆分 02拆分中 03已拆分
							orderDate: date, //订单日期
							orderRemark: string, //订单备注
							parentOrderId: string, //父订单ID，子订单存在此属性且有值
							parentOrderNumber: string, //父订单号
							receivePerson: string, //收货人
							receivePhone: string, //收货人电话
							provinceId: string, //收货人所在省份ID
							provinceName: string, //收货人所在省份
							cityId: string, //收货人所在城市ID
							cityName: string, //收货人所在城市
							countyId: string, //收货人所在区县ID
							countyName: string, //收货人所在区县
							detailAddress: string, //收货详细地址
							zipCode: string, //邮政编码
							logisticsType: string, //物流类型 01汽运 02快递 03专车 04空运
							logisticsCompany: string, //物流公司
							logisticsNumber: string, //物流单号
						},
						orderPoint:[ //订单所需积分，即所有订单礼品兑换积分汇总
							{
								pointValue: int, //积分值
								pointType:int, //积分类型ID
								pointTypeName:string, //积分类型名称
								isSpecial: int, //是否需要特殊积分 0不需要，1需要
							},
							...
						]，
						detailList:[
							{
								orderDetailId: string, //订单明细ID
								orderId: string, //订单ID
								subOrderId: string, //子订单ID，当此条明细从属于某个子订单时，此属性有值
								itemId: string, //礼品ID
								itemName: string, //礼品名称
								itemCode: string, //礼品编码
								itemImageUri: string, //礼品列表显示图片URI
								categoryId: string, //礼品分类ID
								categoryName: string, //礼品分类名称
								itemQuantity: int, //礼品数量
								isSpecial: int, //是否需要特殊积分 0不需要，1需要
								pointValue: int, //兑换所需积分值，（类似商品单价）
								pointType:int, //积分类型ID
								pointTypeName:string, //积分类型名称
								totalPoint: int, //兑换礼品所需积分值（此积分值是根据单价*数量计算得出，并非实际消耗积分）
								isPreOrder: int, //是否预订购 1是0否
								returnStatus: int, //退货状态 0未退货 1已退货
								returnReason: string, //退货原因
								returnReasonName: string, //退货原因文本
								returnDesc: string, //退货补充说明
								detailPoint:[ //兑换此礼品实际所需积分，如出现首选积分不足且允许使用次选积分情况时，会返回多条记录
									{
										pointValue: int, //积分值
										pointType:int, //积分类型ID
										pointTypeName:string, //积分类型名称
										isSpecial: int, //是否需要特殊积分 0不需要，1需要
									},
									...
								]
							}	
						]，
						subOrderList: [ //当订单拆分状态为拆分中或已拆分时，将返回主订单包含的子订单列表
							{
								//子订单内容同主订单
								baseInfo:{
									
								},
								orderPoint:[],
								detailList:[]
							}
						]
					},
					...
					
				], 
				"pageInfo":{
					totalCounts: int, //总记录数
					totalPages: int, //总页数
					curPage: int, //当前页码
				}
			}
		}

	说明：

	1. 返回列表中的元素都是主订单对象
	
	2. 当订单包含子订单时，subOrderList列表会包含对应子订单列表信息，主订单的detailList会被拆分到各个子订单中，部分未被拆分到子订单的明细数据可能会保留在主订单明细列表中（此逻辑待定）。
	


* **订单详情查询接口**

	请求URI：/api/order/info/{orderId}

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：path variable

		orderId : 订单id

		示例
		/api/order/info/20

	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"orderInfo":{ //订单列表信息
						baseInfo:{
							orderId: string, //订单ID
							orderNumber: string, //订单号
							orderStatus: string, //订单状态
							orderStatusName: string, //订单状态显示值
							splitStatus: string, //订单拆分状态  01未拆分 02拆分中 03已拆分
							orderDate: date, //订单日期
							orderRemark: string, //订单备注
							parentOrderId: string, //父订单ID，子订单存在此属性且有值
							parentOrderNumber: string, //父订单号
							receivePerson: string, //收货人
							receivePhone: string, //收货人电话
							provinceId: string, //收货人所在省份ID
							provinceName: string, //收货人所在省份
							cityId: string, //收货人所在城市ID
							cityName: string, //收货人所在城市
							countyId: string, //收货人所在区县ID
							countyName: string, //收货人所在区县
							detailAddress: string, //收货详细地址
							zipCode: string, //邮政编码
							logisticsType: string, //物流类型 01汽运 02快递 03专车 04空运
							logisticsCompany: string, //物流公司编码
							logisticsNumber: string, //物流单号
						},
						orderPoint:[ //订单所需积分，即所有订单礼品兑换积分汇总
							{
								pointValue: int, //积分值
								pointType:int, //积分类型ID
								pointTypeName:string, //积分类型名称
								isSpecial: int, //是否需要特殊积分 0不需要，1需要
							},
							...
						]，
						detailList:[
							{
								orderDetailId: string, //订单明细ID
								orderId: string, //订单ID
								subOrderId: string, //子订单ID，当此条明细从属于某个子订单时，此属性有值
								itemId: string, //礼品ID
								itemName: string, //礼品名称
								itemCode: string, //礼品编码
								itemImageUri: string, //礼品列表显示图片URI
								categoryId: string, //礼品分类ID
								categoryName: string, //礼品分类名称
								itemQuantity: int, //礼品数量
								isSpecial: int, //是否需要特殊积分 0不需要，1需要
								pointValue: int, //兑换所需积分值，（类似商品单价）
								pointType:int, //积分类型ID
								pointTypeName:string, //积分类型名称
								totalPoint: int, //兑换礼品所需积分值（此积分值是根据单价*数量计算得出，并非实际消耗积分）
								isPreOrder: int, //是否预订购 1是0否
								returnStatus: int, //退货状态 0未退货 1已退货
								returnReason: string, //退货原因
								returnReasonName: string, //退货原因文本
								returnDesc: string, //退货补充说明
								detailPoint:[ //兑换此礼品实际所需积分，如出现首选积分不足且允许使用次选积分情况时，会返回多条记录
									{
										pointValue: int, //积分值
										pointType:int, //积分类型ID
										pointTypeName:string, //积分类型名称
										isSpecial: int, //是否需要特殊积分 0不需要，1需要
									},
									...
								]
							}	
						]，
						subOrderList: [ //当订单拆分状态为拆分中或已拆分时，将返回主订单包含的子订单列表
							{
								//子订单内容同主订单
								baseInfo:{
									
								},
								orderPoint:[],
								detailList:[]
							}
						]
					
				}, 
			}
		}

	说明：

	1. 返回值详细内容参考订单列表接口说明  
	


* **订单礼品取消接口**

	请求URI：/api/order/item/return

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json

		orderId: 订单ID
		orderDetailId: 订单明细ID
		itemId: 礼品ID
		returnReason: 退货原因
		returnDesc: 退货补充说明

		示例
		{
			"orderId": "10",
			"orderDetailId": "21",
			"itemId": "1",
			"returnReason": "01",
			"returnDesc": "blablabla"
		} 
	

	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
		}

	说明：

	1. 客户针对订单明细中的某一条礼品明细记录执行退货（取消）操作
	
	2. 仅使用非特殊积分且当前订单处于未发货状态的明细礼品允许退货，客户端提交之前需执行此判断
	
	3. 服务端检验是否可退货，如发现无法退货将返回错误代码给客户端
	
	4. 服务端返回成功代码，则表示退货已成功，客户端更新订单状态有两种方式，1）本地更新对应订单明细的状态，整个订单的兑换所需积分值，2）客户端调用order/info接口重新获取订单信息并更新本地数据
	
	5. 客户退货涉及积分返还问题，故客户端还需要另外调用客户积分查询接口更新本地的客户积分数据



* **订单物流状态查询接口**

	请求URI：/api/order/logistics/query

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：querystring

		searchNumber: 查询单号，完整物流单号
		logisticsType: 物流类型
		logisticsCompany: 物流公司编码

		示例
		api/order/logistics/query?searchNumber=670104749239&logisticsType=02&logisticsCompany=SF

	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"billList":[ //订单列表信息
					{
						location: string, //位置
						desc: string, //描述
						time: date, //时间
						remark: string, //备注
						isSign: string, //是否已签收 0 未签收 1已签收
					},
					...	
				], 
			}
		}

	说明：

	1. 物流信息返回内容依赖第三方快递信息查询接口  



* **活动列表查询接口**

	请求URI：/api/activity/list

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：querystring

		page: 当前页数，默认值为1
		pageSize: 每页显示数据条数，不传入则使用服务器默认配置
		activityName: 活动名称
		activityCode: 活动编码
		activityType: 活动类型
		onlyValid: 是否只查询未过期活动，仅当值=1时被用于查询

		示例
		/api/activity/list?page=1&pageSize=10&activityName=test&activityCode=&activityType=01&onlyValid=1
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"activityList":[ //活动列表
					{
						activityId:string, //活动ID
						activityName: string, //活动名称
						activityCode: string, //活动编码
						activityType: string, //活动类型
						pointType: string, //积分类型ID，针对需要奖励积分的活动有值
						pointValue: int, //积分值
						costPoint: int, //所需积分值，针对需要用户花费积分参与的活动有值
						urlAddress: string, //活动定制页面链接
						activityDesc: string,//活动内容描述，HTML文档格式
						isPublish: int, //是否已发布，1发布 0未发布
						startDate: datetime, //活动开始时间，精确到秒
						endDate: datetime, //活动结束时间，精确到秒
						takenNumber: int, //用户可参与次数，红包可领取次数等
						activityConfig: string, //活动特殊配置，不同活动可自由定义，JSON格式字符串
						effectiveDays: int, //活动奖励积分有效期
						activityTypeName: string, //活动类型名称
						pointTypeName: string //积分类型名称
					},
					....
				], 
				"pageInfo":{
					totalCounts: int, //总记录数
					totalPages: int, //总页数
					curPage: int, //当前页码
				}
			}	
		}



* **活动信息查询接口**

	请求URI：/api/activity/info

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：path variable

		activityId : 活动id

		示例
		/api/activity/info/23
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"activityInfo":{ //活动信息
					activityId:string, //活动ID
					activityName: string, //活动名称
					activityCode: string, //活动编码
					activityType: string, //活动类型
					pointType: string, //积分类型ID，针对需要奖励积分的活动有值
					pointValue: int, //积分值
					costPoint: int, //所需积分值，针对需要用户花费积分参与的活动有值
					urlAddress: string, //活动定制页面链接
					activityDesc: string,//活动内容描述，HTML文档格式
					isPublish: int, //是否已发布，1发布 0未发布
					startDate: datetime, //活动开始时间，精确到秒
					endDate: datetime, //活动结束时间，精确到秒
					takenNumber: int, //用户可参与次数，红包可领取次数等
					activityConfig: string, //活动特殊配置，不同活动可自由定义，JSON格式字符串
					effectiveDays: int, //活动奖励积分有效期
					activityTypeName: string, //活动类型名称
					pointTypeName: string //积分类型名称
				}
			}	
		}




* **有奖问答问题列表接口**

	请求URI：/api/activity/question/list

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：querystring

		activityId: 活动ID

		示例
		/api/activity/question/list?activityId=2
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"questionList":[ //问题列表
					{
						questionId:string, //问题ID
						activityId: string, //活动ID
						questionCode: string, //问题编码
						questionType: string, //问题类型code
						questionSubject: string, //问题描述
						questionOptions: string, //单选题和多选题时，问题选项值，JSON格式
						pointType: string, //积分类型ID,积分类型继承活动问卷定义的值，此处无内容
						pointValue: int, //积分值
						charCountMin: int,//问答题时，所需回答最小字数，值为0则无限制
						isMandatory: int, //是否必须回答的问题
						dspOrder: int, //展示顺序
						addTime: datetime, //问题加入问卷时间
						questionTypeName: string, //问题类型名称
						optionList:[ //questionOptions转换后对象
							{
								value: string, //问题选项值
								label: string //问题选项显示文本
							},
							....
						]
					},
					....
				]
			}	
		}


* **有奖问答问题答复信息查询接口**

	请求URI：/api/activity/question/answer/query

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：querystring

		activityId: 活动ID

		示例
		/api/activity/question/answer/query?activityId=2
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"replyList":[ //如当前用户参与过此问答活动，则返回用户提交的答复信息，如无返回值则代表用户未参与此问答
					{
						replyId:string, //答复ID
						activityId: string, //活动ID
						questionId: string, //问题ID
						clientId: string, //客户ID
						clientAnswer: string, //客户答案
						otherOptionDesc: string, //客户选择“其他”选项时额外填入的内容
						isCorrect: int, //答复是否正确
						pointType: string, //获得积分类型ID
						pointValue: int, //获得积分值
						submitTime: datetime, //答复时间
					},
					....
				]
			}	
		}



* **有奖问答问题答复信息提交接口**

	请求URI：/api/activity/question/submit

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json

		activityId: 活动ID
		questionId: 问题ID
		clientAnswer: 问题答复
		otherOptionDesc: 选择“其他”选项时额外填入内容

		示例
		{
			"activityId": "10",
			"questionId": "21",
			"clientAnswer": "a,b",
			"otherOptionDesc": ""
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				pointType: string, //积分类型ID
				pointTypeName: string, //积分类型名称
				pointValue: int, //积分值
				correctCount: int, //回答正确题目数量
				answerList:[  //问题正确答案列表
					{
						questionId: string, //问题ID
						questionAnswer: string //问题答案
					},
					...
				]
			}	
		}


* **抢红包接口**

	请求URI：/api/activity/red-packet/obtain

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json

		activityId: 活动ID

		示例
		{
			"activityId": "10"
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				pointType: string, //积分类型ID
				pointTypeName: string, //积分类型名称
				pointValue: int, //积分值
			}	
		}


* **秒杀活动礼品列表接口**

	请求URI：/api/activity/seckill/list

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：querystring

		activityId: 活动ID

		示例
		/api/activity/seckill/list?activityId=2
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"seckillItemList":[ //秒杀礼品列表
					{
						detailId:string, //礼品记录ID
						activityId: string, //活动ID
						itemId: string, //礼品ID
						itemCode: string, //礼品编码
						itemName: string, //礼品名称
						itemImageUri: string, //礼品图片URI
						pointType: string, //积分类型ID
						pointValue: int, //积分值
						totalQuantity: int,//总共可秒杀礼品数量
						buyQuantity: int, //每个用户可购买最大数量
						dspOrder: int, //展示顺序
						addTime: datetime, //问题加入问卷时间
						pointTypeName: string, //积分类型名称
						startTime: string, //秒杀开始时间
						endTime: string, //秒杀结束时间
						attended: string, //当前用户是否参与过 1参与过 0未参与过
						sellout: string, //礼品是否已售完
						soldCount: int, //已售数量
						leftCount: int //剩余数量
					},
					....
				]
			}	
		}




* **秒杀提交接口**

	请求URI：/api/activity/seckill/submit

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json

		activityId: 活动ID
		itemId: 礼品ID
		itemQuantity: 礼品数量
		addressId: 收货地址ID

		示例
		{
			"activityId": "10"，
			"itemId": "12",
			"itemQuantity": 1,
			"addressId": 14
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string
		}




* **推荐有礼活动详情信息查询接口**

	请求URI：/api/activity/invite/query

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：querystring

		activityId: 活动ID

		示例
		/api/activity/invite/query?activityId=2
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"inviteDetailInfo":[ //推荐有礼详情对象
					{
						detailId:string, //记录ID
						activityId: string, //活动ID
						clientId: string, //客户ID
						inviteCode: string, //邀请码
						generateTime: datetime, //生成时间
					},
					....
				]
			}	
		}
	
	说明：

	1. 前台界面应为用户提供两种推荐码展示方式，一种是可用于浏览器访问的网页地址，另一种是便于移动端用户扫码的二维码
	
	2. 用户注册界面需要调整为可接受一个邀请码参数，出于同web端统一的要求，页面邀请码变量的参数名称为applyInviteCode   




* **抽奖活动奖项信息查询接口**

	请求URI：/api/activity/prize-draw/list

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：querystring

		activityId: 活动ID

		示例
		/api/activity/prize-draw/list?activityId=2
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"detailList":[ //具体单个活动下用于显示的可抽奖奖项信息列表
					{
						detailId:string, //记录ID
						activityId: string, //活动ID
						prizeType: string, //奖项类型 01-积分 02-卡券 09-谢谢参与
						pointType: string, //奖品为积分时的积分类型
						pointValue: int, //奖品为积分时的积分值
						couponDefineId: string, //奖品为卡券时，卡券定义ID值
						couponExpireDays: int, //奖品为卡券时，卡券生成时的过期天数
						couponExpireDate: datetime, //奖品为卡券时，卡券生成时的过期日期
						limitCount: int, //奖项可被抽中最大次数,为0或负数表示不限制
						hitRangeBegin: int, //奖项命中区间开始值
						hitRangeEnd: int, //奖项命中区间终止值，举例begin=5，end=15，则当随机数 (>=5 && <=15)时就表示命中
						prizeTypeName: string, //奖项类型名称
						pointTypeName: string, //积分类型名称
						couponDefineInfo: {
							couponDefineId: string, //卡券定义ID
							couponDefineCode: string, //卡券定义编码
							couponDefineName: string, //卡券定义名称
							....
						},
						attendCount: int, //已参与次数		
					},
					....
				]
			}	
		}



* **抽奖提交接口**

	请求URI：/api/activity/prize-draw/submit

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json

		activityId: 活动ID

		示例
		{
			"activityId": "10"，
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"attendInfo": //用户抽中奖项信息
					{
						attendId:string, //参与ID
						activityId: string, //活动ID
						detailId: string, //活动奖项ID，与前一接口返回的奖项列表中某个元素的detaiId可匹配，帮助前端定位最终落位区间
						clientId: string, //客户ID
						attendTime： datetime, //参与时间	
					}
			}	
		}




* **碎片收集活动用户已收集碎片查询接口**

	请求URI：/api/activity/piece/list

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：querystring

		activityId: 活动ID

		示例
		/api/activity/piece/list?activityId=2
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"pieceList": { //用户已收集碎片信息列表,包括碎片活动奖励相关信息
					activityId: string, //活动ID
					awardType: string, //碎片兑换奖励类型 01-积分 02-卡券
					pointType: string, //奖品为积分时的积分类型
					pointValue: int, //奖品为积分时的积分值
					couponDefineId: string, //奖品为卡券时，卡券定义ID值
					couponExpireDays: int, //奖品为卡券时，卡券生成时的过期天数
					couponExpireDate: datetime, //奖品为卡券时，卡券生成时的过期日期
					pieceListData:[ //碎片列表
						pieceCode: string, //碎片编码
						RangeBegin: int, //命中区间开始值
						RangeEnd: int, //命中区间终止值
						count: int  //当前用户收集到的个数
					]，
					pointTypeName: string, //积分类型名称
					clientPieceList:[ //当前用户已收集的碎片明细记录
						collectId: string, //收集记录ID
						pieceCode: string, //碎片编码
						clientId: string, //客户ID
						collectTime: datetime, //收集时间
						isExchanged: int //是否已兑换 0未兑换 1已兑换
					]	
				}
			}	
		}



* **碎片集合兑换奖品接口**

	请求URI：/api/activity/piece/exchange

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json

		activityId: 活动ID

		示例
		{
			"activityId": "10"，
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"exchangeResult":{ //兑换结果信息
					exchangeId:string, //兑换记录ID
					activityId: string, //活动ID
					clientId: string, //客户ID
					exchangeTime： datetime, //兑换时间	
					awardType: string, //碎片兑换奖励类型 01-积分 02-卡券
					pointType: string, //奖品为积分时的积分类型
					pointValue: int, //奖品为积分时的积分值
					pointTypeName: string, //积分类型名称,
					couponId: string, //奖品为卡券时，卡券ID
					couponInfo: { //奖品为卡券时，卡券对象信息，详见卡券信息查询接口返回结果描述
						......
					},
					exchangePieces: string, //用于兑换的碎片信息
					collectIds: string, //用于兑换的收集记录ID字符串
				}
			}	
		}



* **碎片收集活动用户兑换记录查询接口**

	请求URI：/api/activity/piece/exchangeRecord

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：querystring

		page: 当前页数，默认值为1
		pageSize: 每页显示数据条数，不传入则使用服务器默认配置
		activityId: 活动ID
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"exchangeList": [ //用户已收集碎片信息列表,包括碎片活动奖励相关信息
					{
						exchangeId:string, //兑换记录ID
						activityId: string, //活动ID
						clientId: string, //客户ID
						exchangeTime： datetime, //兑换时间	
						awardType: string, //碎片兑换奖励类型 01-积分 02-卡券
						pointType: string, //奖品为积分时的积分类型
						pointValue: int, //奖品为积分时的积分值
						pointTypeName: string, //积分类型名称,
						couponId: string, //奖品为卡券时，卡券ID
						couponInfo: { //奖品为卡券时，卡券对象信息，详见卡券信息查询接口返回结果描述
							......
						},
						exchangePieces: string, //用于兑换的碎片信息
						collectIds: string, //用于兑换的收集记录ID字符串
					},
					...
				],
				"pageInfo":{
					totalCounts: int, //总记录数
					totalPages: int, //总页数
					curPage: int, //当前页码
				}
			}	
		}






* **我的卡券列表接口**

	请求URI：/api/coupon/list

	请求类型：GET

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：querystring

		page: 当前页数，默认值为1
		pageSize: 每页显示数据条数，不传入则使用服务器默认配置
		couponType: 卡券类型 02=积分满减 03=礼品兑换
		couponCode: 卡券编码
		couponName: 卡券名称
		giftCode: 卡券礼品码
		couponStatus: 卡券状态 01创建 02有效 03已使用 04过期
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"couponList":[ //卡券列表
					{
						couponId: string, //卡券ID
						couponType: string, //卡券类型 01-积分兑换 02-积分满减 03-礼品兑换
						couponCode: string, //卡券编号
						couponName: string, //卡券名称
						pointType: string, //卡券相关积分类型ID
						deductPointLimit: int, //卡券满减积分要求
						deductPointValue: int, //卡券满减积分值
						limitCategoryCode: string, //卡券满减限制礼品分类编码，为空时不限制
						limitCategoryId: string, //卡券满减限制礼品分类ID，为空时不限制
						limitItemCode: string, //礼品兑换限制礼品编码
						limitItemId: string, //礼品兑换限制礼品ID
						exchangeRatio: double, //礼品兑换折扣比例 >0 & <1
						generateTime: string, //卡券生成时间
						giftCode: string, //礼品码
						lastTakeDate: datetime, //最后领取时间
						expireDays: int, //卡券过期天数，当使用礼品码兑换且未定义过期日期时，基于此数字计算过期日期
						expireDate: datetime, //卡券过期日期
						couponStatus: string, //卡券状态 01创建 02有效 03已使用 04过期
						assignTime: datetime, //卡券分配时间
						clientId: string, //卡券分配客户ID
						useTime: datetime, //卡券使用时间
						orderId: string, //卡券相关订单ID
						couponTypeName: string, //卡券类型名称
						pointTypeName: string, //卡券相关积分类型名称
						limitCategoryName: string, //卡券满减限制礼品分类名称，为空时不限制
						limitItemName: string, //礼品兑换限制礼品名称
						couponStatusName: string, //卡券状态名称
						orderNumber: string //相关订单号
					},
					....
				],
				"pageInfo":{
					totalCounts: int, //总记录数
					totalPages: int, //总页数
					curPage: int, //当前页码
				}
			}	
		}



* **卡券礼品码领取接口**

	请求URI：/api/coupon/gift-code/take

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json

		giftCode: 礼品码

		示例
		{
			"giftCode": "SDIDK9SPKJKD09"，
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				couponType: "01", //当兑换的卡片类型为01时，系统自动为客户兑换积分并将卡券状态设为已使用
				pointType: string, //积分类型ID
				pointTypeName: string, //积分类型名称
				pointValue: int, //积分值
			}	
		}



* **微信JSAPI参数获取接口**

	请求URI：/api/wx/jsapi/config

	请求类型：POST

	content-type: application/json

	请求头：附带客户Token信息

	请求参数：json

		url: 调用端页面url地址

		示例
		{
			"url": "http://bosch-extra.com.cn:8002/xxx/..."，
		} 
	
	返回结果：json
		
		{
			"resultCode":string, //0-成功，不为0-错误，具体错误信息参考resultMsg
			"resultMsg":string,
			"resultData":{ //接口调用成功（resultCode=0）时返回的数据
				"jsapiConfig":{ //秒杀礼品列表
					appId:string, //微信公众号ID
					ticketValue: string, //jsapi_ticket value
					nonceStr: string, //随机字符串
					timestamp: string, //生成签名时的时间戳
					signature: string, //安全签名
					url: string, //用于构建签名的url
				}
			}	
		}