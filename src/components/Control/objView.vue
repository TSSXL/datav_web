<template>
  <div class="box-block">
    <div class="source">
      <el-table
        :data="data"
        :show-header="false"
        empty-text="未选择项目"
        style="width: 100%" size="mini">
        <el-table-column
          prop="label"
          width="180">
        </el-table-column>
        <el-table-column
          prop="value">
          <template slot-scope="scope">
            {{scope.row.value}}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      obj: { type: Object },
      props: { type: Array }
    },
    data() {
      return {}
    },
    created() {

    },
    computed: {
      data: function () {
        var list = []
        if (!this.obj) {
          return []
        }

        if (this.props && this.props.length > 0) {
          for (let prop of this.props) {
            list.push({label: prop, value: this.obj[prop]})
          }
          return list
        }

        for (let key in this.obj) {
          list.push({label: key, value: this.obj[key]})
        }
        return list
      }
    },
    methods: {}
  }
</script>
<style scoped>
</style>
