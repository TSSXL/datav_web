<template>
  <div class="app-container">
    <h2>批量上传文件</h2>
    <el-form ref="form" label-width="120px"  size="mini">
      <el-form-item label="上传">
        <el-upload
          :action="api + 'api/attachments'"
          ref="uploadfile"
          :multiple="true" :limit="limit"
          :auto-upload="false"
          :before-upload="newFiles"
          :on-remove="handleRemove">
          <el-button size="small" type="text">选择要上传的文件</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="目录">
        <el-input
          v-model="attachment.category"
          type="textarea" :rows="2"
          :autosize="true">
        </el-input>
        <error-tip :errs="errors" name="category"></error-tip>
      </el-form-item>

      <el-form-item label="描述">
        <el-input
          v-model="attachment.desc"
          type="textarea" :rows="2"
          :autosize="true">
        </el-input>
        <error-tip :errs="errors" name="desc"></error-tip>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">上传</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {post, getApi} from "@/views/dev/attachment/api"
  import errorTip from "@/components/Validate/errorTip";
  import { message } from '@/utils'

  export default {
    components: {errorTip},
    data() {
      return {
        id: this.$route.params.id,
        attachment: { category: 'documents' },
        limit: 10,
        uploadForm: new FormData()
      }
    },
    computed: {
      api() {
        return getApi()
      }
    },
    methods: {
      newFiles(file) {
        this.uploadForm.append('file[]', file)
        return false
      },
      handleRemove(file, fileList) {
        //console.log(file, fileList);
      },
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }

          if (result) {
            this.uploadForm.append('category', this.attachment.category)
            this.uploadForm.append('desc', this.attachment.desc)

            post('api/attachments', this.uploadForm).then(res => {
              message(res)
            })
            this.$refs.uploadfile.submit()
            return
          }
        })
      },
      onCancel() {
        this.$router.go(-1)
      }
    },
    created() {
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
