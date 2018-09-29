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
          {{scope.row.name}}
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

      <el-table-column label="操作" width="356">
        <template slot-scope="scope">
          <el-button type="text" icon="fa fa-window-restore" @click="handleRun(scope.row)" size="mini"> 运行</el-button>
          <el-button type="text" icon="fa fa-plus" @click="handleMenu(scope.row)" size="mini"> 添加菜单</el-button>
          <el-button type="text" icon="fa fa-edit" @click="handleDesign(scope.row)" size="mini"> 设计</el-button>
          <el-button type="text" icon="fa fa-copy" @click="handleCopy(scope.row)" size="mini"> 复制</el-button>
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
  import baseList from '@/views/base/server/baseList'
  import { getPages, copy } from './api'
  import { addItem } from '@/views/sm/menu/api'
  import { getItem } from '@/views/base/server/api'
  import { getPermissionMenus} from '@/views/sm/menu/api'
  import { message } from '@/utils'

  export default {
    extends: baseList,
    data() {
      return {
        MODEL_NAME: 'page',
        model: {}
      }
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getPages(this.$route.params.id, this.paging, this.queries).then(res => {
          if (res.success) {
            this.list = res.data.list
            this.total = res.data.total
            this.listLoading = false
          }
        })
        getItem('model', this.$route.params.id).then(res => {
          this.model = res.data
        })
      },
      handleCreate() {
        this.$router.push({ path: `../add/${this.$route.params.id}` })
      },
      handleRun(row) {
        this.$router.push({ path: `../comm/${row.name}/${row._id}` })
      },
      handleMenu(row) {
        if (!this.$store.getters.menuGroup) {
          this.$store.dispatch('SetGroup', 'default2.0')
        }
        const menuGroup = this.$store.getters.menuGroup

        var menu = {
          parentId: '5b1c8ec3d6d162110cf4dc2d',
          label: this.model.desc,
          name: '',
          redirect: '/#/develop/collection/list/' + this.model._id,
          target: '_self',
          router: [],
          icon: 'fa fa-sitemap',
          hidden: false,
          disabled: false,
          dropdown: true,
          type: '',
          group: menuGroup,
          desc: '',
          sort: 0
        }
        addItem(menu).then(res => {
          message(res)

          getPermissionMenus(menuGroup).then(res => {
            this.$store.dispatch('GenerateMenus', res.data).then((res) => {
              this.$parent.getSideMenus()
            })
          })
        })
      },
      handleDesign(row) {
        this.$router.push({ path: `../design/${row._id}` })
      },
      handleCopy(row) {
        copy(row._id).then(res => {
          message(res)
          if (res.success) {
            this.fetchData()
          }
        })
      }
    },
    beforeCreate() {
    }
  }
</script>
