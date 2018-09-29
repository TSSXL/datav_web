<template>
  <el-time-picker
    v-model="element.value"
    :picker-options="{
          selectableRange: element.selectableRange
        }"
    :format="element.format"
    :placeholder="element.placeholder"
    :editable="element.editable"
    :readonly="element.readonly"
    :disabled="element.disabled">
  </el-time-picker>
</template>
<script>
  import base from './base'

  export default {
    name: 'timePickerControl',
    extends: base,
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
