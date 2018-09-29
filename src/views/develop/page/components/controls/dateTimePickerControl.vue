<template>
  <el-date-picker
    v-model="element.value"
    type="datetime"
    :placeholder="element.placeholder"
    :disabled="element.disabled"
    :readonly="element.readonly">
  </el-date-picker>
</template>
<script>
  import base from './base'

  export default {
    name: 'dateTimePickerControl',
    extends: base,
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
