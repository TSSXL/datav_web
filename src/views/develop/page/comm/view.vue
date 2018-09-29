<template>
  <div class="app-container item">
    <h3>查看{{model.desc}}</h3>
    <el-form ref="form" label-width="120px" size="mini">
      <el-row v-for="(row, row_index) in page.layout" :key="row_index">
        <el-col v-for="(col, col_index) in row.cols" :key="col_index" :span="col.span">
          <el-form-item v-for="(element, el_index) in col.data" :key="el_index" :label="element.label" label-width="100px">
            <control-display :element="element"></control-display>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import { getItem } from '@/views/base/server/api'
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
      }
    },
    mounted() {
      this.fetchPage()
    },
    created() {
    }
  }
</script>
<style scoped>

</style>
