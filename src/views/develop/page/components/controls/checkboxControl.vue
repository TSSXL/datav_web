<template>
  <el-checkbox-group v-model="element.value"  :disabled="element.disabled">
    <el-checkbox :label="3">备选项</el-checkbox>
    <el-checkbox :label="6">备选项</el-checkbox>
    <el-checkbox :label="9">备选项</el-checkbox>
  </el-checkbox-group>
</template>
<script>
  import base from './base'

  export default {
    name: 'checkControl',
    extends: base,
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
