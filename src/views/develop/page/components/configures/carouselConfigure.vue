<template>
  <section>
    <el-form-item label="切换箭头方式">
      <el-radio-group v-model="formItem.arrow">
        <el-radio label="always">always</el-radio>
        <el-radio label="hover">hover</el-radio>
        <el-radio label="never">never</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="类型">
      <el-radio-group v-model="formItem.carouselType">
        <el-radio label="">无</el-radio>
        <el-radio label="card">card</el-radio>
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
