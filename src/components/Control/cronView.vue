<template>
  <div>
    <el-form-item label="策略">
      {{value.cron}}
    </el-form-item>
    <el-form-item label="描述">
      {{value.desc}}
    </el-form-item>
  </div>
</template>
<script>

  export default {
    props: {
      value: {type: Object}
    },
    components: {},
    data() {
      return {

      }
    },
    methods: { },
    created() { }
  }
</script>
<style scoped>
</style>
