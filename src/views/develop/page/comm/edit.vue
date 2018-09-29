<template>
  <div class="app-container item">
    <h3>编辑{{model.desc}}</h3>
    <el-form ref="form" label-width="120px" size="mini">
      <el-row v-for="(row, row_index) in page.layout" :key="row_index">
        <el-col v-for="(col, col_index) in row.cols" :key="col_index" :span="col.span">
          <el-form-item v-for="(element, el_index) in col.data" :key="el_index" :label="element.label" label-width="100px">
            <control-display :element="element"></control-display>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">编辑</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import validateBus from '@/views/bus/validate'
  import { message } from '@/utils'
  import { editItem, getItem } from '@/views/base/server/api'
  import { getItem as getCollection } from '@/views/develop/collection/api'
  import controlDisplay from '../components/controlDisplay'

  export default {
    components: { controlDisplay },
    data() {
      return {
        pageId: this.$route.params.pageid,
        id: this.$route.params.id,
        MODEL_NAME: null,
        page: {
        },
        model: {
        },
        collection: {

        }
      }
    },
    computed: {

    },
    methods: {
      fetchPage() {
        getItem('page', this.pageId).then(res => {
          this.page = res.data
          getItem('model', this.page.refModel).then(res => {
            this.model = res.data
            this.MODEL_NAME = this.model.name
            getCollection(this.model._id, this.id).then(res => {
              this.collection = res.data
              this.setValue()
            })
          })
        })
      },
      setValue() {
        for (const row of this.page.layout) {
          for (const col of row.cols) {
            for (const element of col.data) {
              if (element.dataField && element.dataField !== '') {
                const f = element.dataField.split('.')
                if (f.length > 1) {
                  element.value = this.collection[f[0]][f[1]]
                } else {
                  element.value = this.collection[element.dataField]
                }
              }
            }
          }
        }
      },
      save() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }

          if (result) {
            var results = { properties: {}}

            for (const row of this.page.layout) {
              for (const col of row.cols) {
                for (const element of col.data) {
                  if (element.dataField && element.dataField !== '') {
                    const f = element.dataField.split('.')
                    if (f.length > 1) {
                      results[f[0]][f[1]] = element.value
                    } else {
                      results[element.dataField] = element.value
                    }
                  }
                }
              }
            }
            console.log(results)

            editItem('collection', this.id, results).then(res => {
              message(res)
              if (res.success) {
                this.$router.go(-1)
              }
            })

            return
          }
        })
      },
      onSubmit() {
        this.errors.clear()
        // 校验子组件
        validateBus.$emit('validate')
        var _self = this
        setTimeout(() => {
          _self.save()
        }, 1)
      },
      onCancel() {
        this.$router.go(-1)
      }
    },
    mounted() {
      this.$nextTick(function() {
        validateBus.$on('errors-changed', errors => {
          errors.forEach(e => {
            this.errors.add(e.field, e.msg, e.rule, e.scope)
          })
        })
      })
      this.fetchPage()
    },
    created() {
    }
  }
</script>
<style scoped>

</style>
