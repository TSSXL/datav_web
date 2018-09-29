<template>
  <el-time-select
    v-model="element.value"
    :picker-options="{
            start: element.start,
            step: element.step,
            end: element.end
          }"
    :editable="element.editable"
    :readonly="element.readonly"
    :disabled="element.disabled"
    :placeholder="element.placeholder">
  </el-time-select>
</template>
<script>
  import base from './base'

  export default {
    name: 'timeSelectControl',
    extends: base,
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
