<template>
  <div>
    <el-breadcrumb separator="/" class="big-title">
      <el-breadcrumb-item :to="{name:'item-search-all-list'}">全部分类</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in itemInfo.itemCategory.parentList" :key="item.categoryId"
                          :to="{name:'item-list',query:{categoryId:item.categoryId}}">
        {{item.categoryName}}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{name:'item-list',query:{categoryId:itemInfo.itemCategory.categoryId}}">
        {{itemInfo.itemCategory.categoryName}}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{itemInfo.itemName}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-loading="loading">
      <el-row class="padding-top-20">
        <el-col :span="8">
          <div class="margin-auto" style="width:190px;height:190px;">
            <image-view :imgUrl="imgUrl"></image-view>
            <!--<img :src='imgUrl' style="height:190px;width:190px;"/>-->
          </div>
          <div style="width:160px;margin:10px auto;">
            <switch-item :imageList="imageList" :size="size" @get="getImg"></switch-item>
          </div>
          <el-popover ref="popover" placement="right" width="100" trigger="click">
            <ul class=" item-info-share text-align-center">
              <li @click="doShare('weibo', shareData)">分享到微博</li>
              <li @click="doShare('qq', shareData)">分享到QQ</li>
              <li @click="doShare('wechat', shareData)">分享到微信</li>
            </ul>
          </el-popover>
          <ul class="item-info-icon">
            <li :class="getIcon" @click="collection()">收藏</li>
            <li v-popover:popover>分享</li>
          </ul>
        </el-col>
        <el-col :span="16" class="padding-left-20 relative">
          <el-form :model="itemInfo" label-width="60px">
            <div class="item-info-title"> {{itemInfo.itemName}}</div>
            <el-form-item label="兑换积分" class="margin-bottom-0">
              <span v-if="itemInfo.isPromotion===0||!itemInfo.isPromotion">{{itemInfo.exchangePoint}}</span>
              <div v-if="itemInfo.isPromotion===1">
                <span class="padding-right-20">{{itemInfo.promotionPoint}}</span>
                <span class="color-green line-through">原积分 : {{itemInfo.exchangePoint}}</span>
              </div>
            </el-form-item>
            <el-form-item label="积分类型" class="margin-bottom-0">{{itemInfo.firstPointTypeName}}
              <span v-if="itemInfo.isSpecial===1">(特殊积分)</span>
            </el-form-item>
            <el-form-item label="礼品编码" class="margin-bottom-0">{{itemInfo.itemCode}}</el-form-item>
            <el-form-item label="当前礼品" class="margin-bottom-0 margin-top-10" v-if="itemInfo.isGroup===1">
              <el-button v-for="item in belongGroupList" @click="selected(item.itemInfo)" :key="item.itemInfo.itemId"
                         :type="getButtonType(item)" class="margin-right-10 margin-bottom-10">
                {{ getShowItemName(item.itemInfo)}}
              </el-button>
            </el-form-item>
            <el-form-item label="当前库存" class="margin-bottom-0">{{getMax}}
              <span class="color-green"
                    v-if="(!!itemInfo.logicalStock&&itemInfo.logicalStock>0?itemInfo.logicalStock:itemInfo.usableStock)===0&&itemInfo.isPreOrder === 1">(预订商品,可兑换)</span>
            </el-form-item>
            <el-form-item label="兑换数量" class="margin-bottom-10">
              <el-input-number v-model="itemInfoForm.itemQuantity" :min="1"
                               :max="9999"
                               size="small" class="number__decrease"></el-input-number>
            </el-form-item>
          </el-form>
          <el-button class="item-info-button-exchange item-info-button" @click="goToMyOrder()"
                     :disabled="checkVerifyStatus">立即兑换
          </el-button>
          <el-button class="item-info-button-shopping item-info-button" @click="goToShoppingCart()" type="primary">加入购物车
          </el-button>
          <img src="../../assets/images/cu.png" class="absolute" style="right:500px;top:0;width:40px;height:40px;"
               v-if="itemInfo.isPromotion===1"/>
        </el-col>
      </el-row>
      <el-row>
        <template>
          <el-tabs v-model="defaultTab" type="card">
            <el-tab-pane label="礼品描述" name="desc">
              <div v-html="itemInfo.itemDesc" style="max-width:100%;overflow: hidden" class="ql-editor"></div>
            </el-tab-pane>
            <el-tab-pane label="规格参数" name="spec">
              <div v-html="itemInfo.specInfo" style="max-width:100%;overflow: hidden" class="ql-editor"></div>
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-row>
      <el-dialog title="分享到微信" :visible.sync="wechatShareVisible" size="tiny" class="wechat-share-window">
        <qr-code :text="shareData.url" :size="200" error-level="L"></qr-code>
        <div class="text-align-center margin-top-20">扫一扫，分享到微信</div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import switchItem from '../components/switch-item.vue'
  import {mapState, mapGetters} from 'vuex'
  import _ from 'lodash'
  import {shareUtils} from '../../utils'
  import VueQRCodeComponent from 'vue-qrcode-component'
  import imageView from './image-view.vue'
  export default{
    components: {
      'switch-item': switchItem,
      'qr-code': VueQRCodeComponent,
      'image-view': imageView,
    },
    mounted() {
      this.itemInfoForm.itemId = this.$route.params.itemId;
      this.defaultTab = 'desc';
      this.selectBelongGroupItem = {};
      this.getItemInfo();
    },
    computed: {
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
        fileServer: 'config_g_fileServer'
      }),
      getMax(){
        if (!!this.selectBelongGroupItem.itemId) {
          return this.selectBelongGroupItem.logicalStock > 0 ? this.selectBelongGroupItem.logicalStock : this.selectBelongGroupItem.usableStock;
        } else {
          return this.itemInfo.logicalStock > 0 ? this.itemInfo.logicalStock : this.itemInfo.usableStock;
        }
      },
      getIcon(){
        return this.itemInfo.isFavorite ? 'item-info-icon-collected' : '';
      },
      checkVerifyStatus(){
        return this.userInfo.verifyStatus === '01' ? true : false;
      },
      shareData(){
        //TODO 需要确定分享内容
        return {
          url: document.location.href,
//          url:'http://www.baidu.com',
          title: this.itemInfo.itemName,
          description: this.itemInfo.itemName
        }
      }
    },
    data(){
      return {
        categoryName: '',
        itemInfo: {
          itemName: '',
          basePoint: '',
          firstPointTypeName: '',
          itemCode: '',
          logicalStock: 0,
          usableStock: 0,
          itemDesc: '',
          specInfo: '',
          itemCategory: {},
          isFavorite: 0,
          isGroup: 0,
        },
        itemInfoForm: {
          itemQuantity: 1,
          itemId: '',
        },
        belongGroupList: [],
        belongGroupItemId: '',
        selectBelongGroupItem: {},
        imageList: [],
        size: {
          show: 4,
          button: 'user-info',
          switchDiv: {
            width: '160',
            height: '40',
          },
          switchUl: {
            height: '40',
          },
          switchLi: {
            width: '40',
            height: '40',
          },
        },
        imgUrl: '',
        defaultTab: '',
        loading: false,
        defaultItemImage: require('../../assets/images/image-not-found.png'),
        wechatShareVisible: false
      }
    },
    methods: {
      getItemInfo(){
        this.loading = true;
        this.$store.dispatch('item_a_getItemInfo', {params: this.itemInfoForm.itemId}).then((response) => {
          this.loading = false;
          if (response.data.resultCode == 0) {
            this.itemInfo = _.assign(this.itemInfo, response.data.resultData.itemInfo);
//            console.log(response)
            if (this.itemInfo.isGroup === 1) {
              if (!!this.itemInfo.subItems && this.itemInfo.subItems.length > 0) {
                this.belongGroupList = this.itemInfo.subItems;
              }
            }
            this.imageList = response.data.resultData.imageList;
            for (var item in this.imageList) {
              this.imageList[item].itemImageUri = this.imageList[item].fileUri;
            }
          } else if (response.data.resultCode === '02') {
            this.$alert(response.data.resultMsg, '抱歉提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push({name: 'home'})
              }
            });
          } else if(response.data.resultCode === '01'){
            this.$alert(response.data.resultMsg, '抱歉提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push({name: 'home'})
              }
            });
          }
        }, () => {
          this.loading = false;
        })
      },
      getShowItemName(itemInfo){
        return itemInfo.showLabel !== '' && !!itemInfo.showLabel ? itemInfo.showLabel : itemInfo.itemName
      },
      getButtonType(item){
        return item.itemInfo.itemId === this.belongGroupItemId ? 'primary' : '';
      },
      selected(itemInfo){
        this.selectBelongGroupItem = {};
        this.selectBelongGroupItem = itemInfo;
        this.belongGroupItemId = itemInfo.itemId;
        this.imgUrl = !!itemInfo.itemImageUri ? this.fileServer + itemInfo.itemImageUri : this.defaultItemImage;
      },
      getImg(url){
        this.imgUrl = url;
      },
      collection(){
        let itemFavorite = '';
        if (this.itemInfo.isFavorite === 0) {
          itemFavorite = 'item_a_itemFavoriteAdd'
        } else if (this.itemInfo.isFavorite === 1) {
          itemFavorite = 'item_a_itemFavoriteRemove'
        }
        let params = [];
        params.push({itemId: this.itemInfoForm.itemId})
        this.$store.dispatch(itemFavorite, {params: params}).then((response) => {
          if (response.data.resultCode == 0) {
            if (itemFavorite == 'item_a_itemFavoriteAdd') {
              this.$message({type: 'success', message: '收藏成功!'});
            } else if (itemFavorite == 'item_a_itemFavoriteRemove') {
              this.$message({type: 'success', message: '取消收藏!'});
            }
            this.getItemInfo();
          }
        })

      },
      goToMyOrder(){
        let itemInfoForm = {}
        if (this.itemInfo.isGroup === 1) {
          if (this.belongGroupItemId === '') {
            this.$message.error('请选择一件礼品,再立即兑换');
            return;
          }
          itemInfoForm = {
            itemId: this.belongGroupItemId,
            itemQuantity: this.itemInfoForm.itemQuantity,
          }
        } else {
          itemInfoForm = this.itemInfoForm;
        }
        this.$store.dispatch('order_a_shoppingCartBuy', {params: itemInfoForm}).then((response) => {
          if (response.data.resultCode == 0) {
            this.$router.push({name: 'shopping-cart-single', params: {itemId: itemInfoForm.itemId}});
          }
        })
      },
      goToShoppingCart(){
        let itemInfoList = [];
        if (this.itemInfo.isGroup === 1) {
          if (this.belongGroupItemId === '') {
            this.$message.error('请选择一件礼品,再添加至购物车');
            return;
          }
          let itemInfoForm = {
            itemId: this.belongGroupItemId,
            itemQuantity: this.itemInfoForm.itemQuantity,
          };
          itemInfoList.push(itemInfoForm);
        } else {
          itemInfoList.push(this.itemInfoForm);
        }
        this.$store.dispatch('order_a_shoppingCartAdd', {params: itemInfoList}).then((response) => {
          if (response.data.resultCode == 0) {
//            this.$router.push({name: 'shopping-cart'});
            this.$store.commit('order_m_AddCartListData', itemInfoList)
            this.$message({type: 'success', message: '加入购物车成功!'});
          }

        })
      },
      doShare(target, shareData) {
        if (target === 'wechat') {
          this.showWechatQrcode(shareData)
        } else {
          shareUtils.share(target, shareData)
        }
      },
      showWechatQrcode(shareData){
        this.wechatShareVisible = true
      }
    },
    watch: {
      '$route' (to, from) {
        this.itemInfoForm.itemId = this.$route.params.itemId;
        this.defaultTab = 'desc';
        this.getItemInfo();
      }
    }
  }
</script>
<style>
</style>
