
<template>
  <div class="app-container list">
    <el-row>
      <el-col :span="18">
        <div class="filter-container">
            <span>
                <el-input @keyup.enter.native="handleFilter" style="width: 200px;"
                  class="filter-item" placeholder="图片名称" v-model="objQuery[0].filename.$regex" size="mini">
                </el-input>
            </span>
            <el-button class="filter-item" type="primary" icon="search" @click="handleFilter" size="mini">搜索</el-button>
        </div>
      </el-col>
    </el-row>

    <div class="select-tree">
      <el-scrollbar
        tag="div"
        class='is-empty'
        wrap-class="el-select-dropdown__wrap"
        view-class="el-select-dropdown__list">
        <div class="icons-wrapper"><i v-for="item in list" @click="selectImage(item.filename)"><img :src="'http://localhost:3000/' + item.filename" alt="" width="64"/></i>
        </div>
      </el-scrollbar>
    </div>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNo" :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { getList, removeItem } from "./api"
import { parseTime } from '@/utils'

export default {
  props: {
    value: {type: Object}
  },
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
  methods: {
    fetchData() {
      this.listLoading = true;
      getList(this.listQuery, this.objQuery).then(response => {
        this.list = response.data.results;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    selectImage(filename) {
      this.value.images.splice(0, this.value.images.length)
      this.value.images.push({ name: filename, url: filename })
      this.value.type = 'image'
      this.$emit('close')
    },
    handleFilter() {
      this.fetchData();
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

<style scoped>
  .select-tree .icons-wrapper {
    display: block;
  }

  .select-tree .is-empty i {
    width: 96px;
    height: 96px;
    overflow: hidden;
    line-height: 96px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
  }

  .select-tree .is-empty i:hover {
    background-color: #0d6aad;
    color: #ffffff;
  }
</style>
