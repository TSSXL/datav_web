<template>
  <el-slider v-model="element.value" :disabled="element.disabled" />
</template>
<script>
  import base from './base'

  export default {
    name: 'sliderControl',
    extends: base,
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
