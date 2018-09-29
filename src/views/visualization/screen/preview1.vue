<template>
  <div class="app-container">
    <canvas-view :screen="screen"></canvas-view>
  </div>
</template>

<script>
  import { getItem, editItem } from "@/views/visualization/screen/api";
  import errorTip from "@/components/Validate/errorTip";
  import canvasView from "@/views/visualization/screen/canvasView";

  export default {
    components: { errorTip, canvasView },
    data() {
      return {
        id: this.$route.params.id,
        screen: {
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
          this.screen = response.data
        })
      }
    },
    created() {
      this.fetchData()
    }
  }
</script>
<style scoped>

</style>
