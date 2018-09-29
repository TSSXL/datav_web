 
<template>
  <div class="app-container list">
    <section  v-if="total&&total>0">
      <el-row>         
        <el-col :span="18">        
          <div class="filter-container">          
            <span>
              <el-input @keyup.enter.native="handleFilter" style="width: 200px;" 
                class="filter-item" placeholder="系统名称" v-model="objQuery[0].name.$regex">
              </el-input>
            </span>
            <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>                
          </div>
        </el-col>
        <el-col :span="6" style="text-align: right;" class="filter-container">         
            <el-button @click="handleCreate" type="primary" icon="plus" style="margin-right: 10px;">添加</el-button>         
        </el-col>
      </el-row>

      <section>
        <div class="system-box" v-for="item in list" :key="item.id">
          <img v-if="item.icon&&item.icon.length>0" :src="item.icon[0].url" class="image">
          <div class="title"><el-button type="text" @click="handleView(item.id)">{{item.name}}</el-button></div>
        </div>
      </section>

      <div v-if="listQuery.pageSize < total" v-show="!listLoading" class="pagination-container">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNo" :page-sizes="[10,20,30,50]"
          :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </section>

    <section v-else>
      <div tabindex="0" class="create-button-card" style="margin-bottom: 12px; margin-left:auto; margin-right:auto;" @click="handleCreate">        
        <div style="padding-top:24px;"><i class="el-icon-plus"></i></div>
        <el-button type="text">系统注册</el-button>
      </div>
      <el-alert        
        title="开始注册系统吧"
        type="info"
        description="您还没有注册系统，现在就注册一个吧，开始奇妙的数据智慧之旅！"
        show-icon>
      </el-alert>
    </section>
    
  </div>
</template>

<script>
import { getList, removeItem } from "./api"
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      total: null,
      listQuery: {
        pageNo: 1,
        pageSize: 30,
        sort: "_id",
        order: -1
      },
      objQuery: [        
        {name: { $regex: '' }},        
      ]
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    ...mapGetters([
      'appid'
    ])
  },
  methods: {
    fetchData() {      
      this.listLoading = true;
      getList(this.listQuery, this.objQuery).then(response => {
        this.list = response.data.results;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.fetchData();
    },
    handleView(id){
      this.$store.dispatch('SetAppId', id).then((res) => {});
      this.$router.push({ path: "/app/nav/detail"});
    },
    handleCreate() {
      this.$router.push({ path: "/sys/system/add" });
    },
    handleUpdate(row) {
      this.$router.push({ path: "/sys/system/edit/" + row.id });
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
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val;
      this.fetchData();
    },
    sortChange(obj){
      this.listQuery.sort = obj.prop;
      this.listQuery.order = obj.order == "ascending" ? 1 : -1;
      this.fetchData();
    },
    parseTime(value){
      return parseTime(value);
    }
  }
};
</script>
<style scoped>
  .system-box {
    height: 100px;
    width: 200px;
    overflow: hidden;
    position: relative;    
    color: #1f2d3d;
    text-align: center;
    line-height: 32px;
    padding-bottom: 36px;
    box-sizing: border-box;
    display: inline-block;
    margin-right: 17px;
    margin-bottom: 32px;
    border-radius: 4px;
}

.system-box .image{
  max-width: 86px;
  max-height: 60px;
}

.system-box .title{

}
</style>