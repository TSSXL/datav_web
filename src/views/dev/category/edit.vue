<template>
  <div class="app-container item">
    <h3>修改文档目录</h3>
    <el-form ref="form" label-width="120px" size="mini">

      <el-form-item label="名称">

        <el-input
          v-model="category.name"
          type="text" :rows="2"
          :autosize="false"
          name="name" data-vv-as="名称" v-validate="'required'">
        </el-input>

        <error-tip :errs="errors" name="name"></error-tip>
      </el-form-item>

      <el-form-item label="目录">
        {{category.directory}}
      </el-form-item>

      <el-form-item label="描述">

        <el-input
          v-model="category.desc"
          type="textarea" :rows="1"
          :autosize="true"
          name="desc" data-vv-as="描述" v-validate="''">
        </el-input>

        <error-tip :errs="errors" name="desc"></error-tip>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">新建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {get, put, getApi} from "@/views/dev/attachment/api"
  import errorTip from "@/components/Validate/errorTip";
  import {message} from '@/utils'

  export default {
    components: {errorTip},
    data() {
      return {
        id: this.$route.params.id,
        category: {
          name: '',
          directory: '',
          desc: ''
        }
      }
    },
    methods: {
      fetchData() {
        get(`api/category/${this.id}`).then(res => {
          this.category = res.data
        })
      },
      createFilter(queryString) {
        return (options) => {
          return (options.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        }
      },
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }

          if (result) {
            put(this.api + `api/category/${this.id}`, this.category).then(res => {
              message(res)
              if (res.success)
                this.$router.go(-1)
            })
          }
        })
      },
      onCancel() {
        this.$router.go(-1)
      }
    },
    computed: {
      api() {
        return getApi()
      }
    }, created() {
      this.fetchData()
    }
  }
</script>
<style scoped>

</style>
