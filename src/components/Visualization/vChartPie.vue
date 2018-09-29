<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px'"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import "../../../plugins/echarts/theme/dark.js";
  import "../../../plugins/echarts/theme/infographic.js";
  import "../../../plugins/echarts/theme/macarons.js";
  import "../../../plugins/echarts/theme/roma.js";
  import "../../../plugins/echarts/theme/shine.js";
  import "../../../plugins/echarts/theme/walden.js";
  import "../../../plugins/echarts/theme/vintage.js";

  export default {
    name: 'vChartPie',
    components: {},
    props: {
      option: {type: Object},
      uid: {type: String}
    },
    data() {
      return {
        baseOption: {
          animation:false,
          textStyle: {color: '#fff', fontSize: 12, fontFamily: 'Microsoft YaHei'},
          legend: {
            show: true,
            textStyle: {color: '#fff', fontSize: 8},
            orient: 'horizontal',
            itemWidth: 12,
            itemHeight: 12,
            itemGap: 8,
            left: 'center',
            top: 'bottom'
          },
          series: [
            {
              type: 'pie',
              radius: ['50%', '70%'],
              center: ['50%', '50%'],
              label: {
                color: '#fff',
                fontSize: 10,
                formatter: '{b} {d}%'
              },
              labelLine: {
                show: false
              },
              data: []
            }
          ]
        }
      }
    },
    methods: {
      drawChart() {
        var chart = this.$refs.chart
        this.charts = echarts.init(chart, 'walden')

        this.baseOption.textStyle = this.option.style.text
        this.baseOption.legend = this.option.style.legend
        this.baseOption.series[0].center = this.option.style.center_radius.center
        this.baseOption.series[0].radius = this.option.style.center_radius.radius
        var gettype = Object.prototype.toString
        let prototype = gettype.call(this.option.data.static_data)
        if (prototype == '[object Array]') {
          this.baseOption.series[0].data = this.option.data.static_data
        }else {
          this.baseOption.series[0].data = JSON.parse(this.option.data.static_data)
        }
        this.charts.setOption(this.baseOption)

        var obj = chart.parentNode.parentNode.parentNode

        chart.style.width = (obj.clientWidth) + 'px'
        chart.style.height = (obj.clientHeight) + 'px'
        this.charts.resize()
      }
    },
    watch: {
      option: {
        handler(curVal, oldVal) {
          this.drawChart()
        },
        deep: true
      }
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
