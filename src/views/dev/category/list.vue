<template>
  <div class="app-container list">
    <el-row>
      <el-col :span="18">
        <div class="filter-container">

            <span>
                <el-input @keyup.enter.native="handleFilter" style="width: 200px;"
                          class="filter-item" placeholder="名称" v-model="objQuery[0].name.$regex" size="mini">
                </el-input>
            </span>


          <el-button class="filter-item" type="primary" icon="search" @click="handleFilter" size="mini">搜索</el-button>

        </div>
      </el-col>
      <el-col :span="6" style="text-align: right;" class="filter-container">

        <el-button @click="handleCreate" type="primary" icon="plus" style="margin-right: 10px;" size="mini">添加
        </el-button>

      </el-col>
    </el-row>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中"
              @sort-change="sortChange" fit highlight-current-row size="mini">

      <el-table-column align="center" type="index" label="序号" width="84">
      </el-table-column>


      <el-table-column key='name'
                       show-overflow-tooltip
                       label="名称" sortable="custom"
                       width="240" align="center" prop="name">
        <template slot-scope="scope">

          {{scope.row.name}}
        </template>
      </el-table-column>

      <el-table-column key='category'
                       show-overflow-tooltip
                       label="目录"
                       width="180" align="center" prop="category">
        <template slot-scope="scope">
          {{scope.row.directory}}
        </template>
      </el-table-column>

      <el-table-column key='desc'
                       show-overflow-tooltip
                       label="描述"
                       width="" align="center" prop="desc">
        <template slot-scope="scope">

          {{scope.row.desc}}
        </template>
      </el-table-column>


      <el-table-column label="操作" width="128" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="fa fa-edit" @click="handleUpdate(scope.row)" size="mini"> 修改</el-button>
          <el-button type="text" icon="fa fa-trash-o" @click="handleDelete(scope.row)" size="mini"> 删除</el-button>
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
  import {mapGetters} from 'vuex'
  import {get, post, del, getApi} from "@/views/dev/attachment/api"
  import { parseTime, message} from '@/utils'

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
        objQuery: [{name: {$regex: ''}}]
      };
    },
    created() {
      if (this.$route.query != null && this.$route.query.pageNo != null) {
        this.listQuery.pageNo = parseInt(this.$route.query.pageNo);
        this.listQuery.pageSize = parseInt(this.$route.query.pageSize);
        this.listQuery.order = parseInt(this.$route.query.order);
      }
      this.fetchData();
    },
    watch: {
      '$route'(to, from) {
        this.fetchData();
      }
    },
    computed: {
      ...mapGetters([
        'currentPath', 'params'
      ]),
      api() {
        return getApi()
      }
    },
    methods: {
      fetchData() {
        this.listLoading = true;
        var query = `api/category?pageNo=${this.listQuery.pageNo}&pageSize=${this.listQuery.pageSize}&sort=${this.listQuery.sort}&order=${this.listQuery.order}&search=${JSON.stringify(this.objQuery)}&isPaging=true`
        get(query).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.fetchData();
      },
      handleCreate() {
        this.$router.push({path: "/dev/category/add"});
      },
      handleUpdate(row) {
        this.$router.push({path: "/dev/category/edit/" + row._id});
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
      delete(row) {
        del('api/category/' + row._id).then(res => {
          console.log(res)
          message(res)
          if(res.success)
            this.fetchData();
        })
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val;
        this.fetchData();
      },
      sortChange(obj) {
        this.listQuery.sort = obj.prop;
        this.listQuery.order = obj.order == "ascending" ? 1 : -1;
        this.fetchData();
      },
      parseTime(value) {
        return parseTime(value);
      }
    }
  };
</script>
