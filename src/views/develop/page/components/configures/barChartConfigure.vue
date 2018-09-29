<template>
  <section>
    <el-form-item label="标题">
      <el-input v-model="formItem.label" name="name" placeholder="请输入标题" />
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
