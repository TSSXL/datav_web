<template>
  <div class="app-container">

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中"
       highlight-current-row size="mini">
      <el-table-column label="配置项名称" sortable prop="name">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="修改前" width="180" align="center" prop="desc">
        <template slot-scope="scope">
          <span>{{scope.row.oldValue}}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改后" width="180" align="center" prop="template">
        <template slot-scope="scope">
          {{scope.row.value}}
        </template>
      </el-table-column>
      <el-table-column label="备注" width="140" align="center" prop="template">
        <template slot-scope="scope">
          {{scope.row.memo}}
        </template>
      </el-table-column>
      <el-table-column label="修改人" width="100" align="center" prop="template">
        <template slot-scope="scope">
          {{scope.row.modifier}}
        </template>
      </el-table-column>
      <el-table-column label="修改时间" width="180" align="center" prop="template">
        <template slot-scope="scope">
          {{scope.row.dateModified}}
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNo" :page-sizes="[10,20,30, 50]"
                     :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {getList} from "@/views/configuration/page/api";

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
      listQuery: {
        page: 0,
        size: 10,
        sort: "dateModified,desc"
      },
      objQuery: [
        {name: ''}
      ]
    };
  },
  props: {
    url:{type:String}
  },
  created() {
    this.fetchData();
  },
  watch: {
    '$route' (to, from) {
      this.fetchData();
    }
  },
  methods: {
    fetchData() {
      this.listLoading=true;
      getList(this.url,'post',this.listQuery, this.objQuery[0]).then(response => {
        this.list = response.data.results;

        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleFilter(name) {
      this.listQuery.page=0
      this.objQuery[0].name=name
      this.fetchData();
    },
    handleSizeChange(val) {
      this.listQuery.size = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val-1;
      this.fetchData();
    },
    sortChange(obj) {
      //console.log(obj);
    }
  }
};
</script>
<style scoped>
  .app-container {
    padding-top: 0px;
}
</style>
