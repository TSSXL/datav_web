 
<template>
  <div class="app-container list">
    <el-row>         
      <el-col :span="18">        
        <div class="filter-container">
          
            <span>
                <el-input @keyup.enter.native="handleFilter" style="width: 200px;" 
                  class="filter-item" placeholder="标识" v-model="objQuery[0].key.$regex" size="mini">
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
      
      
      <el-table-column key='key' 
        show-overflow-tooltip
        label="标识" sortable="custom"
        width="120" align="center" prop="key">
        <template slot-scope="scope">  
           
            {{scope.row.key}} 
        </template>
      </el-table-column>
      
      <el-table-column key='url' 
        show-overflow-tooltip
        label="地址" 
        width="" align="center" prop="url">
        <template slot-scope="scope">  
           
            {{scope.row.url}} 
        </template>
      </el-table-column>
      
       
      <el-table-column  label="操作" width="128" align="center" >
        <template slot-scope="scope"> 
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
import { getList, removeItem } from "./api"
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
        
        {key: { $regex: '' }},
        
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
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.loadData();
    },
    handleCreate() {
      this.$router.push({ path: "/dev/serviceaddr/add" });
    },
    handleUpdate(row) {
      this.$router.push({ path: "/dev/serviceaddr/edit/" + row.id });
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
