<template>
  <div v-loading="loading">
    <el-row style="padding:10px 10px;border:1px solid #d4d4d4;border-radius:3px;margin-top:8px;">
      <el-col :span="24">
        <el-form ref="queryParam" :model="queryParam" label-width="70px" :rules="queryParamRulse" :inline="true">
          <el-form-item label="礼品关键字" class="margin-bottom-10" prop="keyword">
            <el-autocomplete class="width-400" v-model="queryParam.keyword" :fetch-suggestions="querySearch"
                             placeholder="请输入礼品关键字"
                             :trigger-on-focus="false"></el-autocomplete>
            <el-button type="primary" @click="queryItemList(1)">搜索</el-button>
            <el-button type="primary" @click="resetForm()">重置</el-button>
          </el-form-item>
          <el-row>
            <el-col class="padding-left-60 constraint-length">
              <el-form-item label="热门搜索:" class="margin-bottom-0 search-keyword" v-if="keywordList.length>0">
                <ul>
                  <li v-for="item in keywordList" class="hover pointer inline-block margin-right-10"
                      @click="goToItemSearch(item.wordLabel)">
                    {{item.wordLabel}}
                  </li>
                </ul>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="积分范围" class="margin-bottom-10">
            <el-form-item prop="pointFrom">
              <el-input v-model="queryParam.pointFrom" class="width-100" placeholder="最小值"></el-input>
            </el-form-item>
            <span class="point-to">至</span>
            <el-form-item prop="pointTo">
              <el-input v-model="queryParam.pointTo" class="width-100" placeholder="最大值"></el-input>
            </el-form-item>
            <el-button type="primary" @click="queryItemList(1)">确认</el-button>
            <el-button type="primary" @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <ul class="item-list">
          <li v-for="item in itemList" :key="item.itemId"
              class="inline-block item-list-li pointer relative margin-bottom-10"
              @click="goToItemInfo(item)">
            <div class="text-align-center">
              <div class="item-list-li-img img-mid">
                <img :src="getImageUrl(item.itemImageUri)" class="width-100 height-100"/>
              </div>
              <span class="block color-green constraint-length" style="line-height:30px;">{{item.itemName}}</span>
              <div v-if="item.isPromotion===0||!item.isPromotion" class="constraint-length">积分:{{item.exchangePoint}}</div>
              <div v-if="item.isPromotion===1" class="constraint-length">
                <span class="padding-right-10">积分:{{item.promotionPoint}}</span>
                <span class="color-green line-through">{{item.exchangePoint}}</span>
              </div>
            </div>
            <img src="../../../assets/images/cu.png" class="absolute"
                 style="right:10px;top:10px;width:30px;height:30px;"
                 v-if="item.isPromotion===1"/>
          </li>
        </ul>
        <div class="text-align-center" style="padding:20px 20px" v-if="itemList.length<=0">
          暂无礼品
        </div>
        <div class="text-align-center margin-top-10 margin-bottom-10" v-if="itemList.length>0">
          <el-pagination layout="prev, pager, next"
                         :currentPage="page"
                         :total="total"
                         :page-size="15"
                         @current-change="queryItemList"></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import _ from 'lodash'
  import validators from '../../../common/validators.js'
  import {localStorageUtils} from '../../../utils'
  import {mapState, mapGetters} from 'vuex'
  export default{
    props: {
      ids: Object,
    },
    mounted() {
      this.queryParam = {
        keyword: '',
        pointFrom: '',
        pointTo: ''
      };
      this.$nextTick(function () {
        if (!!this.ids.keyword) {
          this.queryParam.keyword = this.ids.keyword;
        }
        this.queryItemList(1);
        this.getItemKeywordList();
      });

    },
    computed: {
      ...mapGetters({
        fileServer: 'config_g_fileServer',
        apiServer:'config_g_apiServer'
      }),
    },
    data(){
      return {
        queryParamRulse: {
          pointFrom: [
            {validator: validators.checkInteger, trigger: 'blur'}
          ],
          pointTo: [
            {validator: validators.checkInteger, trigger: 'blur'}
          ],
        },
        itemList: [],
        keywordList: [],
        page: 1,
        total: null,
        queryParam: {
          keyword: '',
          pointFrom: '',
          pointTo: ''
        },
        defaultItemImage: require('../../../assets/images/image-not-found.png'),
        associateList: [],
        loading: false,
      }
    },
    methods: {
      queryItemList(page){
        if (page < 1) {
          return;
        }
        this.page = page;
        let params = _.assign(this.queryParam, {
          page: this.page,
          pageSize: '15',
          categoryId: this.ids.categoryId,
          tagId: this.ids.tagId,
        });
        this.loading = true;
        this.$refs.queryParam.validate((valid) => {
          if (valid) {
            this.$store.dispatch('item_a_queryItemList', {params: params}).then((response) => {
              if (response.data.resultCode == 0) {
                this.itemList = response.data.resultData.itemList;
                this.total = response.data.resultData.pageInfo.totalCounts;
//                console.log(this.itemList)
                this.loading = false;
              } else {
                this.loading = false;
              }
            }, () => {
              this.loading = false;
            })
          } else {
            this.loading = false;
            return false;
          }
        })
      },
      getImageUrl (imageUri){
        return !!imageUri ? this.fileServer + imageUri : this.defaultItemImage
      },
      querySearch(queryString, cb) {
        this.getItemKeywordAssociateList(queryString);
//        // 调用 callback 返回建议列表的数据
        cb(this.associateList);
      },
      getItemKeywordList(){
        this.$store.dispatch('item_a_getItemKeywordList').then((response) => {
          if (response.data.resultCode == 0) {
            this.keywordList = response.data.resultData.keywordList;
          }
        })
      },
      getItemKeywordAssociateList(querystring){
        this.associateList = [];
        this.$store.dispatch('item_a_getItemKeywordAssociateList', {params: {label: querystring}}).then((response) => {
          if (response.data.resultCode == 0) {
            for (let item in response.data.resultData.keywordList) {
              this.associateList.push({value: response.data.resultData.keywordList[item].wordLabel})
            }
          }
        })
      },
      resetForm(){
        this.$refs.queryParam.resetFields();
        this.queryItemList(1);
      },
      goToItemSearch(wordLabel){
        this.$router.push({name: 'item-search-all-list', query: {keyword: wordLabel}});
      },
      goToItemInfo(item){
        this.setRecentlyViewed(item);
        window.open('/item/item-info/'+item.itemId)
//        this.$router.push({name: 'item-info', params: {itemId: item.itemId}});
      },
      setRecentlyViewed(item){
        var params = {
          itemName: item.itemName,
          exchangePoint: item.exchangePoint,
          itemImageUri: item.itemImageUri,
          itemId: item.itemId,
        };
        this.$store.dispatch('user_a_updateRecentlyViewed', {params: params})
      },
    },
    watch: {
      '$route' (to, from) {
        this.queryParam = {
          keyword: '',
          pointFrom: '',
          pointTo: ''
        };
        this.$nextTick(function () {
          if (!!this.ids.keyword) {
            this.queryParam.keyword = this.ids.keyword;
          }
          this.queryItemList(1);
          this.getItemKeywordList();
        });
//        console.log(this.queryParam.keyword)

      }
    }

  }
</script>
<style>
</style>