<template>
</template>

<script>
  import { getTree, editSort, addItem, editItem, removeChildren } from './api'
  import objView from '@/components/Control/objView'
  import validateBus from '@/views/bus/validate'
  import { message } from '@/utils'

  export default {
    components: {
      objView
    },
    data() {
      return {
        MODEL_NAME: null,
        group: this.$route.params.group,
        filterText: '',
        isExpand: true,
        list: null,
        listLoading: false,
        actionType: 'none',
        nodeObj: {
          name: '',
          label: '',
          parentId: '',
          group: 'default',
          desc: '',
          sort: 0
        },
        viewProps: ['_id', 'parentId', 'label', 'name', 'desc'],
        newNode: {},
        currentNode: {},
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    },
    created() {
    },
    activated() {
      this.group = this.$route.params.group
      this.fetchData()
    },
    computed: { },
    methods: {
      filterNode(value, data) {
        if (!value) return true
        return (data.label.indexOf(value) !== -1)
      },
      expand() {
        this.isExpand = !this.isExpand
        for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
          this.$refs.tree.store._getAllNodes()[i].expanded = this.isExpand
        }
      },
      refresh() {
        this.fetchData()
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
        editSort(this.MODEL_NAME, data._id, sorts).then(res => {
          // message(res.data)
        })
      },
      handleAddRoot() {
        const nodes = this.$refs.tree.children

        var sort = 0
        if (nodes && nodes.length > 0) {
          sort = nodes[nodes.length - 1].sort + 1
        }
        this.newNode = Object.assign({}, this.nodeObj, { parentId: 'root', sort: sort, group: this.group })
        this.actionType = 'add'
      },
      handleAppend(node, data) {
        var sort = 0
        if (node.childNodes && node.childNodes.length > 0) {
          sort = node.childNodes[node.childNodes.length - 1].data.sort + 1
        }

        this.currentNode = data
        this.newNode = Object.assign({}, this.nodeObj, {
          label: '',
          parentId: data._id,
          sort: sort,
          group: this.group
        })
        this.actionType = 'add'
      },
      append() {
        this.errors.clear()
        validateBus.$emit('validate') // 校验子组件
        // 更新数据库
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }
          if (result) {
            addItem(this.MODEL_NAME, this.newNode).then(res => {
              message(res)
              if (!res.success) {
                return
              }

              var node = res.data
              if (node.parentId === 'root') { // 根节点
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
          }
        })
      },
      handleUpdate(data) {
        this.currentNode = data
        this.newNode = Object.assign({}, this.nodeObj, this.currentNode)
        this.actionType = 'edit'
      },
      update() {
        this.errors.clear()
        validateBus.$emit('validate') // 校验子组件

        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return
          }
          if (result) {
            // 更新数据库
            editItem(this.MODEL_NAME, this.newNode._id, this.newNode).then(res => {
              const data = res.data
              for (const prop of this.viewProps) {
                this.currentNode[prop] = data[prop]
              }
              this.actionType = 'view'
            })
          }
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
        removeChildren(this.MODEL_NAME, data._id).then(res => {
          this.$message(`共删除 ${res.data.length} 条记录`)
          const parent = node.parent
          const children = parent.data.children || parent.data
          const index = children.findIndex(d => d._id === data._id)
          children.splice(index, 1)
        })
      },
      fetchData(group) {
        this.listLoading = true
        getTree(this.MODEL_NAME, this.group).then(response => {
          this.list = response.data
          this.listLoading = false
        })
      }
    }
  }
</script>
