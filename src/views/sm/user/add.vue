<template>
  <div class="app-container item">
    <h2>新建用户</h2>
    <el-form ref="form" label-width="120px" size="mini">
      <el-form-item label="账号">
        <el-input v-model="user.account" name="account" type="text" v-validate="'required'" data-vv-as="账号">
        </el-input>
        <error-tip :errs="errors" name="account"></error-tip>
      </el-form-item>
      <el-form-item label="密码">
        <password v-model="user">
        </password>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="user.name" name="name" type="text" v-validate="'required'" data-vv-as="姓名">
        </el-input>
        <error-tip :errs="errors" name="name"></error-tip>
      </el-form-item>
      <el-form-item label="所属机构">
        <tree-select
          v-model="user.refOrganization"
          :multiple="false"
          placeholder="请选择组织机构"
          :show-count="true"
          :load-root-options="loadOrganization"
          :normalizer="normalizer"
          :auto-load-root-options="true"
          :default-expand-level="1"
        />
        <error-tip :errs="errors" name="refCategory"></error-tip>
      </el-form-item>
      <el-form-item label="角色">
        <el-transfer
          v-if="roleOptions.length>0"
          :filterable="true"
          :titles="['待选项','选中项']"
          :filter-method="filterRole"
          filter-placeholder=""
          v-model="user.roles"
          :props="{key: 'value', label: 'label'}"
          :data="roleOptions"
          name="user" data-vv-as="角色" v-validate="''">
        </el-transfer>
        <error-tip :errs="errors" name="user"></error-tip>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { addItem } from './api'
  import validateBus from '@/views/bus/validate'
  import errorTip from '@/components/Validate/errorTip'
  import password from '@/components/Control/password'
  import { getAll as getRoles } from '@/views/sm/role/api'
  import { message } from '@/utils'
  import treeSelect from '@riophae/vue-treeselect'
  import { getTree } from '@/views/sm/organization/api'

  export default {
    components: { errorTip, password, treeSelect },
    data() {
      return {
        group: 'government',
        roleOptions: [],
        user: {
          name: '',
          account: '',
          password: '',
          roles: [],
          refOrganization: null
        },
        pwdType: 'password',
        filterRole(query, item) {
          return item.label.indexOf(query) > -1
        },
        normalizer(node) {
          return {
            id: node._id,
            label: node.fullName,
            children: node.children
          }
        }
      }
    },
    methods: {
      fetchRoles() {
        getRoles().then(res => {
          this.roleOptions = res.data.map(item => {
            return { value: item.name, label: item.desc }
          })
        })
      },
      loadOrganization(callback) {
        getTree(this.group).then(response => {
          callback(null, response.data)
        })
      },
      onSubmit() {
        this.errors.clear()
        validateBus.$emit('validate') //校验子组件

        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }
          if (result) {
            addItem(this.user).then(res => {
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
      validateBus.$on('errors-changed', errors => {
        errors.forEach(e => {
          this.errors.add(e.field, e.msg, e.rule, e.scope)
        })
      })

      this.fetchRoles()
    }
  }
</script>
<style scoped>
</style>
