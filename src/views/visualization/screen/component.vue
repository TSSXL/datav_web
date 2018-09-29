<template>
  <section>
    <vue-draggable-resizable v-for="component in screen.components" :key="component.name"
                             :w="component.option.style.size_location.width"
                             :h="component.option.style.size_location.height"
                             :x="component.option.style.size_location.x"
                             :y="component.option.style.size_location.y"
                             :z="component.option.style.size_location.z"
                             :grid="grid"
                             :active.sync="component.active"
                             v-on:dragging="onDrag" v-on:resizing="onResize"
                             @activated="onActivated(component)" @deactivated="onDeactivated"
                             :parent="true" class="part" :class="component == currentComponent ? active : ''">
      <v-text-title v-if="component.name == 'title'" :option="component.option"></v-text-title>
      <v-chart-pie v-if="component.name == 'basic pie'" :option="component.option"></v-chart-pie>
      <v-chart-bar v-if="component.name == 'basic bar'" :option="component.option"></v-chart-bar>
      <v-gl-globe v-if="component.name == 'globe'" :option="component.option"></v-gl-globe>
    </vue-draggable-resizable>
  </section>
</template>
<script>
  import VueDraggableResizable from 'vue-draggable-resizable'
  import vTextTitle from '@/components/Visualization/words/vTextTitle'
  import vChartPie from '@/components/Visualization/vChartPie'
  import vChartBar from '@/components/Visualization/vChartBar'
  import vGlGlobe from '@/components/Visualization/vMap/vGlGlobe'

  export default {
    name: 'widget',
    components: {VueDraggableResizable, vTextTitle, vChartPie, vChartBar, vGlGlobe},
    props: {
      screen: {type: Object},
      currentComponent: {type: Object}
    },
    data() {
      return {}
    },
    methods: {
      onResize: function (x, y, width, height) {
        if (this.currentComponent && this.currentComponent.option) {
          this.currentComponent.option.style.size_location.x = x
          this.currentComponent.option.style.size_location.y = y
          this.currentComponent.option.style.size_location.width = width
          this.currentComponent.option.style.size_location.height = height
          //this.drawChart()
        }
      },
      onDrag: function (x, y) {
        this.currentComponent.option.style.size_location.x = x
        this.currentComponent.option.style.size_location.y = y
      },
      onActivated: function (val) {
        //this.currentComponent = val
      },
      onDeactivated: function () {
        //this.currentLayout.active = false;
      },
    },
    computed: {
      grid: function () {
        return [this.screen.page.grid, this.screen.page.grid]
      }
    },
    created() {
    }
  }
</script>
<style scoped>
</style>
