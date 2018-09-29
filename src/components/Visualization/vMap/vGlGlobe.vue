<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:300px'"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'

  export default {
    name: 'vGlGlobe',
    components: {},
    props: {
      option: {type: Object},
      uid: {type: String}
    },
    data() {
      return {
        chartOption: {
          globe: {
            baseTexture: '/static/earth.jpg',
            heightTexture: '/static/bathymetry_bw_composite_4k.jpg',
            displacementScale: 0.04,
            shading: 'lambert',
            //environment: '/static/starfield.jpg',
            environment: 'none',
            light: {
              ambient: {
                intensity: 0.4
              },
              main: {
                intensity: 1
              }
            },
            layers: [{
              type: 'blend',
              blendTo: 'emission',
              texture: '/static/night.jpg'
            }, {
              type: 'overlay',
              texture: '/static/clouds.png',
              shading: 'lambert',
              distance: 10
            }]
          },
          series: []
        }
      }
    },
    methods: {
      drawChart() {
        var chart = this.$refs.chart
        this.charts = echarts.init(chart)
        this.charts.setOption(this.chartOption);

        var obj = chart.parentNode.parentNode.parentNode;//获取父容器

        chart.style.width = (obj.clientWidth) + 'px';
        chart.style.height = (obj.clientHeight) + 'px';
        this.charts.resize();
      }
    },
    watch: {
      option: {
        handler(curVal, oldVal){
          //console.log(curVal.style.size_location.width, oldVal.style.size_location.width)
          this.drawChart();
        },
        deep:true
      },
    },
    computed: {
      title: function () {
        return this.option.data.static_data
      }
    },
    created() {
      this.$nextTick(function () {
        this.drawChart()
      })
    }
  }
</script>
<style scoped>

</style>
