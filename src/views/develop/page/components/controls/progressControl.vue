<template>
  <el-progress :percentage="element.value" :color="element.color" :status="element.status" :type="element.progressType" :stroke-width="element.strokeWidth"></el-progress>
</template>
<script>
  import base from './base'

  export default {
    name: 'progressControl',
    extends: base,
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
