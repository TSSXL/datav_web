<template>
  <div>
    <el-form-item label="策略">
      <el-input type="text" v-model="value.cron" placeholder="请输入cron表达式">
        <el-button slot="append" icon="fa fa-reorder" @click="selectCrons"></el-button>
      </el-input>
      <error-tip :errs="errors" name="icon"></error-tip>
    </el-form-item>
    <el-form-item label="描述">
      <el-input type="text" v-model="value.desc" placeholder="描述">
      </el-input>
    </el-form-item>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible">
      <select-crons v-model="value" @closeDialog="closeDialog"></select-crons>
    </el-dialog>

  </div>
</template>
<script>
  import validateBus from "@/views/bus/validate";
  import errorTip from "@/components/Validate/errorTip";
  import selectCrons from "@/views/console/crontrigger/select";

  export default {
    props: {
      value: {type: Object}
    },
    components: {
      errorTip, selectCrons
    },
    data() {
      return {
        dialogVisible: false
      }
    },
    methods: {
      selectCrons() {
        this.dialogVisible = true;
      },
      closeDialog(){
        this.dialogVisible = false;
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
</style>
