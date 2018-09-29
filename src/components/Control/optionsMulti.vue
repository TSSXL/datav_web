<template>
    <div>
      <el-table :data="options" v-loading.body="listLoading" element-loading-text="拼命加载中"
        highlight-current-row size="mini">
        <!--<el-table-column align="center" type='index' width="72" label="序号">-->
        <!--</el-table-column>-->
        <el-table-column label="参数名称" width="150" align="center" prop="label">
          <template slot-scope="scope">
            <el-input v-model="scope.row.label" placeholder="请输入参数名称" v-validate.initial="validate" data-vv-as="选项" :name="'label' + scope.$index"></el-input>
           <error-tip :errs="errors" :name="'label'+ scope.$index"></error-tip>
          </template>
        </el-table-column>
        <el-table-column label="校验规则" width="150" align="center" prop="rule">
          <template slot-scope="scope">
           <el-input v-model="scope.row.rule" placeholder="请输入校验规则" v-validate.initial="validate" data-vv-as="值" :name="'value' + scope.$index"></el-input>
           <error-tip :errs="errors" :name="'value'+ scope.$index"></error-tip>
          </template>
        </el-table-column>
        <el-table-column label="样例" width="150" align="center" prop="example">
          <template slot-scope="scope">
            <el-input v-model="scope.row.example" placeholder="请输入样例" v-validate.initial="validate" data-vv-as="值" :name="'value' + scope.$index"></el-input>
            <error-tip :errs="errors" :name="'value'+ scope.$index"></error-tip>
          </template>
        </el-table-column>
        <el-table-column  label="操作" width="150" align="center" >
          <template slot-scope="scope">
            <el-button type="text" icon="fa fa-times-circle"  @click="removeOption(scope.row)"></el-button>
            <el-button type="text"  icon="fa fa-arrow-circle-up" @click="upOption(scope.row)"></el-button>
            <el-button type="text"  icon="fa fa-arrow-circle-down" @click="downOption(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-button type="text" @click="addOption"><li class="fa fa-plus" /> 添加</el-button>
    </div>
</template>
<script>
import validateBus from "@/views/bus/validate";
import errorTip from "@/components/Validate/errorTip";
export default {
  props: {
    options: { type: Array }
  },
  components: { errorTip },
  data() {
    return {
      listLoading:false,
      validate: "required",
      value: ""
    };
  },
  methods: {
    addOption() {
        if(this.options==undefined){
            this['options']=[];
        }
        else{
            this.options.push({ rule: "", label: "",example:"" });
        }
    },
    removeOption(item) {
      var index = this.options.indexOf(item);
      if (index !== -1) {
        this.options.splice(index, 1);
      }
    },
    upOption(item){
      var index = this.options.indexOf(item);
      if(index==0) //已经是第一个了
      {

      }
      else{
        if (index !== -1) {
          this.options.splice(index, 1);
        }
        this.options.splice(index -1, 0, item)
      }
    },
    downOption(item){
      var index = this.options.indexOf(item);
      if(index==this.options.length) //已经是最后一个了
      {

      }
      else{
        if (index !== -1) {
          this.options.splice(index, 1);
        }
        this.options.splice(index +1, 0, item)
      }
    }
  },
  created() {
    validateBus.$on("validate", target => {
      this.$validator.validateAll().then(result => {
        if (result) {
          return;
        }
        validateBus.$emit("errors-changed", this.errors.items);
      });
    });
  }
};
</script>
