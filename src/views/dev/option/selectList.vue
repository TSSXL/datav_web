
<template>
  <div>
    <div>
      <span v-if="!selected">
        请 <el-button @click="handleEditOption" type="text">选择</el-button> 选项
      </span>
      <span v-if="selected">
        <el-popover
          ref="currentOption"
          placement="top-start"
          :title="option.option.desc"
          width="200"
          trigger="hover"
          :content="'ID:' + option.option.id + ' NAME:' + option.option.name">
        </el-popover>
        <el-tag v-popover:currentOption>{{option.option.desc}}</el-tag>
      </span>
      <el-button v-show="selected && !editOption" @click="handleEditOption" type="text">修改</el-button>
      <el-button v-show="editOption" @click="handleEditOption" type="text">收起</el-button>
    </div>

    <section v-show="editOption">
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
        @sort-change="sortChange"
        @expand-change="handleExpandChange"
        highlight-current-row
        size="mini">
        <el-table-column type="expand" width="56">
          <template slot-scope="props">
            <options-view v-if="props.row.type=='standard'" :options="props.row.options"/>
            <options-tree-view :treeid="props.row.name" v-if="props.row.type=='tree'" :options="props.row.options"/>
          </template>
        </el-table-column>

        <el-table-column  label="选择" width="48" align="center" >
          <template slot-scope="scope">
            <el-button type="text" @click="handleSelect(scope.row)" size="mini">选择</el-button>
          </template>
        </el-table-column>

        <el-table-column align="center" type="index" label="序号" width="56">
        </el-table-column>
        <el-table-column key='name'
          show-overflow-tooltip
          label="名称" sortable="custom"
          width="120" align="center" prop="name">
          <template slot-scope="scope">
              {{scope.row.name}}
          </template>
        </el-table-column>

        <el-table-column key='type'
          label="类型" sortable="custom"
          width="76" align="center" prop="type">
          <template slot-scope="scope">
            <li v-if="scope.row.type=='tree'" class="fa fa-sitemap"/>
            <li v-if="scope.row.type=='standard'" class="fa fa-navicon"/>
          </template>
        </el-table-column>

        <el-table-column key='desc'
          show-overflow-tooltip
          label="描述" sortable="false" align="center" prop="desc">
          <template slot-scope="scope">
              {{scope.row.desc}}
          </template>
        </el-table-column>

      </el-table>

      <div v-show="!listLoading" class="pagination-container">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNo" :page-sizes="[10,20,30, 50]"
          :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </section>
  </div>
</template>

<script>
import { getList } from "@/views/dev/option/api"
import optionsView from '@/components/Control/optionsView';
import optionsTreeView from '@/components/Control/optionsTreeView';
import { parseTime } from '@/utils'

export default {
  components: {optionsView, optionsTreeView},
  props:{
    option: {type: Object}
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: null,
      editOption: false,
      isHandleExpand: false,
      currentOption: {},
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        sort: "_id",
        order: -1
      },
      objQuery: [
        {name: { $regex: '' }}
      ]
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
    handleFilter() {
      this.fetchData();
    },
    handleSelect(val) {
      this.option.option.id = val.id;
      this.option.option.name = val.name;
      this.option.option.desc = val.desc;
      this.option.options = val.options;
      this.editOption = false;
    },
    handleExpandChange(val) {
    },
    handleEditOption(){
      this.editOption = !this.editOption;
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
  },
  computed:{
    selected: function () {
        return this.option.option != null &&  this.option.option.id != null &&  this.option.option.id != ''
      },
  }
};
</script>
