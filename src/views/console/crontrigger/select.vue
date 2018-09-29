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

      </el-col>
    </el-row>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中"
              @sort-change="sortChange" fit highlight-current-row size="mini">

      <el-table-column align="center" type="index" label="序号" width="84">
      </el-table-column>


      <el-table-column key='name'
                       show-overflow-tooltip
                       label="名称" sortable="custom"
                       width="" align="center" prop="name">
        <template slot-scope="scope">

          {{scope.row.name}}
        </template>
      </el-table-column>

      <el-table-column key='cronExpressions'
                       show-overflow-tooltip
                       label="cron表达式"
                       width="160" align="center" prop="cronExpressions">
        <template slot-scope="scope">

          {{scope.row.cronExpressions}}
        </template>
      </el-table-column>


      <el-table-column label="操作" width="128" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="fa fa-check" @click="handleSelect(scope.row)" size="mini"> 选择</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNo" :page-sizes="[5, 10,20,30, 50]"
                     :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {getList} from "./api"
  import {parseTime} from '@/utils'

  export default {
    props: {
      value: {type: Object},
      visible: {type: Boolean}
    },
    data() {
      return {
        list: null,
        listLoading: true,
        total: null,
        listQuery: {
          pageNo: 1,
          pageSize: 5,
          sort: "_id",
          order: -1
        },
        objQuery: [{name: {$regex: ''}}]
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
        this.$router.push({path: "/console/crontrigger/add"});
      },
      handleSelect(row) {
        this.value.cron = row.cronExpressions;
        this.value.desc = row.name;
        this.$emit('closeDialog')
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val;
        this.fresh();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val;
        this.fresh();
      },
      sortChange(obj) {
        this.listQuery.sort = obj.prop;
        this.listQuery.order = obj.order == "ascending" ? 1 : -1;
        this.fresh();
      },
      parseTime(value) {
        return parseTime(value);
      },
      fresh() {
        //刷新数据
        let path = this.$route.path;
        let query = Object.assign({}, this.listQuery);
        this.$router.push({path, query});
      }
    }
  };
</script>
