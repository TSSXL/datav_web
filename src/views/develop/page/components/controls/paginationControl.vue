<template>
  <section>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="paging.currentPage" :page-sizes="[10,20,30, 50]"
                   :page-size="paging.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </section>
</template>
<script>
  import base from './base'

  export default {
    name: 'rateControl',
    extends: base,
    data() {
      return {
        total: 0,
        paging: { currentPage: 1, pageSize: 10 }
      }
    },
    methods: {
      handleSizeChange(val) {
        this.paging.pageSize = val
      },
      handleCurrentChange(val) {
        this.paging.currentPage = val
      }
    }
  }
</script>
