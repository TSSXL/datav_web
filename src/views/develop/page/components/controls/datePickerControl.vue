<template>
  <el-date-picker
    v-model="element.value"
    :type="element.dateType"
    :format="element.format"
    :placeholder="element.placeholder"
    :readonly="element.readonly"
    :disabled="element.disabled">
  </el-date-picker>
</template>
<script>
  import base from './base'

  export default {
    name: 'datePickerControl',
    extends: base,
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
