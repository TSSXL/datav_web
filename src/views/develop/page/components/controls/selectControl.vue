<template>
  <el-select v-model="element.value" :placeholder="element.placeholder" :disabled="element.disabled">
    <el-option label="备选项" value="1"></el-option>
    <el-option label="备选项" value="2"></el-option>
    <el-option label="备选项" value="3"></el-option>
  </el-select>
</template>
<script>
  import base from './base'

  export default {
    name: 'selectControl',
    extends: base,
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
