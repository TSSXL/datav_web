<template>
  <div class="app-container list">
    <el-row>
      <el-col :span="18">
        <div class="filter-container">
            <span>
                <el-input @keyup.enter.native="handleFilter" style="width: 160px;"
                          class="filter-item" placeholder="Name" v-model="queries[0].value" size="mini">
                </el-input>
            </span>
          <el-button class="filter-item" type="primary" icon="search" @click="handleFilter" size="mini">搜索</el-button>
          <el-button type="text" @click="reload" size="mini"> 刷新</el-button>
        </div>
      </el-col>
      <el-col :span="6" style="text-align: right;" class="filter-container">
        <el-button @click="handleCreate" type="primary" icon="plus" style="margin-right: 10px;" size="mini">成员管理
        </el-button>
      </el-col>
    </el-row>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中"
              @sort-change="sortChange" fit highlight-current-row size="mini">
      <el-table-column key='user'
                       show-overflow-tooltip
                       label="用户" sortable="custom"
                       align="left" prop="user">
        <template slot-scope="scope">
          <li class="fa fa-user-circle info" />  {{scope.row.user}}
        </template>
      </el-table-column>
      <el-table-column key='primary'
                       show-overflow-tooltip
                       label="主职" sortable="custom"
                       align="left"
                       width="72"
                       prop="primary">
        <template slot-scope="scope">
          <li v-if="scope.row.primary === 1" class="fa fa-toggle-on" @click="handlePrimary(scope.row, 0)"/>
          <li v-else class="fa fa-toggle-off" @click="handlePrimary(scope.row, 1)"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="72" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="fa fa-minus-circle" @click="handleDelete(scope.row)" size="mini"> 移除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading && total > 0" class="pagination-container">
      <el-pagination @current-change="handleCurrentChange"
                     small
                     :current-page="paging.currentPage"
                     :page-size="paging.pageSize" layout="prev, pager, next" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import { getList, removeItem, setPrimary } from './api'
  import { paging, queries, setSort } from '@/utils'

  export default {
    data() {
      return {
        id: '',
        list: null,
        listLoading: false,
        total: null,
        paging: paging(),
        queries: [{ name: 'user', value: '', operator: '$regex' }]
      }
    },
    watch: {
      job(curVal, oldVal) {
        console.log(curVal, oldVal)
      }
    },
    created() {
    },
    activated() {
    },
    methods: {
      reload() {
        this.fetchData()
      },
      fetchData() {
        this.listLoading = true
        getList(this.id, this.paging, this.queries).then(res => {
          this.list = res.data.list
          this.total = res.data.total
          this.listLoading = false
        })
      },
      handleCreate() {
        this.$router.push({ path: '/sm/job/select/' + this.id })
      },
      handlePrimary(row, val) {
        row.primary = val
        setPrimary(row._id, val).then(res => {
          console.log(res.data)
        })
      },
      handleDelete(row) {
        this.$confirm('此操作将移除成员, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          this.delete(row)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消移除'
          })
        })
      },
      delete(row) {
        removeItem(row._id).then(response => {
          this.$message({
            type: 'success',
            message: '移除成功!'
          })
          this.fetchData()
        })
      },
      handleFilter() {
        this.paging.currentPage = 1
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
<style scoped>
  h3 {
    font-weight: 400;
    color: #1f2f3d;
  }
</style>
