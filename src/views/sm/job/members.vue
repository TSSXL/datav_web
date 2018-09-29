<template>
  <div class="app-container view">
    <el-form ref="form" label-width="120px" size="mini">
      <el-form-item label="Name">
        {{job.name}}
      </el-form-item>
      <el-form-item label="Organization">
        {{job.refOrganization}}
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-tree
          ref="tree"
          show-checkbox
          lazy
          :load="loadNode"
          node-key="_id"
          :props="defaultProps">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span><li v-if="data.type === 'user'" class="fa fa-user"/><li v-else
                                                                      class="fa fa-sitemap"/>  {{ node.label }}</span>
      </span>
        </el-tree>
      </el-col>
      <el-col :span="16">
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {getItem} from '@/views/sm/job/api'
  import {getChildren as getOrgChildren} from '@/views/sm/organization/api'
  import {getChildren as getUserChildren} from '@/views/sm/user/api'
  import {paging, queries, setSort} from '@/utils'

  export default {
    conponents: { },
    data() {
      return {
        id: this.$route.params.id,
        group: 'government',
        job: {},
        treeData: [],
        list: null,
        listLoading: true,
        total: null,
        paging: paging(),
        queries: queries(),
        defaultProps: {
          children: 'children',
          label: 'fullName',
          isLeaf: 'leaf'
        }
      }
    },
    created() {

    },
    activated() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getItem(this.id).then(res => {
          this.job = res.data
        })
      },
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes(true))
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          getOrgChildren(this.group, 'root').then(res => {
            this.treeData = res.data
            var data = this.treeData.map(x => {
              return {fullName: x.fullName, _id: x._id, type: 'org', disabled: true}
            })
            return resolve(data)
          })
        }
        if (node.level > 0) {
          getOrgChildren(this.group, node.data._id).then(res => {
            this.treeData = res.data
            getUserChildren(node.data._id).then(users => {
              var data = this.treeData.map(x => {
                return {fullName: x.fullName, _id: x._id, type: 'org', disabled: true}
              })
              if (users && users.data) {
                for (const user of users.data) {
                  data.push({fullName: user.account, _id: user._id, type: 'user', leaf: true})
                }
              }
              return resolve(data)
            })
          })
        }
      },
      onSubmit() {
        /*
        editItem(this.id, this.job).then(res => {
          this.$router.go(-1)
        })
        */
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
