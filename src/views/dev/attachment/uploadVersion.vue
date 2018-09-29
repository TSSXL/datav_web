<template>
  <div class="app-container">
    <h2>上传新版本</h2>
    <upload :id="id"></upload>
  </div>
</template>

<script>
  import errorTip from "@/components/Validate/errorTip";
  import upload from '@/views/dev/attachment/upload'

  export default {
    components: {errorTip, upload},
    data() {
      return {
        id: this.$route.params.id,
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
