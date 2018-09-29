<template>
  <div class="app-container list">
    <el-table
      :data="data"
      :show-header="false"
      empty-text="未选择项目"
      style="width: 100%" size="mini">
      <el-table-column
        prop="label"
        width="124">
      </el-table-column>
      <el-table-column
        prop="value">
        <template slot-scope="scope">
          {{scope.row.value}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getItem } from '@/views/base/server/api'

  export default {
    data() {
      return {
        id: this.$route.params.id,
        model: {}
      }
    },
    created() {
      this.fetchData()
    },
    activated() {

    },
    computed: {
      data: function() {
        var list = []
        if (!this.model) {
          return []
        }
        const fields = ['name', 'desc', 'client', 'server', 'dataStorage']
        for (const field of fields) {
          list.push({ label: field, value: this.model[field] })
        }
        return list

        for (const key in this.model) {
          list.push({ label: key, value: this.model[key] })
        }
        return list
      }
    },
    methods: {
      fetchData() {
        getItem('model', this.id).then(res => {
          this.model = res.data
        })
      }
    }
  }
</script>
