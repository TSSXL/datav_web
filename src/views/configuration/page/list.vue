<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中"
      @selection-change="selectionChange"
      @sort-change="sortChange" highlight-current-row size="mini">
      <el-table-column label="配置项名称" sortable prop="name">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="配置项值" width="260" align="center" prop="desc">
        <template slot-scope="scope">
          <span>{{scope.row.value}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList, removeItem, generateCode, initPages } from "@/api/page";

export default {
  data() {
    return {
      list: this.items,
      entity:{
        isLocked:false
      },
      listLoading: false,
      total: null,
      multipleSelection: [],
      objQuery: [
        {name: { $regex: '' }},
        {desc: { $regex: '' }}
      ]
    };
  },
  props: {
    items: { type: Array }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.list=this.items;
       /*this.listQuery.entityId = this.propId != undefined ? this.propId : this.entityId;
      this.listLoading = true;
      getList(this.listQuery, this.objQuery).then(response => {
        this.entity = response.data.entity;
        if(this.entity.isLocked == null)
          this.entity.isLocked = false;
        this.list = response.data.results;
        this.total = response.data.total;
        this.listLoading = false;
      });*/
    },
    handleFilter() {
      this.fetchData();
    },
    selectionChange(val){
      this.multipleSelection = val;
    },
    handleUpdate(row) {
      this.$router.push({ path: "/dev/page/edit/" + row.id });
    },
    sortChange(obj){
      //console.log(obj);
    },
    filterTag(value, row) {
      return row.model === value;
    }
  }
};
</script>
<style scoped>
  .app-container {
    padding-top: 0px;
}
</style>
