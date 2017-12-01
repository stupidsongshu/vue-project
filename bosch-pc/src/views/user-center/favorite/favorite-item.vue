<template>
  <div>
    <el-breadcrumb separator="/" class="big-title">
      <el-breadcrumb-item>收藏夹</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="padding-top-20 table-style-none" v-loading="loading">
      <el-table :data="favoriteList" class="width--100" ref="favoriteList" @selection-change="getSelectList"
                :row-style="getTableDisable">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="礼品" width="250">
          <template scope="scope">
            <el-row class="padding-top-10 padding-bottom-10 table-column">
              <el-col :span="6">
                <div class="padding-top-10">
                  <img :src="getImageUrl(scope.row.itemImageUri)" style="width:50px;height:50px;"/>
                </div>
              </el-col>
              <el-col :span="18">
                <el-form label-width="30px" class="table-form constraint-length" style="margin-top:5px;">
                  <div class="font-weight pointer" @click="goToItemInfo(scope.row)"> {{scope.row.itemName}}</div>
                  <el-form-item label="编码:" class="margin-bottom-0">{{scope.row.itemCode}}</el-form-item>
                  <el-form-item label="库存:" class="margin-bottom-0">
                    <div v-if="scope.row.publishStatus===0||scope.row.activeStatus===0">
                      {{scope.row.usableStock}}<span class="color-green">(礼品已下架)</span>
                    </div>
                    <div v-if="scope.row.publishStatus===1&&scope.row.activeStatus===1">
                      {{!!scope.row.logicalStock && scope.row.logicalStock > 0 ? scope.row.logicalStock : scope.row.usableStock}}
                      <span class="color-green"
                            v-if="(!!scope.row.logicalStock&&scope.row.logicalStock>0?scope.row.logicalStock:scope.row.usableStock)===0&&scope.row.isPreOrder === 0">(库存为0,无法兑换)</span>
                      <span class="color-green"
                            v-if="(!!scope.row.logicalStock&&scope.row.logicalStock>0?scope.row.logicalStock:scope.row.usableStock)===0&&scope.row.isPreOrder === 1">(预定商品,可兑换)</span>
                    </div>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="积分" width="120">
          <template scope="scope">
            {{scope.row.exchangePoint}}
          </template>
        </el-table-column>
        <el-table-column label="类型" width="120">
          <template scope="scope">
            {{scope.row.pointTypeName}}
            <span v-if="scope.row.isSpecial===1">(特殊)</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="text" @click="showAdd(scope.row)" class="button-border"
                       style="padding:8px 2px">加入购物车
            </el-button>
            <el-button size="small" type="text" @click="showDelete(scope.row)" class="button-border"
                       style="padding:8px 2px">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-col class="clearfix margin-top-20">
        <div class="v-left">
          <div>
            <el-button @click="selectAll(favoriteList)">全选</el-button>
            <el-button @click="showAdd()">选中礼品加入购物车</el-button>
            <el-button @click="showDelete()">删除选中礼品</el-button>
            <span class="padding-left-10">已选择{{selectList.length}}件礼品</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    mounted() {
      this.getFavoriteList();
    },
    components: {},
    computed: {
      ...mapGetters({
        userInfo: 'user_g_getUserInfo',
        fileServer: 'config_g_fileServer'
      }),
    },
    data(){
      return {
        favoriteList: [],
        defaultItemImage: require('../../../assets/images/image-not-found.png'),
        selectList: [],
        tableDisable: {
          backgroundColor: '#f1f1f1'
        },
        loading: false,
      }
    },
    methods: {
      getFavoriteList(){
        this.loading = true;
        this.$store.dispatch('order_a_favoriteList').then((response) => {
          if (response.data.resultCode == 0) {
            this.favoriteList = response.data.resultData.favoriteList;
            this.$nextTick(function () {
              for (let item in this.favoriteList) {
                if (this.favoriteList[item].selected === 1) {
                  this.$refs.favoriteList.toggleRowSelection(this.favoriteList[item], true);
                }
              }
            })
//            console.log(this.favoriteList)
            this.loading = false;
          } else {
            this.loading = false;
          }
        }, () => {
          this.loading = false;
        })
      },
      getImageUrl (imageUri){
        return !!imageUri ? this.fileServer + imageUri : this.defaultItemImage
      },
      showDelete(item){
        this.$confirm('是否删除所选择的礼品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.itemDelete(item);
        }).catch(() => {
          console.log('close')
        });
      },
      itemDelete(item){
        if (!!item) {
          var params = [];
          params.push({itemId: item.itemId});
        } else {
          if (this.selectList != '') {
            var params = [];
            for (let item in this.selectList) {
              params.push({itemId: this.selectList[item].itemId});
            }
          } else {
            this.$message.error('请先选择要删除的礼品');
            return;
          }
        }
        this.$store.dispatch('order_a_favoriteRemove', {params: params}).then((response) => {
          if (response.data.resultCode == 0) {
            this.getFavoriteList();
          }
        }, () => {
          this.$message.error('报错')
        })
      },
      showAdd(item){
        this.$confirm('是否将选中的礼品添加入购物车?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.itemAdd(item);
        }).catch(() => {
          console.log('close')
        });
      },
      itemAdd(item){
        if (!!item) {
          var params = [];
          if (item.publishStatus === 0 || item.activeStatus === 0) {
            this.$message.error("该礼品已下架或被删除,无法加入购物车");
            return;
          } else if (item.isGroup === 1) {
            this.$message.error("存在礼品组,无法加入购物车");
            return;
          } else {
            params.push({itemId: item.itemId, itemQuantity: '1'});
          }
        } else {
          if (this.selectList != '') {
            var params = [];
            for (let item in this.selectList) {
              params.push({itemId: this.selectList[item].itemId, itemQuantity: '1'});
            }
          } else {
            this.$message.error('请先选择要添加的礼品');
            return;
          }
        }
        for (let item in this.selectList) {
          if (this.selectList[item].publishStatus === 0 || this.selectList[item].activeStatus === 0) {
            this.$message.error("存在已下架或被删除的礼品,无法加入购物车");
            return;
          }
          if (this.selectList[item].usableStock === 0) {
            if (!!this.selectList[item].isPreOrder && this.selectList[item].isPreOrder === 0) {
              this.$message.error("存在数量为0的礼品,且该商品不可预订,无法加入购物车");
              return;
            }
          }
          if (this.selectList[item].isGroup === 1) {
            this.$message.error("存在礼品组,无法加入购物车");
            return;
          }
        }
        this.$store.dispatch('order_a_shoppingCartAdd', {params: params}).then((response) => {
          if (response.data.resultCode == 0) {
            this.$store.commit('order_m_AddCartListData', params)
            this.$message.success("选中的礼品,已添加至购物车,请去购物车查看");
          }
        })
      },
      getSelectList(val){
        this.selectList = val;
        for (let item in this.selectList) {
          this.selectList[item].selected = 1;
        }
      },
      selectAll(row){
        if (!!row) {
          if (this.selectList.length == row.length) {
            this.$refs.favoriteList.clearSelection();
          } else {
            this.$refs.favoriteList.clearSelection();
            row.forEach(row => {
              this.$refs.favoriteList.toggleRowSelection(row);
            });
          }
        } else {
          this.$message.error("购物车还没有添加礼品噢~");
        }
      },
      getTableDisable(row){
        if (row.publishStatus === 0 || row.activeStatus === 0) {
          return this.tableDisable;
        } else {
          return;
        }
      },
      goToItemInfo(item){
        this.setRecentlyViewed(item);
        this.$router.push({name: 'item-info', params: {itemId: item.itemId}});
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
    }
  }
</script>
<style>
</style>