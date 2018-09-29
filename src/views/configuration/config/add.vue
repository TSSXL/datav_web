<template>
  <div class="app-container item">
    <h3>运行配置配置项</h3>
    <el-form ref="form" label-width="120px" size="mini">
      <el-form-item>
        <el-checkbox v-model="isGlobal" @change="changeGlobalName">引用全局配置</el-checkbox>
      </el-form-item>
      <el-form-item label="名称">
        <el-input
          v-model="environmentConfigItem.name"
          type="text"
          :autosize="false"
          name="name" data-vv-as="名称" v-validate="'required'" :disabled="!isNew">
        </el-input>
        <error-tip :errs="errors" name="name"></error-tip>
      </el-form-item>
      <div v-if="!isGlobal">
        <el-form-item label="值">
          <el-input
            v-model="environmentConfigItem.newValue"
            type="text"
            :autosize="false"
            name="newValue" data-vv-as="值" v-validate="'required'">
          </el-input>
          <error-tip :errs="errors" name="newValue"></error-tip>
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item label="全局配置名称">
          <el-select
            v-model="environmentConfigItem.newGlobalName"
            :multiple="false"
            :clearable="false"
            :filterable="false"
            :allow-create="false"
            name="newGlobalName" data-vv-as="全局配置名称" v-validate="'required'">
            <el-option
              v-for="globalConfigItem in globalConfigItems"
              :key="globalConfigItem.name"
              :label="globalConfigItem.name"
              :value="globalConfigItem.name">
            </el-option>
          </el-select>
          <error-tip :errs="errors" name="newGlobalName"></error-tip>
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
    getEnvironmentConfig,
    addEnvironmentConfigItem,
    updateEnvironmentConfigItem
  } from '@/views/configuration/config/api'
  import errorTip from '@/components/Validate/errorTip'

  export default {
    components: { errorTip },
    data() {
      return {
        environmentConfigId: this.$route.params.environmentConfigId,
        environmentConfigItem: {
          'environmentConfig': null,
          'name': this.$route.query.name,
          'oldValue': this.$route.query.oldValue,
          'oldGlobalName': this.$route.query.oldGlobalName,
          'newValue': this.$route.query.oldValue,
          'newGlobalName': this.$route.query.oldGlobalName,
          'version': null
        },
        isGlobal: !!this.$route.query.oldGlobalName,
        globalConfigItems: [],
        isNew: !this.$route.query.name
      }
    },
    methods: {
      changeGlobalName() {
        if (!this.isGlobal) {
          this.environmentConfigItem.newGlobalName = ''
        }
      },
      fetchData() {
        getEnvironmentConfig(this.environmentConfigId).then(response => {
          this.globalConfigItems = response.data.environment.items
          this.environmentConfigItem.environmentConfig = response.data
          this.environmentConfigItem.version = response.data.items[0].version
        })
      },
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }
          if (result) {
            if (this.environmentConfigItem.newGlobalName) {
              const globalConfigItem = this.globalConfigItems.find(v => {
                return v.name == this.environmentConfigItem.newGlobalName
              })
              this.environmentConfigItem.newValue = globalConfigItem.value
            }
            if (this.isNew) {
              addEnvironmentConfigItem(this.environmentConfigItem, this.environmentConfigId).then(
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
              updateEnvironmentConfigItem(this.environmentConfigItem, this.environmentConfigId).then(
                response => {
                  this.$notify({
                    title: '成功',
                    message: '创建成功',
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
    },
    created() {
      this.fetchData()
    }
  }
</script>
<style scoped>

</style>
