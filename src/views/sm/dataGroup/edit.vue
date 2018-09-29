<template>
  <div class="app-container item">
    <h3>编辑目录组</h3>
    <el-form ref="form" label-width="120px" size="mini">
      <el-form-item label="Label">
        <el-input
          v-model="dataGroup.label"
          type="text"
          name="label" data-vv-as="Label" v-validate="'required'">
        </el-input>
        <error-tip :errs="errors" name="label"></error-tip>
      </el-form-item>

      <el-form-item label="Value">
        {{dataGroup.value}}
      </el-form-item>
      <el-form-item label="Module">
        {{dataGroup.module}}
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="dataGroup.desc" type="textarea" :rows="1" :autosize="true">
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">编辑</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getItem, editItem } from '@/views/sm/dataGroup/api'
  import errorTip from '@/components/Validate/errorTip'
  import { message } from '@/utils'

  export default {
    components: {errorTip},
    data() {
      return {
        id: this.$route.params.id,
        dataGroup: {
          label: '',
          value: '',
          module: '',
          desc: '',
          parentId: ''
        }
      }
    },
    methods: {
      fetchData() {
        getItem(this.id).then(res => {
          this.dataGroup = res.data
        })
      },
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }

          if (result) {
            editItem(this.id, this.dataGroup).then(res => {
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
      this.fetchData()
    }
  }
</script>
<style scoped>

</style>
