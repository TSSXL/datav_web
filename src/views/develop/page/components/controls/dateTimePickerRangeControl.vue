<template>
  <el-date-picker
    v-model="element.value"
    type="datetimerange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :disabled="element.disabled"
    :readonly="element.readonly">
  </el-date-picker>
</template>
<script>
  import base from './base'

  export default {
    name: 'dateTimePickerRangeControl',
    extends: base,
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
