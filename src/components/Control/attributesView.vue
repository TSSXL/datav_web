<template>
  <div>
    <span v-if="!attributes || attributes.length == 0">无  </span>
    <el-table v-if="attributes && attributes.length > 0"
              :data="attributes"
              style="width: 100%" size="mini">
      <el-table-column
        prop="key"
        label="名称"
        width="60">
      </el-table-column>
      <el-table-column
        prop="value"
        label="值">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import validateBus from "@/views/bus/validate";
  import errorTip from "@/components/Validate/errorTip";

  export default {
    props: {
      attributes: {type: Array}
    },
    components: {
      errorTip
    },
    data() {
      return { };
    },
    methods: { },
    created() { }
  };
</script>
<style scoped>
  .el-table--mini td, .el-table--mini th {
    padding: 0;
  }
  .el-dialog__body {
    padding: 10px 20px;
  }
</style>
