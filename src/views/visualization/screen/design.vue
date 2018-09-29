<template>
  <div class="app-container">
    <canvas-editor :screen="screen" @submit="onSubmit"></canvas-editor>
  </div>
</template>

<script>
  import { getItem, editItem } from "@/views/visualization/screen/api";
  import errorTip from "@/components/Validate/errorTip";
  import canvasEditor from "@/views/visualization/screen/canvasEditor";

  export default {
    components: { errorTip, canvasEditor },
    data() {
      return {
        id: this.$route.params.id,
        screen: {
          contentId:"",
          name: '',
          desc: '',
          tag: [],
          publish: {},
          version: '',
          page: { canvas: { width: 960, height: 480 }, grid: 10, fill: 'full', ratio: '16 : 9', backgrounds: [], coverImage: '' },
          components: []
        }
      }
    },
    methods: {
      fetchData() {
        getItem(this.id).then(response => {
          this.screen = response.data;
        });
      },
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (this.errors.any()) {
            return;
          }


          if (result) {
            editItem(this.id, this.screen).then(response => {
              this.$message({
                message: '保存成功',
                type: 'success'
              });
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
      this.fetchData();
    },

  };
</script>
<style scoped>

</style>
