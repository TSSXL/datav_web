<template>
  <div>
    <div>
      <span v-if="relation == null || relation.id == null">
        请 <el-button @click="handleEditEntity" type="text">选择</el-button> 关联的实体
      </span>
      <span v-if="relation != null && relation.id != null">
        <el-popover
          ref="entity"
          placement="top-start"
          :title="relation.desc"
          width="200"
          trigger="hover"
          :content="relation.name">
        </el-popover>
        <el-tag v-popover:entity>{{relation.desc}}</el-tag>
      </span>
      <el-button v-show="relation != null && relation.id != null && !editEntity" @click="handleEditEntity" type="text">
        修改
      </el-button>
      <el-button v-show="editEntity" @click="handleEditEntity" type="text">收起</el-button>
    </div>
    <section v-show="editEntity">

      <div class="filter-container">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="名称"
                  v-model="objQuery[0].name.$regex">
        </el-input>
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="描述"
                  v-model="objQuery[1].desc.$regex">
        </el-input>
        <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
      </div>


      <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中"
                highlight-current-row
                @sort-change="sortChange" fit
                size="mini"
                width="100%">
        <el-table-column align="center" type="index" label="序号" width="96">
        </el-table-column>
        <el-table-column label="名称" sortable="custom" prop="name">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column label="显示" width="120" align="center" sortable="custom" prop="desc">
          <template slot-scope="scope">
            <span>{{scope.row.desc}}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属模块" width="126" align="center" sortable="custom" prop="moduleName"
                         :filters="filters"
                         :filter-method="filterTag"
                         filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag>{{scope.row.moduleName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="选择" width="48" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-check" @click="handleSelect(scope.row)" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div v-show="!listLoading" class="pagination-container">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="listQuery.pageNo" :page-sizes="[5,10,20,30,50]"
                       :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </section>
  </div>
</template>

<script>
  import {getList} from "@/api/entity"
  import {parseTime} from '@/utils'

  export default {
    props: {
      relation: {type: Object}
    },
    data() {
      return {
        list: null,
        listLoading: true,
        total: null,
        editEntity: false,
        listQuery: {
          pageNo: 1,
          pageSize: 5,
          sort: "_id",
          order: -1
        },
        objQuery: [
          {name: {$regex: ''}},
          {desc: {$regex: ''}}
        ],
        filters: [{text: '数据库注册', value: '数据库注册'}, {text: 'IT设备注册', value: 'IT设备注册'}]
      };
    },
    created() {
      this.fetchData();
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
      handleEditEntity() {
        this.editEntity = !this.editEntity;
      },
      handleSelect(val) {
        this.relation.id = val.id;
        this.relation.module = val.module;
        this.relation.name = val.name;
        this.relation.desc = val.desc;
        this.editEntity = !this.editEntity;
      },
      handleFilter() {
        this.fetchData();
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
      filterTag(value, row) {
        return row.moduleName === value;
      },
      parseTime(value) {
        return parseTime(value);
      }
    }
  };
</script>
