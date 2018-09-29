<template>
  <el-switch v-model="element.value" size="mini" :disabled="element.disabled"/>
</template>
<script>
  import base from './base'

  export default {
    name: 'switchControl',
    extends: base,
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
