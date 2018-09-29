<template>
  <section>
    <el-form-item label="占位文本">
      <el-input v-model="formItem.placeholder" name="name" placeholder="请输入输入框占位文本" />
    </el-form-item>
    <el-form-item label="起始时间">
      <el-input v-model="formItem.start" placeholder="请输入起始时间" />
    </el-form-item>
    <el-form-item label="步长">
      <el-input v-model="formItem.step" placeholder="请输入步长" />
    </el-form-item>
    <el-form-item label="结束时间">
      <el-input v-model="formItem.end" placeholder="请输入结束时间" />
    </el-form-item>
    <el-form-item label="文本框可输入">
      <el-switch v-model="formItem.editable" />
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
