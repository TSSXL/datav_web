<template>
  <div class="app-container item">
    <h3>新建配置（没有模板）</h3>
    <el-form ref="form" label-width="120px" size="mini">
      <el-form-item label="应用名称">
        <el-input
          v-model="config.name"
          type="text" :rows="2"
          :autosize="false"
          name="name" data-vv-as="应用名称"
          v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z_0-9]*/}">
        </el-input>
        <error-tip :errs="errors" name="name"></error-tip>
      </el-form-item>
      <el-form-item label="管理员">
        <el-input
          v-model="config.admin"
          type="text" :rows="2"
          :autosize="false"
          name="admin" data-vv-as="管理员" v-validate="'required'">
        </el-input>
        <error-tip :errs="errors" name="admin"></error-tip>
      </el-form-item>
      <el-form-item label="配置文件名称">
        <el-input
          v-model="config.fileName"
          type="text" :rows="2"
          :autosize="false"
          name="fileName" data-vv-as="配置文件名称"
          v-validate="{ required: true, regex: /.+\.(conf|yml|properties)$/ }">
        </el-input>
        <error-tip :errs="errors" name="fileName"></error-tip>
      </el-form-item>
      <el-form-item label="配置">
        <el-button @click="editFile">编辑</el-button>
        <el-button @click="uploadFile">导入</el-button>
      </el-form-item>
      <el-form-item label="配置文件" v-if="isEdit">
        <el-input
          v-model="config.fileContent"
          type="textarea" :rows="2"
          :autosize="false"
          name="fileContent" data-vv-as="配置文件" v-validate="'required'">
        </el-input>
        <error-tip :errs="errors" name="fileContent"></error-tip>
      </el-form-item>
      <el-form-item label="配置文件" v-else>
        <el-upload
          :action="api"
          :before-upload="validateFileType"
          :multiple="false" :limit="1"
          :on-success="setFileContent">
          <el-button size="mini" type="text">选择要上传的文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传yml、conf、properties文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {addConfig, getFileContentApi} from '@/views/configuration/config/api'
  import errorTip from '@/components/Validate/errorTip'

  export default {
    components: { errorTip },
    data() {
      return {
        isEdit: true,
        config: {
          'name': null,
          'admin': null,
          'fileName': null,
          'fileContent': null
        }
      }
    },
    computed: {
      api() {
        return getFileContentApi()
      }
    },
    methods: {
      editFile() {
        this.isEdit = true
      },
      uploadFile() {
        this.isEdit = false
      },
      validateFileType(file) {
        if (file.type !== 'application/x-yaml' && !file.name.endsWith('.conf') &&
          !file.name.endsWith('.properties')) {
          return false
        }
      },
      setFileContent(res, file) {
        this.config.fileContent = res.data
        this.config.fileName = file.name
      },
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }
          if (result) {
            addConfig(this.config).then(response => {
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.$router.push('/configuration/config/list')
            })
            return
          }
        })
      },
      onCancel() {
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped>

</style>
