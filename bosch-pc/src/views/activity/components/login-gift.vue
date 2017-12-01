<template>
  <div class="margin-top-10">
      <el-form label-width="70px">
        <el-form-item label="活动名称 : " class="margin-bottom-0">{{activityInfo.activityName}}</el-form-item>
        <el-form-item label="活动时间 : " class="margin-bottom-0">
          {{activityInfo.startDate|getDate}} ~{{activityInfo.endDate|getDate}}
        </el-form-item>
        <el-form-item label="活动内容 : " class="margin-bottom-0">
          <div class="ql-editor-style" style="margin-top:4px;">
            <div v-html="activityInfo.activityDesc" style="max-width:100%;line-height:25px;"
                 class="ql-editor">
            </div>
          </div>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        activityInfo: {},
      }
    },
    methods: {
      init(activityInfo){
        this.activityInfo = activityInfo;
      }
    }
  }
</script>
<style>
</style>