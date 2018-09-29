<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'

  export default {
    name: 'gaugePie',
    props: {
      option: {type: Object},
      scale: {type: Number}
    },
    methods: {
      draw(){
        let chart = this.$refs.chart;
        this.charts = echarts.init(chart);
        this.charts.setOption(this.getChartOption(JSON.parse(JSON.stringify(this.option))));
        let obj = chart.parentNode.parentNode.parentNode;
        chart.style.width = (obj.clientWidth) + 'px';
        chart.style.height = (obj.clientHeight*1.6) + 'px';
        this.charts.resize();
      },
      getChartOption(option){
        let chartOption = {};
        chartOption.animation = option.animation;
        chartOption.textStyle = option.style.textStyle;
        chartOption.title = option.style.title;
        chartOption.legend = option.style.legend;
        chartOption.legend.data = option.data.static_data.map(item => item.x);
        chartOption.color = option.style.color;
        chartOption.series = option.style.series;
        let array = [];
        let total = option.style.pieTotal;
        for(let item of option.data.static_data){
          array.push({
            name:item.x,
            value:item.y
          });
          total+=item.y;
        }
        array.push({
          name:"其他",
          value:total
        });
        chartOption.series[1].data = array;
        return chartOption;
      }
    },
    watch: {
      option: {
        handler(curVal, oldVal){
          this.draw();
        },
        deep:true
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.draw()
      })
    }
  }
</script>
