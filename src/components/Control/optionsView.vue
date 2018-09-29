<template>
    <div>
      <el-table :data="options" v-loading.body="listLoading" element-loading-text="拼命加载中"
        highlight-current-row size="mini">
        <el-table-column align="center" type='index' width="72" label="序号">
        </el-table-column>
        <el-table-column label="label" align="center" prop="label">
          <template slot-scope="scope">
            {{scope.row.label}}           
          </template>
        </el-table-column>
        <el-table-column label="value" width="260" align="center" prop="value">
          <template slot-scope="scope">
            {{scope.row.value}}       
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>
<script>
export default {
  props: {
    options: { type: Array }
  },
  data() {
    return {
      listLoading:false
    };
  }
};
</script>