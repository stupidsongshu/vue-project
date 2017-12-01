<template>
  <div class="text-align-center">
    <el-dialog title="取消详情" :visible.sync="dialogVisible">
      <el-row>
        <el-col :span="11">
          <img :src="getImageUrl(itemInfo.itemImageUri)" style="width:200px;height:200px"/>
        </el-col>
        <el-col :span="13" class="text-align-left">
          <el-form :model="itemInfo" label-width="70px">
            <el-form-item label="礼品名称" class="margin-bottom-0">{{itemInfo.itemName}}</el-form-item>
            <el-form-item label="兑换积分" class="margin-bottom-0">{{itemInfo.pointValue}}</el-form-item>
            <el-form-item label="积分类型" class="margin-bottom-0">{{itemInfo.pointTypeName}}
              <span v-if="itemInfo.isSpecial===1">(特殊积分)</span>
            </el-form-item>
            <el-form-item label="礼品编码" class="margin-bottom-0">{{itemInfo.itemCode}}</el-form-item>
            <el-form-item label="兑换数量" class="margin-bottom-0">{{itemInfo.itemQuantity}}</el-form-item>
            <el-form-item label="卡券使用" class="margin-bottom-0">未使用</el-form-item>
            <el-form-item label="取消原因" class="margin-bottom-0">
              <span v-if="itemInfo.returnReason==='99'">
                {{itemInfo.returnDesc}}
              </span>
              <span v-else>{{itemInfo.returnReasonName}}</span>
            </el-form-item>
          </el-form>
          <el-form label-width="70px">
            <el-form-item label="退还积分" class="margin-bottom-0">
              <div v-for="item in itemInfo.detailPoint" :key="item.pointType">
                {{item.pointTypeName}}:{{item.pointValue}}<span v-if="item.isSpecial===1">(特殊)</span></div>
            </el-form-item>
            <el-form-item label="取消时间" class="margin-bottom-0">
              {{itemInfo.returnDate | getDateTime}}
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  export default{
    computed: {
      ...mapGetters({
        fileServer: 'config_g_fileServer'
      }),
    },
    data(){
      return {
        dialogVisible: false,
        itemInfo: {},
        defaultItemImage: require('../../../../assets/images/image-not-found.png'),
      }
    },
    methods: {
      getImageUrl (imageUri){
        return !!imageUri ? this.fileServer + imageUri : this.defaultItemImage
      },
      showDialog(row){
        this.itemInfo = row;
        this.dialogVisible = true;
      },
    }
  }
</script>
<style>
</style>