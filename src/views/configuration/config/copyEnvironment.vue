<template>
  <div class="app-container item">
    <h3>新建配置（复制）</h3>
    <h3 v-show="isShow">从{{environmentConfigCopy.environment.name}}复制</h3>
    <el-form ref="form" label-width="120px" size="mini">
      <el-form-item label="运行环境">
        <el-select
          v-model="environmentConfig.environment.id"
          :multiple="false"
          :clearable="false"
          :filterable="false"
          :allow-create="false"
          name="environment" data-vv-as="运行环境" v-validate="'required'"
          @change="changeEnvironmentType(environmentConfig.environment.id)">
          <el-option
            v-for="environment in environments"
            :key="environment.id"
            :label="environment.name"
            :value="environment.id">
          </el-option>
        </el-select>
        <error-tip :errs="errors" name="environment"></error-tip>
      </el-form-item>
      <div v-if="!isContainer || isProxy">
        <el-form-item label="发布设置">
          <el-input
            v-model="environmentConfig.publishConfig"
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
            v-model="environmentConfig.runtimeConfig"
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
        <el-button type="primary" @click="onSubmit">新建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getContainer, getList } from '@/views/configuration/environment/api'
  import {
    copyEnvironmentConfig,
    getConfig,
    getEnvironmentConfig,
    getFileContentApi,
    getRuntimeConfig
  } from '@/views/configuration/config/api'
  import errorTip from '@/components/Validate/errorTip'

  export default {
    components: { errorTip },
    data() {
      return {
        configId: this.$route.params.configId,
        environmentConfigId: this.$route.params.environmentConfigId,
        configTemplateId: '',
        environmentConfig: {
          'environment': {
            'id': ''
          },
          'publishConfig': '',
          'runtimeConfig': '',
          'config': {}
        },
        environmentConfigCopy: {
          'environment': {}
        },
        environments: [],
        isContainer: true,
        isProxy: false,
        isEdit: true,
        isShow: false
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
        this.environmentConfig.runtimeConfig = res.data
      },
      changeEnvironmentType(environmentId) {
        if (this.isContainer) {
          getContainer(environmentId).then(response => {
            this.isProxy = response.data.mode == "proxy"
            getRuntimeConfig(this.configId, this.configTemplateId, 'container',
              response.data.mode).then(
              response => {
                this.setCurrent(response.data)
              }
            )
          })
        } else {
          getRuntimeConfig(this.configId, this.configTemplateId, 'host').then(
            response => {
              this.setCurrent(response.data)
            }
          )
        }
      },
      setCurrent(all) {
        if (all) {
          let currentRuntimeConfig = []
          currentRuntimeConfig = all.filter(v => v.config.id == this.configId)
          if (currentRuntimeConfig.length == 0 && this.configTemplateId) {
            currentRuntimeConfig = all.filter(
              v => v.configTemplate.id == this.configTemplateId)
          }
          if (currentRuntimeConfig.length > 0) {
            this.environmentConfig.publishConfig = currentRuntimeConfig[0].publishConfig
            this.environmentConfig.runtimeConfig = currentRuntimeConfig[0].runtimeConfig
          }
        }
      },
      fetchData() {
        getEnvironmentConfig(this.environmentConfigId).then(response => {
          this.environmentConfigCopy = response.data
          const environment = this.environmentConfigCopy.environment
          if (environment.type == 'container') {
            this.isContainer = true
            getContainer(environment.id).then(response => {
              this.isProxy = response.data.mode == "proxy"
            })
          } else if (environment.type == 'host') {
            this.isContainer = false
          }
          this.environmentConfig.publishConfig = this.environmentConfigCopy.publishConfig
          this.environmentConfig.runtimeConfig = this.environmentConfigCopy.runtimeConfig
          this.isShow = true
          getConfig(this.configId).then(response => {
            const config = response.data
            this.environmentConfig.config = config
            if (config.configTemplate) {
              this.configTemplateId = config.configTemplate.id
            }
            getList().then(response => {
              this.environments = response.data.results.filter(value => {
                return value.type == this.environmentConfigCopy.environment.type &&
                  value.name != this.environmentConfigCopy.environment.name
              })
            })
          })
        })
      },
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }
          if (result) {
            copyEnvironmentConfig(this.environmentConfig, this.environmentConfigId).then(
              response => {
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
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
      this.fetchData()
    }
  }
</script>
<style scoped>

</style>
