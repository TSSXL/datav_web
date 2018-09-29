<template>
  <div class="app-container list">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini"></el-input>
      </el-col>
      <el-col :span="18">
        <el-button type="text" @click="refresh" size="mini"> 刷新 </el-button>
        <el-button type="text" @click="expand" size="mini"> 展开/收缩 </el-button>
        <el-button type="text" @click="handleAddRoot" size="mini"> 添加根节点 </el-button>
        <el-button type="text" v-if="canReload" @click="handleReload" size="mini"> 重新载入 </el-button>
      </el-col>
    </el-row>


    <el-row :gutter="30">
      <el-col :span="12" style="height: calc(100vh - 124px); overflow-y: auto">
        <el-tree
          :data="list"
          ref="tree"
          v-loading="listLoading"
          node-key="_id"
          :props="defaultProps"
          draggable
          @node-drop="nodeDrop"
          :filter-node-method="filterNode"
          :highlight-current="true"
          :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span @click="() => nodeClick(node, data)" class="title"><li v-if="node.label" class="fa fa-sitemap"/><li v-else class="fa fa-share"/>{{data.desc}} {{ node.label }}</span>
        <span>
          <span class="info">{{ data.component }}</span>
          <el-button
            type="text"
            size="mini"
            @click="() => handleAppend(node, data)">
            <li class="fa fa-plus"/>
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => handleUpdate(data)">
            <li class="fa fa-pencil"/>
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => handleRemove(node, data)">
            <li class="fa fa-remove"/>
          </el-button>
        </span>
      </span>
        </el-tree>
      </el-col>
      <el-col :span="12" style="height: calc(100vh - 124px); overflow-y: auto">
        <obj-view :obj="currentNode" :props="viewProps" v-if="actionType=='view'"></obj-view>
        <h3 v-if="actionType=='add'"> 新建路由</h3>
        <h3 v-if="actionType=='edit'"> 编辑路由</h3>

        <el-form ref="form" label-width="120px" size="mini" v-if="actionType=='add' || actionType=='edit'">
          <el-form-item label="ParentId">
            {{newNode.parentId}}
          </el-form-item>
          <el-form-item label="Id">
            {{newNode._id}}
          </el-form-item>
          <el-form-item label="Path">
            <el-input v-model="newNode.path" type="text">
            </el-input>
          </el-form-item>
          <el-form-item label="Component">
            <el-select
              v-model="newNode.component"
              name="component" data-vv-as="Component" v-validate="'required'"
              filterable
              allow-create
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading">
              <el-option
                v-for="item in components"
                :key="item.id"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <error-tip :errs="errors" name="component"></error-tip>
          </el-form-item>
          <el-form-item label="Name">
            <el-input v-model="newNode.name" type="text">
            </el-input>
          </el-form-item>
          <el-form-item label="重定向 Redirect">
            <el-input v-model="newNode.redirect" type="text">
            </el-input>
          </el-form-item>
          <el-form-item label="别名 Alias">
            <el-input v-model="newNode.alias" type="text">
            </el-input>
          </el-form-item>
          <el-form-item label="Props">
            <el-input v-model="newNode.props" type="text">
            </el-input>
          </el-form-item>
          <el-form-item label="Meta">
            <el-form-item label="keepAlive">
              <el-switch v-model="newNode.meta.keepAlive"></el-switch>
            </el-form-item>
            <el-form-item label="Menu Title">
              <el-input v-model="newNode.meta.title" type="text">
              </el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              v-model="newNode.desc"
              type="textarea" :rows="1"
              :autosize="true">
            </el-input>
          </el-form-item>
          <el-form-item v-if="actionType=='add'">
            <el-button @click="actionType = 'none'" size="mini">取 消</el-button>
            <el-button type="primary" @click="append" size="mini">新 建</el-button>
          </el-form-item>
          <el-form-item v-if="actionType=='edit'">
            <el-button @click="actionType = 'none'" size="mini">取 消</el-button>
            <el-button type="primary" @click="update" size="mini">编 辑</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getTree, addItem, editItem, removeItem, editSort, removeChildren } from "./api"
  import { query as getComponents } from '@/views/sm/component/api'
  import errorTip from '@/components/Validate/errorTip'
  import objView from '@/components/Control/objView'

  export default {
    components: { objView, errorTip },
    data() {
      return {
        group: this.$route.params.group,
        actionType: 'none',
        metaOptions: ['keepAlive', 'requiresAuth'],
        filterText: '',
        isExpand: true,
        list: null,
        loading: false,
        listLoading: false,
        nodeObj: { path: '', component: '', name: '', parentId: '', redirect: '', alias: '', desc: '', meta: { keepAlive: false, title: '' }, sort: 0, group: 'default' },
        viewProps: ['_id', 'parentId', 'path', 'name', 'redirect', 'alias', 'component', 'meta', 'desc'],
        newNode: {},
        currentNode: {},
        defaultProps: {
          children: 'children',
          label: 'path'
        },
        components: []
      }
    },
    created() {
      this.fetchData()
    },
    activated() {
      if (this.group !== this.$route.params.group) {
        this.group = this.$route.params.group
        this.fetchData()
      }
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
      fetchComponents(query) {
        let objQuery = { query: '' }
        if (query !== '') {
          objQuery = { query: query }
        }
        this.loading = true
        getComponents(objQuery).then(res => {
          this.components = res.data.map(x => {
            return { label: x.name, value: x.name, id: x._id }
          })
          this.loading = false
        })
      },
      filterNode(value, data) {
        if (!value) return true
        return (data.path.indexOf(value) !== -1 || data.component.indexOf(value) !== -1)
      },
      expand() {
        this.isExpand = !this.isExpand
        for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
          this.$refs.tree.store._getAllNodes()[i].expanded = this.isExpand
        }
      },
      remoteMethod(query) {
        this.fetchComponents(query)
      },
      refresh() {
        this.fetchData()
      },
      handleReload() {
        this.$store.dispatch('SetReset', false).then((res) => {
          this.$router.push({ path: '/dev/router' })
        })
      },
      nodeClick(node, data) {
        this.actionType = 'view'
        this.currentNode = data
      },
      nodeDrop(node, parent, position) {
        // position : before、after、inner
        var data = node.data
        var sorts = []
        var index = 0
        var parentNode = {}

        if (position === 'before' || position === 'after') {
          parentNode = parent.parent
        } else if (position === 'inner') {
          parentNode = parent
        }

        sorts = parentNode.childNodes.map(item => {
          if (data._id === item.data._id) {
            const parentId = parentNode.parent == null ? 'root' : parentNode.data._id
            return { _id: item.data._id, sort: index++, parentId: parentId }
          } else {
            return { _id: item.data._id, sort: index++ }
          }
        })

        // 批量更新
        editSort(data._id, sorts).then(res => {
          //message(res.data)
        })
      },
      handleAddRoot() {
        const nodes = this.$refs.tree.children
        var sort = 0
        if (nodes && nodes.length > 0) {
          sort = nodes[nodes.length - 1].sort + 1
        }

        this.newNode = Object.assign({}, this.nodeObj, { path: '/new', component: '', name: '', parentId: 'root', redirect: '', desc: '', meta: { keepAlive: false, title: '' }, sort: sort, group: this.group })
        this.actionType = 'add'
      },
      handleAppend(node, data) {
        var sort = 0
        if (node.childNodes && node.childNodes.length > 0) {
          sort = node.childNodes[node.childNodes.length - 1].data.sort + 1
        }

        this.currentNode = data
        this.newNode = Object.assign({}, this.nodeObj, { path: data.path, parentId: data._id, sort: sort, group: this.group })
        this.actionType = 'add'
      },
      append() {
        addItem(this.newNode).then(res => {
          var node = res.data
          if (node.parentId === 'root') { //根节点
            this.$refs.tree.append(node)
          } else {
            if (!this.currentNode.children) {
              this.$set(this.currentNode, 'children', [])
            }
            this.currentNode.children.push(node)
          }

          this.newNode = {}
          this.actionType = 'none'
        })
      },
      handleUpdate(data) {
        if (!data.meta) {
          data.meta = { keepAlive: false }
        }
        this.currentNode = data
        this.newNode = Object.assign({}, this.currentNode)
        this.actionType = 'edit'
      },
      update() {
        // 先更新数据库
        editItem(this.newNode._id, this.newNode).then(res => {
          const data = res.data
          this.currentNode.path = data.path
          this.currentNode.name = data.name
          this.currentNode.alias = data.alias
          this.currentNode.props = data.props
          this.currentNode.redirect = data.redirect
          this.currentNode.meta = data.meta
          this.currentNode.group = data.group
          this.currentNode.component = data.component
          this.currentNode.parentId = data.parentId
          this.currentNode.desc = data.desc
          this.actionType = 'view'
        })
      },
      handleRemove(node, data) {
        this.$confirm('此操作将删除记录, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          this.remove(node, data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      remove(node, data) {
        removeChildren(data._id).then(res => {
          this.$message(`共删除 ${res.data.length} 条记录`)
          const parent = node.parent
          const children = parent.data.children || parent.data
          const index = children.findIndex(d => d._id === data._id)
          children.splice(index, 1)
        })
      },
      fetchData() {
        this.listLoading = true
        getTree(this.group).then(res => {
          this.list = res.data
          this.listLoading = false
        })
      }
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
