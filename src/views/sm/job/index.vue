<template>
  <div class="app-container list">
    <el-row :gutter="30">
      <el-col :span="6">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini"></el-input>
      </el-col>
      <el-col :span="18">
        <el-button type="text" @click="reload" size="mini"> 刷新</el-button>
        <el-button type="text" @click="expand" size="mini"> 展开/收缩</el-button>
      </el-col>
    </el-row>

    <el-row :gutter="30">
      <el-col :span="6" style="height: calc(100vh - 124px); overflow-y: auto">
        <h3>机构</h3>
        <el-tree
          :data="list"
          ref="tree"
          v-loading="listLoading"
          node-key="_id"
          :props="treeProps"
          default-expand-all
          @node-click="nodeClick"
          :filter-node-method="filterNode"
          :highlight-current="true"
          :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span><li class="fa fa-sitemap"/> {{ node.label }}</span>
          </span>
        </el-tree>
      </el-col>
      <el-col :span="8" style="height: calc(100vh - 124px); overflow-y: auto">
        <h3>职务</h3>
        <section v-if="actionType=='view'">
          <span class="info">{{currentNode.fullName}}</span>
          <el-table :data="jobList"
                    :show-header="false"
                    v-loading.body="jobListLoading"
                    element-loading-text="拼命加载中"
                    fit
                    highlight-current-row
                    @current-change="handleCurrentChange"
                    size="mini">
            <el-table-column key='name'
                             show-overflow-tooltip
                             label="职务名称" sortable="custom"
                             align="left" prop="name">
              <template slot-scope="scope">
                <li class="fa fa-vcard info" />  {{scope.row.name}}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="72" align="right">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="handleUpdate(scope.row)">
                  <li class="fa fa-pencil"/>
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="handleDelete(scope.row)">
                  <li class="fa fa-remove"/>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            type="text"
            size="mini"
            @click="handleCreate">
            <li class="fa fa-plus"/> 添加
          </el-button>
        </section>
      </el-col>
      <el-col :span="10" style="height: calc(100vh - 124px); overflow-y: auto">
        <h3>成员</h3>
        <member-list ref="memberList" v-show="showMembers"></member-list>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {getTree} from '@/views/sm/organization/api'
  import {getAll} from '@/views/sm/job/api'
  import errorTip from '@/components/Validate/errorTip'
  import objView from '@/components/Control/objView'
  import memberList from '@/views/sm/jobUser/list'

  export default {
    components: {objView, errorTip, memberList},
    data() {
      return {
        group: this.$route.params.group,
        actionType: 'none',
        filterText: '',
        isExpand: true,
        list: null,
        loading: false,
        listLoading: false,
        nodeObj: {
          name: '',
          fullName: '',
          shortName: '',
          code: '',
          category: [],
          parentId: '',
          desc: '',
          attribute: {},
          sort: 0,
          group: 'default'
        },
        viewProps: ['fullName', 'shortName'],
        currentNode: {},
        treeProps: {
          children: 'children',
          label: 'fullName'
        },
        jobList: [],
        jobListLoading: false,
        showMembers: false
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
      this.fetchJobData()
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    },
    computed: {},
    methods: {
      handleCreate() {
        this.$router.push({path: '../add/' + this.currentNode._id})
      },
      handleUpdate(row) {
        this.$router.push({path: '../edit/' + row._id})
      },
      handleCurrentChange(val) {
        if (val) {
          this.showMembers = true
          this.$refs.memberList.id = val._id
          this.$refs.memberList.fetchData()
        } else {
          this.showMembers = false
        }
      },
      filterNode(value, data) {
        if (!value) return true
        return (data.fullName.indexOf(value) !== -1 || data.shortName.indexOf(value) !== -1)
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
      reload() {
        this.fetchData()
      },
      nodeClick(data) {
        this.actionType = 'view'
        this.currentNode = data
        this.fetchJobData()
      },
      fetchData() {
        this.listLoading = true
        getTree(this.group).then(res => {
          this.list = res.data
          this.listLoading = false
        })
      },
      fetchJobData() {
        this.jobListLoading = true
        getAll({}, [{name: 'refOrganization', value: this.currentNode._id}]).then(res => {
          this.jobList = res.data
          this.jobListLoading = false
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
