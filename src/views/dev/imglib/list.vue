
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="18">
        <div class="filter-container">

            <span>
                <el-input @keyup.enter.native="handleFilter" style="width: 200px;"
                  class="filter-item" placeholder="图片名称" v-model="objQuery[0].filename.$regex" size="small">
                </el-input>
            </span>


            <el-button class="filter-item" type="primary" icon="search" @click="handleFilter" size="small">搜索</el-button>

        </div>
      </el-col>
      <el-col :span="6" style="text-align: right;" class="filter-container">

          <el-button @click="handleCreate" type="primary" icon="plus" style="margin-right: 10px;" size="small">添加</el-button>

      </el-col>
    </el-row>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中"
      @sort-change="sortChange" fit highlight-current-row size="mini">

        <el-table-column align="center" type="index" label="序号" width="84">
        </el-table-column>

      <el-table-column key='img'
        label="图片"
        width="120" align="center" prop="img">
        <template slot-scope="scope">
           <img :src="'http://localhost:3000/' + scope.row.filename" alt="" width="32"/>
        </template>
      </el-table-column>

      <el-table-column key='filename'
        label="图片名称" sortable="custom"
        width="" align="center" prop="filename">
        <template slot-scope="scope">
            {{scope.row.filename}}
        </template>
      </el-table-column>

      <el-table-column key='originalname'
        label="原始图片名"
        width="120" align="center" prop="originalname">
        <template slot-scope="scope">

            {{scope.row.originalname}}
        </template>
      </el-table-column>

      <el-table-column key='mimetype'
        label="mimetype"
        width="120" align="center" prop="mimetype">
        <template slot-scope="scope">

            {{scope.row.mimetype}}
        </template>
      </el-table-column>

      <el-table-column key='size'
        label="size"
        width="120" align="center" prop="size">
        <template slot-scope="scope">

            {{scope.row.size}}
        </template>
      </el-table-column>


      <el-table-column  label="操作" width="128" align="center" >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="handleUpdate(scope.row)" size="mini"></el-button>
          <el-button type="primary" icon="el-icon-delete" @click="handleDelete(scope.row)" size="mini"></el-button>
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
import { getList, removeItem } from "@/views/dev/imglib/api"
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

        {filename: { $regex: '' }},

      ]
    };
  },
  created() {
    if(this.$route.query != null && this.$route.query.pageNo != null){
      this.listQuery.pageNo = parseInt(this.$route.query.pageNo);
      this.listQuery.pageSize = parseInt(this.$route.query.pageSize);
      this.listQuery.order = parseInt(this.$route.query.order);
    }
    this.fetchData();
  },
  watch: {
    '$route' (to, from) {
      this.fetchData();
    }
  },
  computed: {
    ...mapGetters([
      'currentPath','params'
    ]),
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
    handleCreate() {
      this.$router.push({ path: "/dev/imglib/add" });
    },
    handleUpdate(row) {
      this.$router.push({ path: "/dev/imglib/edit/" + row.id });
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
      this.fresh();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val;
      this.fresh();
    },
    sortChange(obj){
      this.listQuery.sort = obj.prop;
      this.listQuery.order = obj.order == "ascending" ? 1 : -1;
      this.fresh();
    },
    parseTime(value){
      return parseTime(value);
    },
    fresh(){
      //刷新数据
      let path = this.$route.path;
      let query = Object.assign({}, this.listQuery);
      this.$router.push({path, query});
    }
  }
};
</script>
