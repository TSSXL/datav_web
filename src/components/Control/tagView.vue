<template>
  <div>
    <span v-if="!value || value.length == 0">无</span>
    <el-tag
      :key="tag"
      type="small"
      size="mini"
      v-for="tag in value"
      name="tag" data-vv-as="标签">
      {{tag}}
    </el-tag>
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
      };
    },
    methods: {

    },
    created() {
    }
  };
</script>
<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

</style>
