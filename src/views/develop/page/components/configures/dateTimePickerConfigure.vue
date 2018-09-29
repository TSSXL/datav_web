<template>
  <section>
    <el-form-item label="占位文本">
      <el-input v-model="formItem.placeholder" name="name" placeholder="请输入输入框占位文本"/>
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
