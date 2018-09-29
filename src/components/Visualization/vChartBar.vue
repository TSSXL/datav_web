<template>
  <div class="charts">
    <div id="vChartBarChart" :style="'width:300px;height:200px'"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'

  export default {
    name: 'vChartBar',
    components: {},
    props: {
      option: {type: Object},
      scale: {type: Number}
    },
    data() {
      return {
        barOption : {}
      }
    },
    methods: {
      drawChart() {
        let chart = document.getElementById('vChartBarChart');
        this.charts = echarts.init(chart)
        this.barOption.animation = this.option.animation;
        this.barOption.color = this.option.style.color;
        this.barOption.textStyle = this.option.style.textStyle;
        this.barOption.xAxis = this.option.style.xAxis;
        this.barOption.yAxis = this.option.style.yAxis;
        this.barOption.grid = this.option.style.grid;

        if(this.option.style.series != null)
          this.barOption.series = JSON.parse(JSON.stringify(this.option.style.series));

        this.barOption.xAxis.data = this.option.static_data.map(item => item.x);
        this.barOption.series[0].data = this.option.static_data.map(item => item.y);

        this.charts.setOption(this.barOption);
        let obj = chart.parentNode.parentNode.parentNode;
        chart.style.width = (obj.clientWidth) + 'px'
        chart.style.height = (obj.clientHeight) + 'px'
        this.charts.resize()
      }
    },
    watch: {
      option: {
        handler(curVal, oldVal){
          console.log(curVal)
          this.drawChart();
        },
        deep:true
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
