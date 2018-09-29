<template>
  <section>
    <el-form-item label="值">
      <el-input-number v-model="formItem.value" :min="1" :max="100"></el-input-number>
    </el-form-item>
    <el-form-item label="类型">
      <el-radio-group v-model="formItem.progressType">
        <el-radio-button label="line">line</el-radio-button>
        <el-radio-button label="circle">circle</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="当前状态">
      <el-radio-group v-model="formItem.status">
        <el-radio label="">无</el-radio>
        <el-radio label="success">success</el-radio>
        <el-radio label="exception">exception</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="进度条高度">
      <el-input-number v-model="formItem.strokeWidth" :min="6" :max="48"></el-input-number>
    </el-form-item>
    <el-form-item label="进度条背景色">
      <el-color-picker v-model="formItem.color" />
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
