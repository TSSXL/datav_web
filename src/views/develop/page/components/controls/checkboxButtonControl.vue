<template>
  <el-checkbox-group v-model="element.value" :disabled="element.disabled">
    <el-checkbox-button :label="3">备选项</el-checkbox-button>
    <el-checkbox-button :label="6">备选项</el-checkbox-button>
    <el-checkbox-button :label="9">备选项</el-checkbox-button>
  </el-checkbox-group>
</template>
<script>
  import base from './base'

  export default {
    name: 'checkButtonControl',
    extends: base,
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
