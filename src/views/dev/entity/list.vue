<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <span class="tagbtn ">模块：</span> <span class="tagbtn" :class="isActive(item.value)?'active':''"  v-for="item in modules" @click="filterModule(item.value)">{{item.text}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <div class="filter-container">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="名称"
                    v-model="objQuery[0].name.$regex" size="mini">
          </el-input>
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="描述"
                    v-model="objQuery[1].desc.$regex" size="mini">
          </el-input>
          <el-button class="filter-item" type="primary" icon="search" @click="handleFilter" size="mini">搜索</el-button>
        </div>
      </el-col>
      <el-col :span="8" style="text-align: right;">
        <el-button @click="handleCreate" type="primary" icon="plus" style="margin-right: 10px;" size="mini">添加</el-button>
      </el-col>
    </el-row>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中"
              @sort-change="sortChange" highlight-current-row size="mini">
      <el-table-column align="center" type='index' width="72" label="序号">
      </el-table-column>
      <el-table-column label="名称" sortable="custom" prop="name">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="显示" width="240" align="center" sortable="custom" prop="desc">
        <template slot-scope="scope">
          <span>{{scope.row.desc}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属模块" width="156" align="center" sortable="custom" prop="moduleName"
                       :filters="filters"
                       :filter-method="filterTag"
                       filter-placement="bottom-end">
        <template slot-scope="scope">
          <span>{{scope.row.moduleName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建者" width="128" align="center" sortable="custom" prop="createUser">
        <template slot-scope="scope">
          {{scope.row.createUser}}
        </template>
      </el-table-column>
      <el-table-column  label="操作" width="240" align="center" >
        <template slot-scope="scope">
          <el-button type="text" icon="fa fa-edit" @click="handleUpdate(scope.row)" size="mini"> 修改</el-button>
          <el-button type="text" icon="fa fa-trash-o" @click="handleDelete(scope.row)" size="mini"> 删除</el-button>
          <el-button type="text" icon="fa fa-cog" @click="handleView(scope.row)" size="mini"> 设置</el-button>
          <el-button type="text" icon="fa fa-lock" @click="handleLock(scope.row, true)" v-if="!scope.row.isLocked" size="mini"> 锁定</el-button>
          <el-button type="text" icon="fa fa-unlock-alt" @click="handleLock(scope.row, false)" v-if="scope.row.isLocked" style="color:#909399" size="mini"> 解锁</el-button>

        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange"
                     background
                     small
                     @current-change="handleCurrentChange" :current-page="listQuery.pageNo" :page-sizes="[10,20,30, 50]"
                     :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getList, removeItem,editItem } from "@/api/entity"
  import { getList as getModuleList } from "@/views/dev/module/api";
  import { parseTime } from '@/utils'
  export default {
    data() {
      return {
        list: null,
        listLoading: true,
        total: null,
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          sort: "_id",
          order: -1
        },
        objQuery: [
          {name: { $regex: '' }},
          {desc: { $regex: '' }},
          {module: { $regex: '' }}
        ],
        filters:[],
        modules:[],
        activeModule: "all"
      };
    },
    created() {
      this.initData();
      this.fetchModuleList();
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
          this.listLoading = false;
        });
      },
      fetchModuleList(){
        getModuleList({pageNo: 1, pageSize: 100, sort: "_id", order: -1 }, {name: { $regex: '' }}).then(response => {
          this.filters = response.data.results.map(item=>{return {value:item.value, text:item.name}});
          this.modules = response.data.results.map(item=>{return {value:item.value, text:item.name}});
          this.modules.unshift({value: 'all', text: '全部'})
        });
      },
      filterModule(val){
        this.activeModule = val
        if(val=='all')
          this.objQuery[2].module = { $regex: '' }
        else
          this.objQuery[2].module = val
        this.initData()
        //console.log(this.objQuery)
      },
      isActive(val) {
        return val === this.activeModule
      },
      handleFilter() {
        this.loadData()
      },
      handleCreate() {
        this.$router.push({ path: 'add'})
      },
      handleView(row) {
        this.$router.push({ path: 'view/' + row.id + '/baisc'})
      },
      handleUpdate(row) {
        this.$router.push({ path: 'edit/' + row.id})
      },
      handleLock(row, isLocked) {
        editItem(row.id, {"isLocked": isLocked}).then(response => {
          row.isLocked = isLocked;
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 2000
          });
        });
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
      delete(row){
        removeItem(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadData()
        })
      },
      handleFieldsSetting(entityid) {
        this.$router.push({ path: '../field/setting/' + entityid})
      },
      handlePageSetting(entityid) {
        this.$router.push({ path: '../page/list/' + entityid})
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.loadData()
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val
        this.loadData()
      },
      sortChange(obj) {
        this.listQuery.sort = obj.prop
        this.listQuery.order = obj.order == "ascending" ? 1 : -1
        this.loadData()
      },
      filterTag(value, row) {
        return row.module === value
      },
      parseTime(value) {
        return parseTime(value)
      }
    }
  }
</script>
<style scoped>
  .tagbtn.active {
    font-size: 12px;
    padding: 0 3px;
    border-radius: 0;
    margin: 11px 10px 11px 8px;
  }

  .tagbtn {
    font-size: 12px;
    margin-right: 18px;
    background: #fff;
    line-height: 20px;
    cursor: pointer;
    display: inline-block;
    color: #5a5e66;
  }
  .tagbtn.active {
    background: #39b2dc;
    color: #fff;
    line-height: 20px!important;
  }
</style>
