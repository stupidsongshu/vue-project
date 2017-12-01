<template>
  <div class="v-width  v-footer">
    <ul class="v-footer-bg-ul">
      <li>
        <dl>
          <dt>配送说明</dt>
          <dd @click="goToWeb('terms')" class="pointer hover">网站使用条款</dd>
          <dd @click="goToWeb('distribution')" class="pointer hover">配送说明</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>积分兑换</dt>
          <dd @click="goToWeb('point-exchange')" class="pointer hover">积分兑换方法</dd>
          <dd @click="goToWeb('common-problem')" class="pointer hover">网站使用常见问题</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>友情链接</dt>
          <dd @click="open('http://www.bosch.com.cn/zh/cn/startpage_4/country-landingpage.php')" class="pointer hover">
            博世中国
          </dd>
          <dd @click="open('http://www.bosch-aa.com.cn')" class="pointer hover">博世AA</dd>
          <dd @click="open('https://catalogue.bosch-trading.com.cn/cn')" class="pointer hover">博世汽配在线目录</dd>
          <dd @click="open('http://www.protect.bosch.com')" class="pointer hover">零配件真伪查询</dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>客服服务</dt>
          <dd @click="goToWeb('about-us')" class="pointer hover">关于我们</dd>
          <dd @click="goToWeb('manual')" class="pointer hover">用户手册</dd>
          <dd @click="goToWeb('authorization')" class="pointer hover">授权书</dd>
          <dd @click="goToWeb('item-authorization')" class="pointer hover">礼品兑换授权书</dd>
        </dl>
      </li>
      <li>
        <div class="text-align-center" style="text-indent:0">
          <img src="../../assets/images/bosch-footer.png"/>
          <span class="v-footer-phone">400-000-5109</span>
          <span class="v-footer-email">bosch-extra@logisticpal.com</span>
          <img src="../../assets/images/time-footer.png"/>
        </div>
      </li>
    </ul>
    <div class="v-footer-bg-copyright">
      <!--<ul>-->
      <!--<li>网站地图</li>-->
      <!--<li>意见反馈</li>-->
      <!--<li>常见问题</li>-->
      <!--</ul>-->
      <span>{{getICP()}}</span>
      <span @click="openPublicSecurityRecord()">沪公网安备 <span class="pointer"
                                                            style="display:inline; text-decoration: underline ">{{getPublicSecurityRecord()}}</span> 号</span>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        recordcode: '',
      }
    },
    methods: {
      goToWeb(name){
        this.$router.push({name: name});
      },
      open(url){
        window.open(url);
      },
      getICP(){
        let nowHref = window.location.href;
        let loyalty = 'extra-loyalty.com.cn';
        let extra = 'bosch-extra.com.cn';
        if (nowHref.toLowerCase().indexOf(loyalty, 0) !== -1) {
          return ' 沪ICP备 10002431号-23 Copyright (c) extra-loyalty.com.cn All rights reserved.'
        } else if (nowHref.toLowerCase().indexOf(extra, 0) !== -1) {
          return ' 沪ICP备 10002431号-22 Copyright (c) bosch-extra.com.cn All rights reserved.'
        } else {
          return ' 沪ICP备 10002431号-22 Copyright (c) bosch-extra.com.cn All rights reserved.'
        }
      },
      getPublicSecurityRecord(){
        let nowHref = window.location.href;
        let loyalty = 'extra-loyalty.com.cn';
        let extra = 'bosch-extra.com.cn';
        if (nowHref.toLowerCase().indexOf(loyalty, 0) !== -1) {
          this.recordcode = '31010502001436';
          return '31010502001436'
        } else if (nowHref.toLowerCase().indexOf(extra, 0) !== -1) {
          this.recordcode = '31010502001429';
          return '31010502001429'
        } else {
          this.recordcode = '31010502001429';
          return '31010502001429'
        }
      },
      openPublicSecurityRecord(){
        window.open('http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=' + this.recordcode);
      },
    }
  }
</script>
<style>
</style>