<template>
  <div class="app-container">
    {{router}}
    <el-form ref="form" label-width="120px" size="mini">
      <el-form-item label="上传">
        <el-upload
          :action="api + router"
          ref="uploadfile"
          :multiple="false" :limit="1"
          :auto-upload="false"
          :before-upload="newFiles"
          :on-remove="handleRemove">
          <el-button size="mini" type="text">选择要上传的文件</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="目录" v-if="!this.id">
        <el-select v-model="attachment.category" placeholder="请选择">
          <el-option v-for="item in directories" :label="item.name" :value="item.directory" :key="item.directory"></el-option>
        </el-select>
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
  import { get, post, getApi } from "@/views/dev/attachment/api"
  import errorTip from "@/components/Validate/errorTip";
  import { message } from '@/utils'

  export default {
    components: { errorTip },
    props: {
      id: { type: String }
    },
    data() {
      return {
        attachment: {
          category: 'documents'
        },
        uploadForm: new FormData(),
        router: 'api/attachment',
        directories: []
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
        console.log(file, fileList);
      },
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }

          if (result) {
            this.uploadForm.append('desc', this.attachment.desc)
            this.uploadForm.append('category', this.attachment.category)
            var action = this.router

            post(action, this.uploadForm).then(res => {
              message(res)
              this.$router.go(-1)
            })

            this.$refs.uploadfile.submit()
            return
          }
        })
      },
      onCancel() {
        this.$router.go(-1)
      },
      fetchDirectories() {
        var query = `api/category?isPaging=false`
        get(query).then(response => {
          this.directories = response.data.list
          console.log(this.directories)
        })
      }
    },
    created() {
      if( this.id ) {
        this.router = 'api/attachment/upversion/' + this.id
      }
      this.fetchDirectories()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
