<template>
  <div class="app-container item">
    <h3>新建页面组件</h3>
    <el-form ref="form" label-width="120px" size="mini">
      <el-form-item label="输入 / 选择">
        <el-radio-group v-model="component.type" size="mini">
          <el-radio-button label="input">输入</el-radio-button>
          <el-radio-button label="page">选择</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <section v-if="component.type=='page'">
        <el-form-item label="Name">
          {{component_name}}
        </el-form-item>

        <el-form-item label="File">
          {{component_file}}
          <div class="info"> import('@/views/' + file + '.vue') </div>
        </el-form-item>

        <el-form-item label="Module">
          <el-select v-model="component.module" clearable placeholder="请选择" @change="moduleChange">
            <el-option
              v-for="item in modules"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Entity">
          <el-select v-model="component.entity" clearable placeholder="请选择">
            <el-option
              v-for="item in entities"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Page">
          <el-input v-model="component.page" type="text"
            name="page" data-vv-as="Page" v-validate="'required'">
          </el-input>
          <error-tip :errs="errors" name="page"></error-tip>
        </el-form-item>
      </section>

      <section v-else>
        <el-form-item label="Name">
          <el-input
            v-model="component.name"
            type="text"
            name="name" data-vv-as="Name" v-validate="'required'">
          </el-input>
          <error-tip :errs="errors" name="name"></error-tip>
        </el-form-item>

        <el-form-item label="File">
          <el-input
            v-model="component.file"
            type="text"
            name="file" data-vv-as="File" v-validate="'required'">
          </el-input>
          <span class="info"> import('@/views/' + file + '.vue') </span>
          <error-tip :errs="errors" name="file"></error-tip>
        </el-form-item>
      </section>

      <el-form-item label="描述">
        <el-input
          v-model="component.desc"
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
  import { addItem } from '@/views/sm/component/api'
  import { getList as getModules } from '@/views/dev/module/api'
  import { getList as getEntities } from '@/api/entity'
  import errorTip from '@/components/Validate/errorTip'

  export default {
    components: { errorTip },
    data() {
      return {
        id: this.$route.params.id,
        modules: [],
        entities: [],
        component: {
          name: '',
          file: '',
          module: '',
          entity: '',
          page: '',
          type: 'page',
          desc: ''
        },
        listQuery: {
          pageNo: 1,
          pageSize: 100,
          sort: '_id',
          order: -1
        },
        objQuery: [
          {name: { $regex: '' }}
        ]
      }
    },
    computed: {
      component_name: function() {
        return `${this.component.module}_${this.component.entity}_${this.component.page}`
      },
      component_file: function() {
        return `${this.component.module}/${this.component.entity}/${this.component.page}`
      }
    },
    methods: {
      fetchModule() {
        getModules(this.listQuery, this.objQuery).then(response => {
          this.modules = response.data.results.map(x => {
            return { label: `${x.name} [${x.value}]`, value: x.value }
          })
        })
      },
      fetchEntities(module) {
        var objQuery = [{ module: module }]
        getEntities(this.listQuery, objQuery).then(response => {
          this.entities = response.data.results.map(x => {
            return { label: `${x.desc} [${x.name}]`, value: x.name }
          })
        })
      },
      moduleChange(val) {
        this.component.entity = ''
        this.fetchEntities(val)
      },
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }

          if (result) {
            if(this.component.type == 'page') {
              this.component.name = this.component_name
              this.component.file = this.component_file
            } else {

            }
            addItem(this.component).then(response => {
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
      this.fetchModule()
    }
  }
</script>
<style scoped>

</style>
