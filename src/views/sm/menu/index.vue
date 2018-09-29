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
      <el-col :span="12" style="height: calc(100vh - 148px); overflow-y: auto">
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
        <span @click="() => nodeClick(node, data)"><li :class="data.icon"/> {{ node.label }}</span>
        <span>
          <span class="info">{{ data.redirect ? data.redirect: data.router.join('/') }} <li v-if="data.redirect" class="fa fa-share"/>  </span>
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
      <el-col :span="12" style="height: calc(100vh - 148px); overflow-y: auto">
        <obj-view :obj="currentNode" :props="viewProps" v-if="actionType=='view'"></obj-view>
        <span v-if="actionType=='add'">
          <span style="font-size: 14px;"> 新建菜单</span>
        </span>
        <span v-if="actionType=='edit'">
          <span style="font-size: 14px;"> 编辑菜单</span>
        </span>
        <el-form ref="form" label-width="120px" size="mini" v-if="actionType=='add' || actionType=='edit'">
          <el-form-item label="Parent">
            {{newNode.parentId}}
          </el-form-item>
          <el-form-item label="Label">
            <el-input v-model="newNode.label" type="text" name="label" data-vv-as="Label" v-validate="'required'">
            </el-input>
            <error-tip :errs="errors" name="label"></error-tip>
          </el-form-item>
          <el-form-item label="Name">
            <el-input v-model="newNode.name" type="text"></el-input>
          </el-form-item>
          <el-form-item label="Redirect">
            <el-input v-model="newNode.redirect" type="text"></el-input>
          </el-form-item>
          <el-form-item label="Target">
            <el-radio-group v-model="newNode.target">
              <el-radio-button label="_blank">新窗口</el-radio-button>
              <el-radio-button label="_self">本窗口</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Router">
            <el-cascader
              :options="routers"
              clearable
              change-on-select
              v-model="newNode.router"
              :props="routerProps"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="icon">
            <el-input v-model="newNode.icon" type="text"></el-input>
            <fa-select v-model="newNode.icon"></fa-select>
          </el-form-item>
          <el-form-item label="hidden">
            <el-switch v-model="newNode.hidden" size="mini"></el-switch>
          </el-form-item>
          <el-form-item label="disabled">
            <el-switch v-model="newNode.disabled" size="mini"></el-switch>
          </el-form-item>
          <el-form-item label="dropdown">
            <el-switch v-model="newNode.dropdown" size="mini"></el-switch>
          </el-form-item>
          <el-form-item label="Type">
            <el-input v-model="newNode.type" type="text"></el-input>
          </el-form-item>
          <el-form-item label="group">
            {{newNode.group}}
          </el-form-item>
          <el-form-item label="desc">
            <el-input v-model="newNode.desc" type="text"></el-input>
          </el-form-item>
          <el-form-item v-if="actionType=='add'">
            <el-button @click="addDialogVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="append" size="mini">新 建</el-button>
          </el-form-item>
          <el-form-item v-if="actionType=='edit'">
            <el-button @click="editDialogVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="update" size="mini">编 辑</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getTree, editSort, addItem, editItem, removeItem, removeChildren } from './api'
  import { getTree as getRouters } from '@/views/sm/router/api'
  import { exist as routerExist} from '@/views/sm/dataGroup/api' // 路由
  import objView from '@/components/Control/objView'
  import errorTip from "@/components/Validate/errorTip";
  import faSelect from "@/components/Font-awesome/faSelect"
  import { message } from '@/utils'

  export default {
    components: {
      objView, errorTip, faSelect
    },
    data() {
      return {
        group: this.$route.params.group,
        filterText: '',
        isExpand: true,
        list: null,
        listLoading: false,
        actionType: 'none',
        nodeObj: {
          parentId: '',
          label: '',
          name: '',
          redirect: '',
          target: '_self',
          router: [],
          icon: 'fa fa-sitemap',
          hidden: false,
          disabled: false,
          dropdown: true,
          type: '',
          group: 'default',
          desc: '',
          sort: 0
        },
        viewProps: ['_id', 'parentId', 'label', 'name', 'router', 'redirect', 'target', 'hidden', 'dropdown', 'desc'],
        newNode: {},
        currentNode: {},
        objQuery: [{path: {$regex: ''}}],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        routerProps: {
          label: 'path',
          value: 'path',
          children: 'children'
        },
        routers: []
      }
    },
    created() {
      this.fetchData()
      this.getRouterOptions()
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
      getRouterOptions() {
        let routerGroup = this.group
        routerExist('router', routerGroup).then(exist => {
          if(!exist.data) {
            routerGroup = 'default'
          }
          getRouters(routerGroup).then(response => {
            this.routers = response.data
          })
        })
      },
      refresh() {
        this.fetchData()
      },
      handleReload() {
        this.$store.dispatch('GenerateMenus', this.list).then((res) => {
          this.$parent.getSideMenus()
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
            return {_id: item.data._id, sort: index++, parentId: parentId}
          } else {
            return {_id: item.data._id, sort: index++}
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

        this.newNode = Object.assign({}, this.nodeObj, { label: 'Root', value: 'root', parentId: 'root', sort: sort, group: this.group })
        this.actionType = 'add'
      },
      handleAppend(node, data) {
        var sort = 0
        if (node.childNodes && node.childNodes.length > 0) {
          sort = node.childNodes[node.childNodes.length - 1].data.sort + 1
        }

        this.currentNode = data
        this.newNode = Object.assign({}, this.nodeObj, {
          label: 'new menu',
          parentId: data._id,
          sort: sort,
          group: this.group
        })
        this.actionType = 'add'
      },
      append() {
        // 先更新数据库
        addItem(this.newNode).then(res => {
          var node = res.data
          if (node.parentId == 'root') { //根节点
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
        this.currentNode = data
        this.newNode = Object.assign({}, this.currentNode)
        this.actionType = 'edit'
      },
      update() {
        // 先更新数据库
        editItem(this.newNode._id, this.newNode).then(res => {
          const data = res.data
          this.currentNode.label = data.label
          this.currentNode.name = data.name
          this.currentNode.redirect = data.redirect
          this.currentNode.target = data.target
          this.currentNode.icon = data.icon
          this.currentNode.hidden = data.hidden
          this.currentNode.disabled = data.disabled
          this.currentNode.dropdown = data.dropdown
          this.currentNode.type = data.type
          this.currentNode.parentId = data.parentId
          this.currentNode.group = data.group
          this.currentNode.router = data.router
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
        getTree(this.group).then(response => {
          this.list = response.data
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
