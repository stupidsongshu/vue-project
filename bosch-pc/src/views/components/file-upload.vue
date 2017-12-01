<template>
  <div id="">
    <el-upload
      :action="fileUploadTarget"
      :headers="uploadHeaders"
      name="file"
      :data="uploadParam"
      :list-type="showType"
      :on-preview="handleFilePreview"
      :on-remove="handleFileRemove"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadFailed"
      :before-upload="checkBeforeUpload"
      :show-file-list="showFileList"
      :file-list="fileList"
      ref="fileUploadControl">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip" v-if="!!tips">{{tips}}</div>
    </el-upload>
  </div>
</template>

<script>
  import {mapGetters, mapState} from 'vuex'
  import {tokenUtils} from '../../utils'
  export default {
    components: {},
    mounted() {
    },
    activated() {
      this.fileList = []
    },
    props: {
      showFileList: {
        type: Boolean,
        default: true,
      },
      //options: text, picture, picture-card
      showType: {
        type: String,
        default: 'text'
      },
      uploadParam: {
        type: Object,
        default: function () {
          return {}
        }
      },
      tips: {
        type: String,
        default: ''
      },
      limit: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        fileList: []
      }
    },
    computed: {
      ...mapGetters({
        fileUploadTarget: 'config_g_fileUploadTarget',
        fileServer: 'config_g_fileServer',
      }),
      uploadHeaders () {
        return {
          Authorization: 'Bearer ' + tokenUtils.getToken(true)
        }
      },
    },
    watch: {
      fileList (val){
        this.$emit('input', val)
      },
    },
    methods: {
      clearFileList(){
        this.fileList = []
      },
      handleFilePreview(file){
        window.open(this.fileServer + file.response.resultData.fileDTO.fileUri)
      },
      handleFileRemove(file, fileList) {
        if (file && file.response) {
          this.$store.dispatch('file_a_deleteById', {fileId: file.response.resultData.fileDTO.fileId})
            .then((response) => {
              if (response.data.resultCode === '0') {
                this.fileList.pop()
                this.$emit('removed', file.response.resultData.fileDTO)
              }
            }, () => {
            })
        }
      },
      handleUploadSuccess(response, file) {
        if (response.resultCode === '0') {
          this.fileList.push(file)
          this.$emit('uploaded', file.response.resultData.fileDTO)
        } else {
          this.$message.error({message: response.resultMsg, showClose: true})
        }
      },
      handleUploadFailed() {
        this.$message.error({message: '服务器异常，上传失败！', showClose: true})
      },
      checkBeforeUpload () {
        if (this.fileList.length >= this.limit) {
          this.$alert('不能上传超过' + this.limit + '个文件', '提示')
          return false
        }
      }
    }
  }
</script>
