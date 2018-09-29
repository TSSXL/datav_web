<template>
  <div class="app-container item">
    <h3>运行配置</h3>
    <el-form ref="form" label-width="120px" size="mini">
      <el-form-item label="运行环境类型">
        <el-select
          v-model="runtimeConfig.environmentType"
          :multiple="false"
          :clearable="false"
          :filterable="false"
          :allow-create="false"
          name="environmentType" data-vv-as="运行环境类型" v-validate="'required'"
          @change="changeEnvironmentType(runtimeConfig.environmentType)">
          <el-option
            v-for="environmentType in environmentTypes"
            :key="environmentType.id"
            :label="environmentType.name"
            :value="environmentType.id">
          </el-option>
        </el-select>
        <error-tip :errs="errors" name="environmentType"></error-tip>
      </el-form-item>
      <el-form-item label="模式" v-if="isContainer">
        <el-select
          v-model="runtimeConfig.containerEnvironmentMode"
          :multiple="false"
          :clearable="false"
          :filterable="false"
          :allow-create="false"
          name="containerEnvironmentMode" data-vv-as="模式" v-validate="'required'"
          @change="changeContainerEnvironmentMode(runtimeConfig.containerEnvironmentMode)">
          <el-option
            v-for="containerEnvironmentMode in containerEnvironmentModes"
            :key="containerEnvironmentMode.id"
            :label="containerEnvironmentMode.name"
            :value="containerEnvironmentMode.id">
          </el-option>
        </el-select>
        <error-tip :errs="errors" name="containerEnvironmentMode"></error-tip>
      </el-form-item>
      <div v-if="!isContainer || isProxy">
        <el-form-item label="发布设置">
          <el-input
            v-model="runtimeConfig.publishConfig"
            type="textarea" :rows="2"
            :autosize="false"
            name="publishConfig" data-vv-as="发布设置" v-validate="'required'">
          </el-input>
          <error-tip :errs="errors" name="publishConfig"></error-tip>
        </el-form-item>
      </div>
      <div v-if="isContainer">
        <el-form-item label="运行时设置">
          <el-button @click="editFile">编辑</el-button>
          <el-button @click="uploadFile">导入</el-button>
        </el-form-item>
        <el-form-item label="运行时设置文件" v-if="isEdit">
          <el-input
            v-model="runtimeConfig.runtimeConfig"
            type="textarea" :rows="2"
            :autosize="false"
            name="runtimeConfig" data-vv-as="运行时设置文件" v-validate="'required'">
          </el-input>
          <error-tip :errs="errors" name="runtimeConfig"></error-tip>
        </el-form-item>
        <el-form-item label="运行时设置文件" v-else>
          <el-upload
            :action="api"
            :before-upload="validateFileType"
            :multiple="false" :limit="1"
            :on-success="setFileContent">
            <el-button size="mini" type="text">选择要上传的文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传yaml文件</div>
          </el-upload>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    addRuntimeConfig,
    getFileContentApi,
    getRuntimeConfig,
    updateRuntimeConfig
  } from '@/views/configuration/config/api'
  import errorTip from '@/components/Validate/errorTip'

  export default {
    components: { errorTip },
    data() {
      return {
        runtimeConfig: {
          'id': '',
          'publishConfig': '',
          'runtimeConfig': '',
          'environmentType': '',
          'containerEnvironmentMode': '',
          'config': {
            'id': this.$route.query.configId
          },
          'configTemplate': {
            'id': this.$route.query.configTemplateId
          }
        },
        environmentTypes: [
          {
            'id': 'container',
            'name': '容器'
          }, {
            'id': 'host',
            'name': '主机'
          }],
        containerEnvironmentModes: [
          {
            'id': 'proxy',
            'name': '代理'
          }, {
            'id': 'normal',
            'name': '非代理'
          }],
        isContainer: false,
        isProxy: false,
        isEdit: true,
        isNew: true
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
        if (file.type !== 'application/x-yaml') {
          return false
        }
      },
      setFileContent(res, file) {
        this.runtimeConfig.runtimeConfig = res.data
      },
      changeEnvironmentType(environmentType) {
        this.isContainer = environmentType == 'container'
        if (this.isContainer) {
          getRuntimeConfig(this.runtimeConfig.config.id, this.runtimeConfig.configTemplate.id,
            this.runtimeConfig.environmentType, this.runtimeConfig.containerEnvironmentMode).then(
            response => {
              this.setCurrent(response.data)
            }
          )
        } else {
          getRuntimeConfig(this.runtimeConfig.config.id, this.runtimeConfig.configTemplate.id,
            this.runtimeConfig.environmentType).then(
            response => {
              this.setCurrent(response.data)
            }
          )
        }
      },
      changeContainerEnvironmentMode(containerEnvironmentMode) {
        this.isProxy = containerEnvironmentMode == 'proxy'
        getRuntimeConfig(this.runtimeConfig.config.id, this.runtimeConfig.configTemplate.id,
          this.runtimeConfig.environmentType, containerEnvironmentMode).then(
          response => {
            this.setCurrent(response.data)
          }
        )
      },
      setCurrent(all) {
        if (all) {
          let currentRuntimeConfig = []
          if (this.runtimeConfig.config.id) {
            currentRuntimeConfig = all.filter(v => v.config.id == this.runtimeConfig.config.id)
          } else if (this.runtimeConfig.configTemplate.id) {
            currentRuntimeConfig = all.filter(
              v => v.configTemplate.id == this.runtimeConfig.configTemplate.id)
          }
          if (currentRuntimeConfig.length > 0) {
            this.isNew = false
            this.runtimeConfig.id = currentRuntimeConfig[0].id
            this.runtimeConfig.publishConfig = currentRuntimeConfig[0].publishConfig
            this.runtimeConfig.runtimeConfig = currentRuntimeConfig[0].runtimeConfig
          }
        }
      },
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }
          if (result) {
            if (this.isNew) {
              addRuntimeConfig(this.runtimeConfig).then(
                response => {
                  this.$notify({
                    title: '成功',
                    message: '创建成功',
                    type: 'success',
                    duration: 2000
                  })
                  this.$router.go(-1)
                })
            } else {
              updateRuntimeConfig(this.runtimeConfig).then(
                response => {
                  this.$notify({
                    title: '成功',
                    message: '更新成功',
                    type: 'success',
                    duration: 2000
                  })
                  this.$router.go(-1)
                })
            }
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
