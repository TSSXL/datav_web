<template>
  <section>
    <el-table
      size="mini"
      :data="exampleData"
      style="width: 100%">
      <el-table-column
        v-for='(col, index) in element.cols'
        :key='index'
        prop="date"
        :label="col.label"
        width="180">
      </el-table-column>
    </el-table>
  </section>
</template>
<script>
  import base from './base'

  export default {
    name: 'tableControl',
    extends: base,
    data() {
      return {
        exampleData: [{ id: '_id' }]
      }
    }
  }
</script>
