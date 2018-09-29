<template>
  <div class="app-container item">
    <h2>新建角色</h2>
    <el-form ref="form" label-width="120px" size="mini">
      <el-form-item label="名称">
        <el-input v-model="role.name" type="text" name="name" data-vv-as="名称" v-validate="'required'">>
        </el-input>
        <error-tip :errs="errors" name="name"></error-tip>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="role.desc" type="textarea" :rows="2" :autosize="true">
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
  import { addItem } from '@/views/sm/role/api'
  import errorTip from '@/components/Validate/errorTip'
  import { message } from '@/utils'

  export default {
    components: { errorTip },
    data() {
      return {
        role: {
          name: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }

          if (result) {
            addItem(this.role).then(res => {
              message(res)
              if (res.success) return this.$router.go(-1)
            })
            return
          }
        })
      },
      onCancel() {
        this.$router.go(-1)
      }
    },
    created() { }
  }
</script>
<style scoped>
</style>
