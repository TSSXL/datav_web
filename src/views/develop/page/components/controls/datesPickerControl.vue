<template>
  <el-date-picker
    v-model="element.value"
    type="dates"
    :placeholder="element.placeholder"
    :readonly="element.readonly"
    :disabled="element.disabled">
  </el-date-picker>
</template>
<script>
  import base from './base'

  export default {
    name: 'datesPickerControl',
    extends: base,
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
