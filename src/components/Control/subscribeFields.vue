<template>
  <div class="app-container">
    <el-form ref="form" label-width="80px" size="mini">
      <el-form-item label="">
        <el-table v-if="content.msgFields && content.msgFields.length > 0" :data="content.msgFields"
                  highlight-current-row size="mini">
          <el-table-column label="选择" align="center" prop="checked" width="64">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.checked"></el-checkbox>
            </template>
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
              <el-input v-model="scope.row.desc" placeholder="请输入字段描述" data-vv-as="字段描述"
                        :name="'desc' + scope.$index"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <span v-else ><li class="fa fa-exclamation-circle" /> 请初始化消息</span>
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
        validate: "required"
      };
    },
    methods: {
    },
    computed: {
      exScript(){
        let exScript = [];
        for (let item of this.content.msgFields) {
          if(item.checked)
            exScript.push('t.' + item.label + ': o.' + item.label + ';')
        }
        return  exScript.join('\n');
      }
    },
    created() {
    }
  };
</script>
<style scoped>
</style>
