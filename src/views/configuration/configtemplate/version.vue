<template>
  <div class="app-container list">

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中"
              @sort-change="sortChange" fit highlight-current-row size="mini">

      <el-table-column align="center" type="index" label="序号" width="84">
      </el-table-column>


      <el-table-column key='name'
                       show-overflow-tooltip
                       label="版本号" sortable="custom"
                       width="" align="center" prop="name">
        <template slot-scope="scope">

          {{scope.row.disVer}}
        </template>
      </el-table-column>



      <el-table-column key='ip'
                       show-overflow-tooltip
                       label="发布日期"
                       width="156" align="center" prop="ip">
        <template slot-scope="scope">
          {{scope.row.datePublished}}
        </template>
      </el-table-column>


      <el-table-column label="操作" width="158" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="fa fa-edit" @click="handleRollback(scope.row)" size="mini"> 回退到此版本</el-button>
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
      import {getVersions ,rollback} from "@/views/configuration/configtemplate/api";
      export default {
        data() {
          return {
            id: this.$route.params.id,
            list: null,
            listLoading: true,
        total: null,
        listQuery: {
          page: 0,
          size: 10,
          sort: "id,desc",
          order: -1
        }
      };
    },
    computed: {
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.listLoading = true;
        getVersions(this.id,this.listQuery).then(response => {
          this.list = response.data.results;
          this.total = response.data.total;
          this.listLoading = false;
        });
      },
      handleFilter() {
        this.fetchData();
      },
      handleRollback(row) {
        this.$confirm('此操作将回退版本号, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          this.doRollback(row);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消回退'
          });
        });
      },
      doRollback(row) {
        rollback(this.id,row.id).then(response => {
          this.$message({
            type: 'success',
            message: '回退成功!'
        });
          this.$router.push('/configuration/configtemplate/editconfigs/'+this.$route.params.id);
      })
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
      },
    }
  };
</script>
