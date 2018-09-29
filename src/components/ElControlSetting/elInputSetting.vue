<template>
    <div>
        <el-form-item label="类型">
          <el-radio-group v-model="data.attributes.type" @change="changeValue">
            <el-radio-button label="text"></el-radio-button>
            <el-radio-button label="textarea"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="输入框行数" v-if="data.attributes.type == 'textarea'" >
          <el-input-number v-model="data.attributes.rows" :min="1" :max="100" :step="1">
          </el-input-number>
        </el-form-item>

        <el-form-item label="自适应内容高度" v-if="data.attributes.type == 'textarea'">
          <el-switch v-model="data.attributes.autosize" active-text="" inactive-text="">
          </el-switch>
        </el-form-item>

        <el-form-item label="placeholder" >
          <el-input v-model="data.attributes.placeholder" name="placeholder">
          </el-input>
        </el-form-item>

        <el-form-item label="值">
          <el-input v-model="data.value"
            :type="data.attributes.type"
            :rows="data.attributes.rows"
            :autosize="data.attributes.autosize"
            :placeholder="data.attributes.placeholder"></el-input>
        </el-form-item>
    </div>
</template>
<script>
import validateBus from "@/views/bus/validate";
import errorTip from "@/components/Validate/errorTip";

export default {
  name: "el-input-setting",
  components: { errorTip },
  props: {
    data: { type: Object }
  },
  data() {
    return {
      options: [
        { value: "text", label: "单行文本框" },
        { value: "textarea", label: "多行文本框" }
      ],
      inputvalue: ""
    };
  },
  methods:{
    changeValue(value) {
      this.data.attributes.type = value;
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
