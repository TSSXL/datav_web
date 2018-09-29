<template>
  <section>
    <el-form-item label="标签内容">
      <el-input v-model="formItem.value" type="textarea" placeholder="标签内容" :autosize="{ minRows: 2, maxRows: 6 }"/>
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
