<template>
    <div>
      <el-table :data="options" v-loading.body="listLoading" element-loading-text="拼命加载中"
        highlight-current-row size="mini">
        <el-table-column align="center" type='index' width="72" label="序号">
        </el-table-column>
        <el-table-column label="label" align="center" prop="label">
          <template slot-scope="scope">
            <el-input v-model="scope.row.label" placeholder="请输入选项显示的内容" v-validate.initial="validate" data-vv-as="选项" :name="'label' + scope.$index"></el-input>
           <error-tip :errs="errors" :name="'label'+ scope.$index"></error-tip>
          </template>
        </el-table-column>
        <el-table-column label="value" width="160" align="center" prop="value">
          <template slot-scope="scope">
           <el-input v-model="scope.row.value" placeholder="请输入选项的值" v-validate.initial="validate" data-vv-as="值" :name="'value' + scope.$index"></el-input>
           <error-tip :errs="errors" :name="'value'+ scope.$index"></error-tip>
          </template>
        </el-table-column>
        <el-table-column  label="操作" width="156" align="center" >
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-delete" @click="removeOption(scope.row)" size="mini"></el-button>
            <el-button type="primary"  icon="fa fa-long-arrow-up" @click="upOption(scope.row)" size="mini"> </el-button>
            <el-button type="primary"  icon="fa fa-long-arrow-down" @click="downOption(scope.row)" size="mini"> </el-button>
          </template>
        </el-table-column>
      </el-table>


      <div style="text-align:right; padding-top: 10px;">
        <el-button @click="addOption" type="primary" icon="plus" size="small">添加</el-button>
      </div>

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
            this.options.push({ value: "", label: "" });
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
