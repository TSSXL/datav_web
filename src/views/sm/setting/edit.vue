<template>
  <div class="app-container item">
    <h3>新建设置项</h3>
    <el-form ref="form" label-width="120px" size="mini">
      <el-form-item label="Name">
        <el-input
          v-model="item.name"
          type="text"
          name="name" data-vv-as="Name" v-validate="'required'">
        </el-input>
        <error-tip :errs="errors" name="name"></error-tip>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="item.desc" type="textarea" :rows="1" :autosize="true">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { newItem, create } from './api'
  import errorTip from '@/components/Validate/errorTip'
  import { message } from '@/utils'

  export default {
    components: { errorTip },
    data() {
      return {
        item: {}
      }
    },
    methods: {
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }

          if (result) {
            this.dataGroup.module = this.module
            addItem(this.dataGroup).then(res => {
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
      newItem().then(res => {
        this.item = res.data
      })
    }
  }
</script>
<style scoped>

</style>
