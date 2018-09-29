<template>
    <div>
        <el-form-item label="选项 / 值" v-for="(option, index) in options"  :key="index">
            <el-row :gutter="20">
                <el-col :span="7" style="padding: 0;">
                    <el-input v-model="option.label" placeholder="请输入选项显示的内容" v-validate.initial="validate" data-vv-as="选项" :name="'label' + index"></el-input>
                    <error-tip :errs="errors" :name="'label'+ index"></error-tip>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="option.value" placeholder="请输入选项的值" v-validate.initial="validate" data-vv-as="值" :name="'value' + index"></el-input>
                    <error-tip :errs="errors" :name="'value'+ index"></error-tip>
                </el-col>
                <el-col :span="4">
                  <el-button type="primary" icon="el-icon-delete" @click="removeOption(option)" size="mini"></el-button>
                </el-col>
            </el-row>
        </el-form-item>

        <el-form-item>
            <el-col :span="5" :offset="16">
                <el-button @click="addOption" type="primary" icon="plus">添加</el-button> 
            </el-col>
        </el-form-item>
        
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
      validate: "required",
      value: ""
    };
  },
  methods: {
    addOption() {
        console.log(this.options);
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