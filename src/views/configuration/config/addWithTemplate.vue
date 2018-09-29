<template>
  <div class="app-container item">
    <h3>新建配置（有模板）</h3>
    <h3 v-show="isShow">从{{config.configTemplate.name}}模板载入</h3>
    <el-form ref="form" label-width="120px" size="mini">
      <el-form-item label="">
      </el-form-item>
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
          v-model="config.configTemplate.fileName"
          type="text" :rows="2"
          :autosize="false"
          name="fileName" data-vv-as="配置文件名称"
          v-validate="{ required: true, regex: /.+\.(conf|yml|properties)$/ }">
        </el-input>
        <error-tip :errs="errors" name="fileName"></error-tip>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { get } from '@/views/configuration/configtemplate/api'
  import { addConfig } from '@/views/configuration/config/api'
  import errorTip from '@/components/Validate/errorTip'

  export default {
    components: { errorTip },
    data() {
      return {
        configTemplateId: this.$route.params.configTemplateId,
        isShow: false,
        isEdit: true,
        config: {
          'name': '',
          'admin': '',
          'configTemplate': {}
        }
      }
    },
    methods: {
      fetchData() {
        get(this.configTemplateId).then(response => {
          this.config.configTemplate = response.data
          this.isShow = true
        })
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
    },
    created() {
      this.fetchData()
    }
  }
</script>
<style scoped>

</style>
