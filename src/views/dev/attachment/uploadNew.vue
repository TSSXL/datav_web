<template>
  <div class="app-container">
    <h2>上传文件</h2>
    <upload></upload>
  </div>
</template>

<script>
  import errorTip from "@/components/Validate/errorTip";
  import upload from '@/views/dev/attachment/upload'

  export default {
    components: {errorTip, upload},
    data() {
      return {

      }
    },
    computed: {
    },
    methods: {
    },
    created() {
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
