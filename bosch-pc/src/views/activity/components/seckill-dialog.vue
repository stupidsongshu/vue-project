<template>
  <div>
    <el-dialog title="秒杀礼品确认" :visible.sync="dialogVisible" class="dialog-size" :before-close="cancel">
      <el-row>
        <el-form :model="seckillForm" label-width="80px" ref="seckillForm" :rules="seckillFormRules"
                 class="el-form-margin-bottom-10">
          <el-form-item label="礼品名称">{{seckillForm.itemName}}</el-form-item>
          <el-form-item label="秒杀数量" prop="itemQuantity" required>
            <el-input-number v-model="seckillForm.itemQuantity" :min="1"
                             :max="seckillForm.buyQuantity"
                             size="small" class="number__decrease"></el-input-number>
            <span>&nbsp;&nbsp;( 最多可秒杀数量为 : {{seckillForm.buyQuantity}} )</span>
          </el-form-item>
          <el-form-item label="收货地址" prop="addressId">
            <el-radio-group v-model="seckillForm.addressId" class="addressRadio"
                            v-if="!!addressList&&addressList.length>0">
              <el-radio :label="item.addressId" v-for="item in addressList" :key="item.addressId"
                        class="block">
                {{(item.provinceName || '') + (item.cityName || '') + (item.countyName || '') + item.detailAddress}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.contactPerson}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.contactMobile}}<span
                v-if="item.isDefault===1" class="color-green margin-left-10">(默认地址)</span>
              </el-radio>
            </el-radio-group>
            <el-button type="primary" @click="$router.push({name:'user-address'})" v-else>管理地址</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click.native="cancel">取 消</el-button>
    <el-button type="primary" @click.native="confirm">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  export default{
    computed: {},
    data(){
      return {
        seckillFormRules: {
          addressId: [
            {required: true, message: '请选择收货地址', trigger: 'blur'},
          ],
        },
        seckillForm: {
          itemQuantity: '',
          activityId: '',
          itemId: '',
          addressId: '',
          buyQuantity: '',
          totalQuantity: '',
        },
        addressList: [],
        dialogVisible: false,
      }
    },
    methods: {
      showSeckillDialog(item){
        this.queryaddressData();
        this.seckillForm.itemName = item.itemName || '';
        this.seckillForm.activityId = item.activityId || '';
        this.seckillForm.itemId = item.itemId || '';
        this.seckillForm.buyQuantity = item.buyQuantity || 1;
        this.seckillForm.totalQuantity = item.totalQuantity || 1;
        this.dialogVisible = true;
      },
      cancel (){
        this.$refs['seckillForm'].resetFields();
        this.seckillForm = {
          itemQuantity: ' ',
          activityId: '',
          itemId: '',
          addressId: '',
          buyQuantity: 1,
          totalQuantity: '',
        };
        this.dialogVisible = false
      },
      confirm(){
        this.$refs.seckillForm.validate((valid) => {
            if (valid) {
              let params = {
                activityId: this.seckillForm.activityId,
                itemId: this.seckillForm.itemId,
                itemQuantity: this.seckillForm.itemQuantity,
                addressId: this.seckillForm.addressId,
              };
              this.$store.dispatch('activity_a_queryActivitySeckillSubmit', {params: params}).then((response) => {
                if (response.data.resultCode === '0') {
                  this.$message.success('秒杀成功,请前往订单列表查看');
                  let params = {
                    attended: true,
                    itemId: this.seckillForm.itemId
                  };
                  this.$emit('disable', params);
                } else if (response.data.resultCode === '01') {
                  if (!!response.data.resultData && !!response.data.resultData.attended && response.data.resultData.attended === '1') {
                    let params = {
                      attended: true,
                      itemId: this.seckillForm.itemId
                    };
                    this.$emit('disable', params);
                  }
                } else if (response.data.resultCode === '02') {
                  if (!!response.data.resultData && !!response.data.resultData.sellout && response.data.resultData.sellout === '1') {
                    let params = {
                      sellout: true,
                      itemId: this.seckillForm.itemId
                    };
                    this.$emit('disable', params);
                  }
                }
                this.$refs.seckillForm.resetFields();
                this.dialogVisible = false;
              })
            }
          }
        )
      },
      queryaddressData(){
        this.$store.dispatch('user_a_getClientAddressList').then((response) => {
          if (response.data.resultCode == 0) {
            this.addressList = response.data.resultData.addressList || [];
            if (this.addressList.length > 0) {
              for (let item in  this.addressList) {
                if (this.addressList[item].isDefault === 1) {
                  this.seckillForm.addressId = this.addressList[item].addressId;
                }
              }
              if (this.addressId === '') {
                this.seckillForm.addressId = this.addressList[0].addressId;
              }
            }
          }
        })
      },
    }
  }
</script>
<style>
</style>