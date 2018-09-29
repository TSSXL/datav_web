<template>
  <el-radio-group v-model="element.value"  :disabled="element.disabled">
    <el-radio :label="3">备选项</el-radio>
    <el-radio :label="6">备选项</el-radio>
    <el-radio :label="9">备选项</el-radio>
  </el-radio-group>
</template>
<script>
  import base from './base'

  export default {
    name: 'radioControl',
    extends: base,
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
