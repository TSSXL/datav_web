<template>
    <div>
        <el-form-item label="主题">
          <el-radio-group v-model="data.attributes.type">
            <el-radio-button label="primary"></el-radio-button>
            <el-radio-button label="success"></el-radio-button>
            <el-radio-button label="info"></el-radio-button>
            <el-radio-button label="warning"></el-radio-button>
            <el-radio-button label="danger"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否可关闭">
          <el-switch v-model="data.attributes.closable" active-text="" inactive-text="">
          </el-switch>
        </el-form-item>

        <el-form-item label="是否禁用渐变动画">
          <el-switch v-model="data.attributes.disable_transitions" active-text="" inactive-text="">
          </el-switch>
        </el-form-item>

        <el-form-item label="尺寸">
          <el-radio-group v-model="data.attributes.size">
            <el-radio-button label="default"></el-radio-button>
            <el-radio-button label="medium"></el-radio-button>
            <el-radio-button label="small"></el-radio-button>
            <el-radio-button label="mini"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="值">
          <el-tag
            :key="tag"
            :type="data.attributes.type"
            :size="data.attributes.size"
            v-for="tag in data.value"
            :closable="data.attributes.closable"
            :disable-transitions="data.attributes.disable_transitions"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            :size="data.attributes.size"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else  :size="data.attributes.size" @click="showInput">+ 新标签</el-button>
        </el-form-item>
    </div>
</template>
<script>
import validateBus from "@/views/bus/validate";
import errorTip from "@/components/Validate/errorTip";

export default {
  name: "el-tag-setting",
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
      inputVisible: false,
      inputValue: ''
    };
  },
  methods:{
      handleClose(tag) {
        this.data.value.splice(this.data.value.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.data.value.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
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
<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>