<template>
  <div class="app-container list">
    <el-row :gutter="30">
      <el-col :span="14" style="height: calc(100vh - 96px); overflow-y: auto">
        <el-table :data="roleList.list" v-loading.body="listLoading" element-loading-text="拼命加载中"
                  @current-change="handleRoleChange"
                  @sort-change="sortChange" fit highlight-current-row size="mini">
          <el-table-column align="center" type="index" label="序号" width="84">
          </el-table-column>

          <el-table-column key='name'
                           show-overflow-tooltip
                           label="名称" sortable="custom"
                           width="240" prop="name">
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
        </el-table>

        <div v-show="!listLoading" class="pagination-container">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="roleList.paging.currentPage" :page-sizes="[10,20,30, 50]"
                         :page-size="roleList.paging.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="roleList.total">
          </el-pagination>
        </div>
      </el-col>
      <el-col :span="10" style="height: calc(100vh - 96px); overflow-y: auto">
        <section v-if="currentRole && currentRole.name">
          <el-form ref="form" label-width="120px" size="mini" label-position="left">
            <el-form-item label="角色">
              {{currentRole.name}}
            </el-form-item>
            <el-form-item label="描述">
              {{currentRole.desc}}
            </el-form-item>
          </el-form>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini"></el-input>
            </el-col>
            <el-col :span="12">
              <el-button type="text" @click="refresh" size="mini"> 刷新 </el-button>
              <el-button type="text" @click="expand" size="mini"> 展开/收缩 </el-button>
              <el-button @click="submit" type="primary" size="mini">保存</el-button>
            </el-col>
          </el-row>

          <el-tree
            :data="list"
            ref="tree"
            v-loading="listLoading"
            node-key="_id"
            :props="defaultProps"
            show-checkbox
            :filter-node-method="filterNode">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span><li :class="data.icon"/> {{ node.label }}</span>
            </span>
          </el-tree>

        </section>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getTree as getMenus, getPermissionMenus } from '../menu/api'
  import { getList as getRoles } from '../role/api'
  import { getMenuPermission, addMenuPermission } from './api'
  import { paging, queries, setSort, message } from '@/utils'

  export default {
    components: {},
    data() {
      return {
        group: this.$route.params.group,
        filterText: '',
        isExpand: true,
        list: null,
        listLoading: false,
        permissions: [],
        roleList: {
          list: null,
          listLoading: true,
          total: null,
          paging: paging(),
          queries: queries()
        },
        currentRole: {},
        newNode: {},
        currentNode: {},
        objQuery: [{path: {$regex: ''}}],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        routers: []
      }
    },
    created() {
      this.fetchRoleData()
      this.fetchMenuData()
    },
    activated() {
      /*
      if (this.group !== this.$route.params.group) {
        this.group = this.$route.params.group
        this.fetchRoleData()
        this.fetchMenuData()
      }
      */
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    },
    computed: {
      canReload: function() {
        return this.group === this.$store.getters.menuGroup
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true
        console.log(data)
        return (data.label.indexOf(value) !== -1 || data.router.indexOf(value) !== -1)
      },
      expand() {
        this.isExpand = !this.isExpand
        for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
          this.$refs.tree.store._getAllNodes()[i].expanded = this.isExpand
        }
      },
      refresh() {
        this.fetchMenuData()
      },
      handleRoleChange(val) {
        this.$nextTick(function() {
          this.currentRole = val
          this.fetchMenuPermissions()
        })
      },
      fetchMenuPermissions() {
        getMenuPermission(this.currentRole.name, this.group).then(response => {
          this.permissions = response.data.map(x => { return x.resourceId })
          this.$refs.tree.setCheckedKeys(this.permissions)
        })
      },
      submit() {
        var checkeds = this.$refs.tree.getCheckedKeys()
        var halfs = this.$refs.tree.getHalfCheckedKeys()
        var menus = checkeds.concat(halfs)
        addMenuPermission(this.currentRole.name, this.group, menus).then(res => {
          message(res)
        })
      },
      test() {
        getPermissionMenus(this.group).then(res => {
          console.log(res.data)
        })
      },
      fetchMenuData() {
        this.listLoading = true
        getMenus(this.group).then(response => {
          this.list = response.data
          this.listLoading = false
        })
      },
      fetchRoleData() {
        this.listLoading = true
        getRoles(this.roleList.paging, this.roleList.queries).then(res => {
          this.roleList.list = res.data.list
          this.roleList.total = res.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.roleList.paging.currentPage = 1
        this.fetchRoleData()
      },
      handleSizeChange(val) {
        this.roleList.paging.pageSize = val
        this.fetchRoleData()
      },
      handleCurrentChange(val) {
        this.roleList.paging.currentPage = val
        this.fetchRoleData()
      },
      sortChange(obj) {
        setSort(this.paging, obj)
        this.fetchRoleData()
      },
    }
  }
</script>
<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    font-size: 12px;
  }

  .custom-tree-node .info {
    font-size: 10px;
    margin-right: 12px;
  }
</style>
