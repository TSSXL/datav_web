
<template>
  <div class="app-container list">
    <el-row>
      <el-col :span="18">
        <div class="filter-container">

            <span>
                <el-input @keyup.enter.native="handleFilter" style="width: 200px;"
                  class="filter-item" placeholder="文本" v-model="queries[0].value" size="mini">
                </el-input>
            </span>


            <el-button class="filter-item" type="primary" icon="search" @click="handleFilter" size="mini">搜索</el-button>

        </div>
      </el-col>
      <el-col :span="6" style="text-align: right;" class="filter-container">
          <el-button @click="handleCreate" type="primary" icon="plus" style="margin-right: 10px;" size="mini">添加</el-button>
      </el-col>
    </el-row>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中"
      @sort-change="sortChange" fit highlight-current-row size="mini">

        <el-table-column align="center" type="index" label="序号" width="84">
        </el-table-column>


      <el-table-column key='name'
        show-overflow-tooltip
        label="名称"
        width="250" prop="name">
        <template slot-scope="scope">

            {{scope.row.name}}
        </template>
      </el-table-column>

      <el-table-column key='label'
                       show-overflow-tooltip
                       label="文本" sortable="custom"
                       width="" prop="label">
        <template slot-scope="scope">

          {{scope.row.label}}
        </template>
      </el-table-column>

      <el-table-column key='type'
        show-overflow-tooltip
        label="类型"
        width="120" align="center" prop="type">
        <template slot-scope="scope">

            {{scope.row.type.join('-')}}
        </template>
      </el-table-column>


      <el-table-column  label="操作" width="150" align="center" >
        <template slot-scope="scope">
          <el-button type="text" icon="fa fa-edit" @click="handleUpdate(scope.row)" size="mini"> 修改</el-button>
          <el-button type="text" icon="fa fa-trash-o" @click="handleDelete(scope.row)" size="mini"> 删除</el-button>
        </template>
      </el-table-column>

    </el-table>


    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="paging.currentPage" :page-sizes="[10,20,30, 50]"
                     :page-size="paging.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import { getList, removeItem } from "./api"
  import { paging, queries, setSort,parseTime } from '@/utils'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      total: null,
        paging: paging(),
          queries: [{ name: 'label', value: '', operator: '$regex' }]
      };
    },
    created() {
    },
    activated() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getList(this.paging, this.queries).then(res => {
          this.list = res.data.content
          this.total = res.data.totalElements
          this.listLoading = false
      })
    },
    handleFilter() {
      this.paging.currentPage = 1
      this.fetchData();
    },
    handleCreate() {
      this.$router.push({ path: "/datav/component/add" });
    },
    handleUpdate(row) {
      this.$router.push({ path: "/datav/component/edit/" + row.id });
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
      removeItem(row.id).then(res => {
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
};
</script>
