<template>
  <el-date-picker
    v-model="element.value"
    type="daterange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :readonly="element.readonly"
    :disabled="element.disabled">
  </el-date-picker>
</template>
<script>
  import base from './base'

  export default {
    name: 'datePickerRangeControl',
    extends: base,
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
