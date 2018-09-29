<template>
  <div class="app-container">
    <canvas-editor :screen="screen" @submit="onSubmit"></canvas-editor>
  </div>
</template>

<script>
  import { addItem } from "@/views/visualization/screen/api";
  import errorTip from "@/components/Validate/errorTip";
  import canvasEditor from "@/views/visualization/screen/canvasEditor";

  export default {
    components: {errorTip, canvasEditor },
    data() {
      return {
        screen: {
          name: '',
          desc: '',
          tag: [],
          publish: {},
          version: '',
          page: { canvas: { width: 960, height: 480 }, grid: 10, ratio: '16 : 9', fill: 'full', backgrounds: [] },
          components: []
        },
      }
    },
    methods: {
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return;
          }

          if (result) {
            addItem(this.screen).then(response => {
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.$router.go(-1)
            });
            return;
          }
        });
      },
      onCancel() {
        this.$router.go(-1)
      }
    },
    created() {
    }
  };
</script>
<style scoped>

</style>
