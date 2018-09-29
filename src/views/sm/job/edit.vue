<template>
  <div class="app-container item">
    <h3>修改职务</h3>
    <el-form ref="form" label-width="120px" size="mini">
      <el-form-item label="Name">
        <el-input
          v-model="job.name"
          type="text"
          name="name" data-vv-as="Name" v-validate="'required'">
        </el-input>
        <error-tip :errs="errors" name="name"></error-tip>
      </el-form-item>

      <el-form-item label="Organization">
        {{job.refOrganization}}
      </el-form-item>
      <el-form-item label="类型">
        <el-cascader
          :options="categoryOptions"
          clearable
          change-on-select
          v-model="job.category"
          :props="categoryProps"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="job.desc" type="textarea" :rows="1" :autosize="true">
        </el-input>
        <error-tip :errs="errors" name="desc"></error-tip>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">编辑</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getItem, editItem } from '@/views/sm/job/api'
  import { getTree as getCategories } from '@/views/sm/category/api'
  import errorTip from '@/components/Validate/errorTip'
  import { message } from '@/utils'

  export default {
    components: { errorTip },
    data() {
      return {
        id: this.$route.params.id,
        categoryOptions: [],
        job: {
          name: '',
          organization: '',
          category: [],
          desc: ''
        },
        categoryProps: {
          label: 'label',
          value: 'value',
          children: 'children'
        }
      }
    },
    computed: { },
    methods: {
      fetchData() {
        getItem(this.id).then(res => {
          this.job = res.data
        })
      },
      getCategoryOptions() {
        getCategories('job').then(res => {
          this.categoryOptions = res.data
        })
      },
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }

          if (result) {
            editItem(this.id, this.job).then(res => {
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
      this.getCategoryOptions()
    }
  }
</script>
<style scoped>

</style>
