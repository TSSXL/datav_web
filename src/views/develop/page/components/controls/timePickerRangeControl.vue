<template>
  <el-time-picker
    is-range
    v-model="element.value"
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    placeholder="选择时间范围"
    :readonly="element.readonly"
    :disabled="element.disabled">
  </el-time-picker>
</template>
<script>
  import base from './base'

  export default {
    name: 'timePickerRangeControl',
    extends: base,
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
