<template>
  <section>
      <v-text-title v-if="component.name == 'title'" :option="component.option"></v-text-title>
      <v-chart-pie v-if="component.name == 'basic pie'" :option="component.option"></v-chart-pie>
      <v-chart-line v-if="component.name == 'basic line'" :option="component.option"></v-chart-line>
      <v-gl-globe v-if="component.name == '3D globe'" :option="component.option"></v-gl-globe>
  </section>
</template>
<script>
  import vTextTitle from '@/components/Visualization/words/vTextTitle'
  import vChartPie from '@/components/Visualization/vChartPie'
  import vChartLine from '@/components/Visualization/vChartLine'
  import vGlGlobe from '@/components/Visualization/vMap/vGlGlobe'

  export default {
    name: 'component',
    components: { vTextTitle, vChartPie, vChartLine, vGlGlobe},
    props: {
      component: {type: Object}
    },
    data() {
      return {}
    },
    methods: {
    },
    computed: {
    },
    created() {
    }
  }
</script>
<style scoped>
</style>
