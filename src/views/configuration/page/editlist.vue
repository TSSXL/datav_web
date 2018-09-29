<template>
  <div class="app-container">

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中"
      highlight-current-row size="mini">
      <el-table-column label="配置项名称" sortable prop="name">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="配置项值" width="100" align="center" prop="desc">
        <template slot-scope="scope">
          <span>{{scope.row.value}}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="160" align="center" prop="template">
        <template slot-scope="scope">
          {{scope.row.memo}}
        </template>
      </el-table-column>
      <el-table-column label="修改人" width="100" align="center" prop="template">
        <template slot-scope="scope">
          {{scope.row.modifer}}
        </template>
      </el-table-column>
      <el-table-column label="修改时间" width="180" align="center" prop="template">
        <template slot-scope="scope">
          {{scope.row.dateModified}}
        </template>
      </el-table-column>
      <el-table-column  label="操作" width="130" align="center" >
        <template slot-scope="scope">
          <el-button type="text" icon="fa fa-edit" @click="handleUpdate(scope.row)" size="mini"> 修改</el-button>
          <el-button type="text" icon="fa fa-trash-o" @click="handleDelete(scope.row)" size="mini"> 删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import {getList,remove} from "@/views/configuration/page/api";
export default {
  data() {
    return {
      list: null,
      entity:{
        isLocked:false
      },
      listLoading: false,
      total: null,
      multipleSelection: [],
      objQuery: [
        {name: { $regex: '' }}
      ]
    };
  },
  props: {
    url:{type:String},
    editurl:{type:String}
    },
    created() {
      this.fetchData("");
    },
    methods: {
      fetchData(name) {

        this.listLoading = true;
        getList(this.url + '/',"get", undefined, this.objQuery).then(response => {
          console.log("过滤内容"+name);
          this.list = response.data.filter(value=>value.name.indexOf(name)>-1);
          /*const config = CONFIG_LIST.find(value => value.id == configId)
           config.environments = config.environments.filter(
           value => value.id != environmentId)*/
          this.listLoading = false;
        })
      ;
    },
    handleUpdate(item){
      //add(this.url,)
      console.log(this.editurl);
      this.$router.push(this.editurl + item.name);
    },delete(item){
      remove(this.url + '/' + item.name).then(response => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.fetchData("")
      })
    },
    handleDelete(item){
      this.$confirm('此操作将删除记录, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
        center: true
      }).then(() => {
        this.delete(item);
    }).catch(() => {
        this.$message({
        type: 'info',
        message: '已取消删除'
      });
    });

    },
    handleFilter(name){
      this.fetchData(name);
    }
  }
};
</script>
<style scoped>
  .app-container {
    padding-top: 0px;
}
</style>
