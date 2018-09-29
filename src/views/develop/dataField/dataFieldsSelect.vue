<template>
  <section>
    <el-form-item label="数据字段">
      <el-cascader
        :options="fields"
        :clearable="true"
        :props="props"
        v-model="formItem.dataField"
        @change="handleChange">
      </el-cascader>
    </el-form-item>
  </section>
</template>

<script>
  import { getTree } from './api'
  export default {
    props: {
      formItem: {type: Object},
      model: {type: String}
    },
    data() {
      return {
        fields: [],
        props: {
          label: 'name',
          value: 'name',
          children: 'children'
        }
      }
    },
    created() {
      this.fetchFields()
    },
    methods: {
      fetchFields() {
        getTree(this.model).then(res => {
          this.fields = res.data
        })
      },
      handleChange(val) {
        var fields = this.fields
        val.forEach((x, index) => {
          var field = fields.find(y => {
            return y.name === x
          })
          if (index === val.length - 1) {
            this.formItem.label = field.label
          } else {
            fields = field.children
          }
        })
      }
    }
  }
</script>
