<template>
  <el-radio-group v-model="element.value"  :disabled="element.disabled">
    <el-radio-button :label="3">备选项</el-radio-button>
    <el-radio-button :label="6">备选项</el-radio-button>
    <el-radio-button :label="9">备选项</el-radio-button>
  </el-radio-group>
</template>
<script>
  import base from './base'

  export default {
    name: 'radioButtonControl',
    extends: base,
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
