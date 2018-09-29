<template>
  <section>
    <el-form-item label="值">
      <el-input-number v-model="formItem.value" :min="0" :max="24"></el-input-number>
    </el-form-item>
    <el-form-item label="当前步骤状态">
      <el-radio-group v-model="formItem.processStatus">
        <el-radio label="wait">wait</el-radio>
        <el-radio label="process">process</el-radio>
        <el-radio label="finish">finish</el-radio>
        <el-radio label="error">error</el-radio>
        <el-radio label="success">success</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="结束步骤状态">
      <el-radio-group v-model="formItem.finishStatus">
        <el-radio label="wait">wait</el-radio>
        <el-radio label="process">process</el-radio>
        <el-radio label="finish">finish</el-radio>
        <el-radio label="error">error</el-radio>
        <el-radio label="success">success</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="显示方向">
      <el-radio-group v-model="formItem.direction">
        <el-radio-button label="horizontal">水平</el-radio-button>
        <el-radio-button label="vertical">竖式</el-radio-button>
      </el-radio-group>
    </el-form-item>
  </section>
</template>

<script>
  export default {
    props: {
      formItem: { type: Object }
    },
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>
