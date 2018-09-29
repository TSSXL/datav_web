<template>
  <div class="app-container list">
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
        <el-button @click="handleSave" type="primary" icon="plus" style="margin-right: 10px;" size="mini">保存
        </el-button>
      </el-col>
    </el-row>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中"
              ref="userTable"
              @selection-change="handleSelectionChange"
              @sort-change="sortChange"
              fit highlight-current-row size="mini">
      <el-table-column
        type="selection"
        width="72">
      </el-table-column>

      <el-table-column key='name'
                       show-overflow-tooltip
                       label="Name" sortable="custom"
                       width="160" align="left" prop="name">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>

      <el-table-column key='account'
                       show-overflow-tooltip
                       label="Account"
                       width="160" align="left" prop="account">
        <template slot-scope="scope">
          {{scope.row.account}}
        </template>
      </el-table-column>
      <el-table-column key='desc'
                       show-overflow-tooltip
                       label="Desc"
                       align="left" prop="desc">
        <template slot-scope="scope">
          {{scope.row.desc}}
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
  import { getList } from '../user/api'
  import { getAll as getJobUsers, batchInsert } from '../jobUser/api'
  import { paging, queries, setSort } from '@/utils'

  export default {
    data() {
      return {
        id: this.$route.params.id,
        list: null,
        listLoading: true,
        total: null,
        paging: paging(),
        queries: queries(),
        jobUsers: [],
        multipleSelection: []
      }
    },
    created() {
    },
    activated() {
    },
    mounted() {
      this.fetchJobUser()
    },
    methods: {
      fetchJobUser() {
        getJobUsers(this.id, {}, []).then(res => {
          this.jobUsers = res.data
          this.fetchData()
        })
      },
      fetchData() {
        this.listLoading = true
        getList(this.paging, this.queries).then(res => {
          this.list = res.data.list.map(x => {
            return { account: x.account, name: x.name, _id: x._id }
          })
          this.total = res.data.total
          this.listLoading = false
          this.toggleSelection()
        })
      },
      toggleSelection() {
        var rows = []
        for (const row of this.list) {
          const selected = this.jobUsers.find(x => {
            return x.user === row.account
          })
          if (selected) {
            rows.push(row)
          }
        }

        var _this = this
        setTimeout(() => {
          _this.setSelection(rows)
        }, 500)
      },
      setSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.userTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.userTable.clearSelection()
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleSave() {
        const data = this.list.map(x => {
          const checked = this.multipleSelection.find(y => {
            return x.account === y.account
          })
          return { account: x.account, checked: checked !== undefined }
        })
        //console.log(data)
        //const users = this.multipleSelection.map(x => x.account)

        batchInsert(this.id, data).then(res => {
          this.jobUsers = res.data
          //console.log(this.jobUsers)
          this.$router.go(-1)
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
