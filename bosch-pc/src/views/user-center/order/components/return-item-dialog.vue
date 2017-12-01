<template>
  <div class="text-align-center">
    <el-dialog title="取消订购" :visible.sync="dialogVisible">
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
              <el-select v-model="returnData.returnReason" placeholder="请选择" @change="changeReturnReason">
                <el-option v-for="item in orderDetailReturnReasonMap" :key="item.key" :label="item.value"
                           :value="item.key" class="width--100"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="其它原因" class="margin-bottom-0 margin-top-10" v-if="returnData.returnReason==='99'">
              <el-input v-model="returnData.returnDesc" placeholder="请输入其它原因"></el-input>
            </el-form-item>
          </el-form>
          <el-form label-width="70px">
            <el-form-item label="退还积分" class="margin-bottom-0">
              <div v-for="item in itemInfo.detailPoint" :key="item.pointType">
                {{item.pointTypeName}}:{{item.pointValue}}<span v-if="item.isSpecial===1">(特殊)</span></div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" class="margin-right-10">不取消</el-button>
    <el-button type="primary" @click="returnItem()">确认取消</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  export default{
    mounted() {
      this.$store.dispatch('dict_a_queryDictByName', 'orderDetailReturnReasonMap')
    },
    computed: {
      ...mapGetters({
        fileServer: 'config_g_fileServer'
      }),
      ...mapState({
        orderDetailReturnReasonMap: state => state.dict.orderDetailReturnReasonMap,
      }),
    },
    data(){
      return {
        dialogVisible: false,
        itemInfo: {},
        defaultItemImage: require('../../../../assets/images/image-not-found.png'),
        returnData: {
          orderDetailId: '',
          orderId: '',
          itemId: '',
          returnReason: '',
          returnDesc: '',
        },
      }
    },
    methods: {
      getImageUrl (imageUri){
        return !!imageUri ? this.fileServer + imageUri : this.defaultItemImage
      },
      showDialog(row){
        this.itemInfo = row;
        this.returnData.orderId = row.orderId;
        this.returnData.itemId = row.itemId;
        this.returnData.orderDetailId = row.orderDetailId;
        this.dialogVisible = true;
      },
      returnItem(){
        this.$store.dispatch('order_a_orderItemReturn', {params: this.returnData}).then((response) => {
          if (response.data.resultCode == 0) {
            this.$message.success({message: '取消订购成功', showClose: true})
            this.dialogVisible = false;
            this.$emit('refresh', true);
          }
        })
      },
      changeReturnReason(){
        this.returnData.returnDesc = '';
      },
    }
  }
</script>
<style>
</style>