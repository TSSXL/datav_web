<template>
  <div class="app-container">
    <h2>上传文件</h2>
    <el-form ref="form" label-width="120px" size="mini">
      <el-form-item label="上传">
        <el-input v-model="url" type="text">
          <template slot="prepend">Http://</template>
        </el-input>
      </el-form-item>

      <el-form-item label="目录">
        <el-input
          v-model="category"
          type="textarea" :rows="2"
          :autosize="true">
        </el-input>
        <error-tip :errs="errors" name="category"></error-tip>
      </el-form-item>

      <el-form-item label="描述">
        <el-input
          v-model="desc"
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
  import {message} from '@/utils'

  export default {
    components: {errorTip},
    data() {
      return {
        id: this.$route.params.id,
        url: '',
        desc: '',
        category: 'documents'
      }
    },
    computed: {
      api() {
        return getApi()
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }

          if (result) {
            post('api/attachment/url', {
              remoteurl: this.url,
              desc: this.desc,
              category: this.category
            }).then(res => {
              message(res)
              this.$router.go(-1)
            })
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
