<template>
    <div>
        <el-form-item label="titles">
          <el-input v-model="data.attributes.titles[0]">
          </el-input>
          <el-input v-model="data.attributes.titles[1]">
          </el-input>
        </el-form-item>

        <el-form-item label="是否可搜索">
          <el-switch v-model="data.attributes.filterable" active-text="" inactive-text="">
          </el-switch>
        </el-form-item>

        <el-form-item label="搜索框占位符">
          <el-input v-model="data.attributes.filter_placeholder" name="placeholder">
          </el-input>
        </el-form-item>

        <options-setting :field="data"></options-setting>

        <el-form-item label="值">
          <el-transfer
            :filterable="data.attributes.filterable"
            :titles="data.attributes.titles"
            :filter-method="filterMethod"
            :filter-placeholder="data.attributes.placeholder"
            v-model="data.value"
            :props="{key: 'value',label: 'label'}"
            :data="transferData">
          </el-transfer>
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
      transferData: this.data.option.options,
      value: [],
      filterMethod(query, item) {
        return item.value.indexOf(query) > -1;
      }
    };
  },  
  methods:{
    
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
