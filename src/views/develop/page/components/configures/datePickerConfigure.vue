<template>
  <section>
    <el-form-item label="占位文本">
      <el-input v-model="formItem.placeholder" name="name" placeholder="请输入输入框占位文本"/>
    </el-form-item>
    <el-form-item label="日期类型">
      <el-radio-group v-model="formItem.dateType">
        <el-radio label="day"></el-radio>
        <el-radio label="week"></el-radio>
        <el-radio label="month"></el-radio>
        <el-radio label="year"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="日期格式化">
      <el-input v-model="formItem.format"/>
    </el-form-item>
  </section>
</template>

<script>
  export default {
    props: {
      formItem: {type: Object}
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>
