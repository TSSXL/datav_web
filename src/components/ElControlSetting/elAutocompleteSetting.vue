<template>
    <div>
        <el-form-item label="label">
          <el-input v-model="data.attributes.label" name="label">
          </el-input>
        </el-form-item>

        <el-form-item label="value">
          <el-input v-model="data.attributes.value" name="value">
          </el-input>
        </el-form-item>

        <el-form-item label="focus">
          <el-switch v-model="data.attributes.trigger_on_focus" active-text="" inactive-text="">
          </el-switch>
          是否在输入框 focus 时显示建议列表
        </el-form-item>

        <el-form-item label="placeholder">
          <el-input v-model="data.attributes.placeholder" name="placeholder">
          </el-input>
        </el-form-item>

        <options-setting :field="data"></options-setting>

        <el-form-item label="值">
          <el-autocomplete
            v-model="data.value"
            :fetch-suggestions="querySearch"
            :placeholder="data.attributes.placeholder"
            :trigger-on-focus="data.attributes.trigger_on_focus"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
    </div>
</template>
<script>
import validateBus from "@/views/bus/validate";
import errorTip from "@/components/Validate/errorTip";
import optionsSetting from '@/components/Control/optionsSetting';

export default {
  name: "el-input-setting",
  components: { errorTip, optionsSetting },
  props: {
    data: { type: Object }
  },
  data() {
    return {
    };
  },
  methods:{
    querySearch(queryString, cb) {
      var options = this.data.option.options;
      var results = queryString ? options.filter(this.createFilter(queryString)) : options;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (options) => {
        return (options.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item){

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
