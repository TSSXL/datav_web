<template>
</template>

<script>
  import { getList, removeItem } from './api'
  import { paging, queries, setSort } from '@/utils'

  export default {
    data() {
      return {
        MODEL_NAME: null,
        list: null,
        listLoading: true,
        total: null,
        paging: paging(),
        queries: queries()
      }
    },
    created() {
    },
    activated() {
      console.log('baseList activated fetchData')
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getList(this.MODEL_NAME, this.paging, this.queries).then(res => {
          if (res.success) {
            this.list = res.data.list
            this.total = res.data.total
            this.listLoading = false
          }
        })
      },
      handleCreate() {
        this.$router.push({ path: 'add' })
      },
      handleUpdate(row) {
        this.$router.push({ path: 'edit/' + row._id })
      },
      handleSetting(row) {
        this.$router.push({ path: 'setting/' + row._id })
      },
      handleDelete(row) {
        this.$confirm('此操作将删除记录, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          this.delete(row)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      delete(row) {
        removeItem(this.MODEL_NAME, row._id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetchData()
        })
      },
      handleFilter() {
        this.paging.currentPage = 1
        this.fetchData()
      },
      handleSizeChange(val) {
        this.paging.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.paging.currentPage = val
        this.fetchData()
      },
      sortChange(obj) {
        setSort(this.paging, obj)
        this.fetchData()
      }
    }
  }
</script>
