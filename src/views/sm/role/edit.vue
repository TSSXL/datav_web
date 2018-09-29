<template>
  <div class="app-container item">
    <h2>编辑角色</h2>
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
      <el-form-item label="用户">
        <el-transfer
          v-if="userOptions.length>0"
          :filterable="true"
          :titles="['待选项','选中项']"
          :filter-method="filterUser"
          filter-placeholder=""
          v-model="role.users"
          :props="{key: 'value', label: 'label'}"
          :data="userOptions"
          name="user" data-vv-as="用户" v-validate="''">
        </el-transfer>
        <error-tip :errs="errors" name="user"></error-tip>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">编辑</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getItem, editItem } from './api'
  import errorTip from '@/components/Validate/errorTip'
  import { getAll as getUsers } from '@/views/sm/user/api'
  import { message } from '@/utils'

  export default {
    components: { errorTip },
    data() {
      return {
        id: this.$route.params.id,
        userOptions: [],
        filterUser(query, item) {
          return item.label.indexOf(query) > -1
        },
        role: {
          name: '',
          desc: ''
        }
      }
    },
    methods: {
      fetchData() {
        getItem(this.id).then(res => {
          this.role = res.data
        })
      },
      fetchUsers() {
        getUsers().then(res => {
          this.userOptions = res.data.map(item => {
            return { value: item.account, label: item.name }
          })
        })
      },
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }

          if (result) {
            editItem(this.id, this.role).then(res => {
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
    created() {
      this.fetchUsers()
      this.fetchData()
    }
  }
</script>
<style scoped>
</style>
