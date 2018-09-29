<template>
  <div class="app-container">
    <el-form ref="form" label-width="120px" size="mini">
      <el-form-item label="消息字段">
        <el-table v-if="content.msgFields && content.msgFields.length > 0" :data="content.msgFields"
                  highlight-current-row size="mini">
          <el-table-column
            type="expand"
            width="50">
          </el-table-column>
          <el-table-column label="字段名称" align="center" prop="label" width="96">
            <template slot-scope="scope">
              {{scope.row.label}}
            </template>
          </el-table-column>
          <el-table-column label="数据类型" align="center" prop="label" width="96">
            <template slot-scope="scope">
              {{scope.row.type}}
            </template>
          </el-table-column>
          <el-table-column label="字段描述" align="center" prop="desc">
            <template slot-scope="scope">
             {{scope.row.desc}}
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import validateBus from "@/views/bus/validate";
  import errorTip from "@/components/Validate/errorTip";

  export default {
    components: { errorTip },
    props: {
      content: {type: Object}
    },
    data() {
      return {

      };
    },
    methods: {
    },
    computed: {

    },
    created() {
    }
  };
</script>
<style scoped>
</style>
