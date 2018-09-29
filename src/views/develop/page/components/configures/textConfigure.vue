<template>
  <section>
    <el-form-item label="文本内容">
      <el-input v-model="formItem.value" type="textarea" placeholder="请输入文本内容" :autosize="{ minRows: 2, maxRows: 6 }"/>
    </el-form-item>
    <el-form-item label="文字颜色">
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
