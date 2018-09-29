<template>
  <el-steps :space="200" :active="element.value" :process-status="element.processStatus" :finish-status="element.finishStatus" :direction="element.direction">
    <el-step title="开始"></el-step>
    <el-step title="审核"></el-step>
    <el-step title="审批"></el-step>
    <el-step title="结束"></el-step>
  </el-steps>
</template>
<script>
  import base from './base'

  export default {
    name: 'stepsControl',
    extends: base,
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
