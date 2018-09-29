<template>
  <div>
    <el-tag
      :key="tag"
      type="small"
      size="mini"
      v-for="tag in value"
      :closable="true"
      :disable-transitions="true"
      @close="handleTagtagClose(tag)"
      name="tag" data-vv-as="标签">
      {{tag}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputTagtagVisible"
      v-model="inputTagtagValue"
      ref="saveTagtagInput"
      size="mini"
      @keyup.enter.native="handleTagtagInputConfirm"
      @blur="handleTagtagInputConfirm"
      name="tag" data-vv-as="标签" v-validate="'required'">
    </el-input>
    <el-button v-else size="mini" @click="showTagtagInput">+ 新标签
    </el-button>
    <error-tip :errs="errors" name="tag"></error-tip>
  </div>
</template>
<script>
  import validateBus from "@/views/bus/validate";
  import errorTip from "@/components/Validate/errorTip";

  export default {
    props: {
      value: {type: Array}
    },
    components: {
      errorTip
    },
    data() {
      return {
        inputTagtagVisible: false,
        inputTagtagValue: '',
      };
    },
    methods: {
      handleTagtagClose(tag) {
        this.value.splice(this.value.indexOf(tag), 1
        )
      },
      showTagtagInput() {
        this.inputTagtagVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagtagInput.$refs.input.focus();
        });
      },
      handleTagtagInputConfirm() {
        let inputValue = this.inputTagtagValue;
        if (inputValue) {
          this.value.push(inputValue);
        }
        this.inputTagtagVisible = false;
        this.inputTagtagValue = '';
      },
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
