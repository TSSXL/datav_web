<template>
  <div class="app-container list">
    <h3>{{title}}</h3>
    <el-row>
      <el-col :span="18">
        <div class="filter-container">
            <span>
                <el-input @keyup.enter.native="handleFilter" style="width: 200px;"
                          class="filter-item" placeholder="Name" v-model="queries[0].value" size="mini">
                </el-input>
            </span>
          <el-button class="filter-item" type="primary" icon="search" @click="handleFilter" size="mini">搜索</el-button>
        </div>
      </el-col>
      <el-col :span="6" style="text-align: right;" class="filter-container">
        <el-button @click="handleCreate" type="primary" icon="plus" style="margin-right: 10px;" size="mini">添加
        </el-button>
      </el-col>
    </el-row>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中"
              @sort-change="sortChange" fit highlight-current-row size="mini">
      <el-table-column align="center" type="index" label="序号" width="84">
      </el-table-column>

      <el-table-column key='name'
                       show-overflow-tooltip
                       label="名称" sortable="custom"
                       width="200" prop="name">
        <template slot-scope="scope">
          <el-button type="text" @click="handleView(scope.row)" size="mini">{{scope.row.name}}</el-button>
        </template>
      </el-table-column>

      <el-table-column key='desc'
                       show-overflow-tooltip
                       label="描述"
                       prop="desc">
        <template slot-scope="scope">
          {{scope.row.desc}}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="128">
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
  import { getList, removeItem } from './api'
  import { paging, queries, setSort } from '@/utils'
  import { getPages } from '@/views/develop/page/api'
  import { getItem } from '@/views/base/server/api'

  export default {
    data() {
      return {
        model: this.$route.params.model,
        MODEL_NAME: 'collection',
        title: '',
        list: null,
        listLoading: true,
        total: null,
        paging: paging(),
        queries: queries(),
        pages: [],
        loaded: false
      }
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getList(this.model, this.paging, this.queries).then(res => {
          if (res.success) {
            this.list = res.data.list
            this.total = res.data.total
            this.listLoading = false
          }
        })
        console.log(this.model)
        getItem('model', this.model).then(res => {
          console.log(res.data)
          this.title = res.data.desc
        })
      },
      fetchPage() {
        var paging = {
          currentPage: 1,
          pageSize: 100,
          sort: '_id',
          order: -1
        }
        getPages(this.model, paging, []).then(res => {
          this.pages = res.data.list
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
        console.log(val)
        this.fetchData()
      },
      sortChange(obj) {
        setSort(this.paging, obj)
        this.fetchData()
      },
      handleCreate() {
        const page = this.pages.find(x => {
          return x.name === 'add'
        })
        this.$router.push({ path: '/develop/page/comm/add/' + page._id })
      },
      handleView(row) {
        const page = this.pages.find(x => {
          return x.name === 'view'
        })
        this.$router.push({ path: '/develop/page/comm/view/' + page._id + '/' + row._id })
      },
      handleUpdate(row) {
        const page = this.pages.find(x => {
          return x.name === 'edit'
        })
        this.$router.push({ path: '/develop/page/comm/edit/' + page._id + '/' + row._id })
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
        removeItem(this.model, row._id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetchData()
        })
      }
    },
    beforeRouteUpdate(to, from, next) {
      console.log('beforeRouteUpdate')
      this.model = to.params.model
      this.paging = paging()
      this.queries = queries()
      this.fetchData()
      this.fetchPage()
      next()
    },
    created() {
      this.loaded = true
      console.log('created')
      this.model = this.$route.params.model
      this.fetchData()
      this.fetchPage()
    },
    activated() {
      if (!this.loaded) {
        console.log('activated')
        this.model = this.$route.params.model
        this.fetchData()
        this.fetchPage()
      }
      this.loaded = false
    }
  }
</script>
