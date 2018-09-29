
<template>
  <div class="app-container list">
    <el-row>
      <el-col :span="18">
        <div class="filter-container">

            <span>
                <el-input @keyup.enter.native="handleFilter" style="width: 200px;"
                  class="filter-item" placeholder="项目名" v-model="objQuery[0].projectName.$regex" size="mini">
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


      <el-table-column key='groupName'
        show-overflow-tooltip
        label="组名"
        width="100" align="center" prop="groupName">
        <template slot-scope="scope">

            {{scope.row.groupName}}
        </template>
      </el-table-column>

      <el-table-column key='projectName'
        show-overflow-tooltip
        label="项目名"
        width="200" align="center" prop="projectName">
        <template slot-scope="scope">

            {{scope.row.projectName}}
        </template>
      </el-table-column>

      <el-table-column key='projectUrl'
        show-overflow-tooltip
        label="项目地址"
        width="" prop="projectUrl">
        <template slot-scope="scope">

            {{scope.row.projectUrl}}
        </template>
      </el-table-column>


      <el-table-column  label="操作" width="180" align="center" >
        <template slot-scope="scope">
          <el-button type="text" icon="fa fa-send" @click="handleDeploy(scope.row,scope.$index)" size="mini" title="部署项目" v-if="!isPublishs[scope.$index]"> 部署</el-button>
          <el-button type="text" icon="fa fa-spinner fa-spin" size="mini" :disabled="true" v-else> 部署中</el-button>
          <el-button type="text" icon="fa fa-edit" @click="handleUpdate(scope.row)" size="mini"> 修改</el-button>
          <el-button type="text" icon="fa fa-trash-o" @click="handleDelete(scope.row)" size="mini"> 删除</el-button>
        </template>
      </el-table-column>

    </el-table>


    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNo" :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getList, removeItem,deployItem } from "./api"
import { parseTime } from '@/utils'
import Vue from 'vue';

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      total: null,
      isPublishs:[],
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        sort: "_id",
        order: -1
      },
      objQuery: [
        {projectName: { $regex: '' }}
      ]
    };
  },
  created() {
    this.initData();
  },
  computed: {
      ...mapGetters([
          'currentPath','params'
      ]),
  },
  methods: {
    initData(){
        if(this.$route.path === this.currentPath){
            if(this.params.listQuery != null)
                this.listQuery = this.params.listQuery;
            if(this.params.objQuery != null)
                this.objQuery = this.params.objQuery;
        }else{
            this.$store.dispatch('SetQuery',{
                listQuery: null,
                objQuery: null
            });
        }
        this.$store.dispatch('SetCurrentPath', this.$route.path);
        this.fetchData();
    },
    loadData(){
        this.$store.dispatch('SetQuery',{
            listQuery: this.listQuery,
            objQuery: this.objQuery
        });
        this.fetchData();
    },
    fetchData() {
      this.listLoading = true;
      getList(this.listQuery, this.objQuery).then(response => {
        this.list = response.data.results;
        this.total = response.data.total;
        this.isPublishs = [];
        for(let row of this.list)
          this.isPublishs.push(false);
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.loadData();
    },
    handleCreate() {
      this.$router.push({ path: "/dev/project/add" });
    },
    handleDeploy(row,rowIndex){
      this.$confirm('此操作将部署项目, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'info',
        center: true
      }).then(() => {
        this.isPublishs[rowIndex] = true;
        Vue.set(this.isPublishs, rowIndex, this.isPublishs[rowIndex]);
        deployItem(row).then(response => {
          this.$notify({
            title: '成功',
            message: '项目部署成功',
            type: 'success',
            duration: 2000
          });
          row.projectUrl = response.data.project_url;
          this.isPublishs[rowIndex] = false;
          Vue.set(this.isPublishs, rowIndex, this.isPublishs[rowIndex]);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消部署'
        });
      });
    },
    handleUpdate(row) {
      this.$router.push({ path: "/dev/project/edit/" + row.id });
    },
    handleDelete(row) {
      this.$confirm('此操作将删除记录, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
        center: true
      }).then(() => {
        this.delete(row);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    delete(row){
      removeItem(row.id).then(response => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        const index = this.list.indexOf(row);
        this.list.splice(index, 1);
      });
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val;
      this.loadData();
    },
    sortChange(obj){
      this.listQuery.sort = obj.prop;
      this.listQuery.order = obj.order == "ascending" ? 1 : -1;
      this.loadData();
    },
    parseTime(value){
      return parseTime(value);
    }
  }
};
</script>
