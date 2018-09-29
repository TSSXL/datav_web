<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";
  import echarts from 'echarts'

  export default {
    name: 'waterQualityMonitor',
    extends:vChartBase,
    methods: {
      getChartOption(option){
        let chartOption = {};
        chartOption.animation = option.animation;
        chartOption.textStyle = option.style.textStyle;
        chartOption.grid = option.style.grid;
        chartOption.legend = option.style.legend;
        chartOption.xAxis = option.style.xAxis;
        chartOption.yAxis = option.style.yAxis;
        chartOption.series = option.style.series;
        chartOption.series[0].name = option.data.datamap.s1.desc;
        chartOption.series[1].name = option.data.datamap.s2.desc;
        chartOption.series[2].name = option.data.datamap.s3.desc;
        chartOption.series[3].name = option.data.datamap.s4.desc;
        chartOption.legend.data = [chartOption.series[0].name,chartOption.series[1].name,chartOption.series[2].name,chartOption.series[3].name];
        chartOption.xAxis.data = option.data.static_data.map(item => item.x);
        chartOption.series[0].data = option.data.static_data.map(item => item.s1);
        chartOption.series[1].data = option.data.static_data.map(item => item.s2);
        chartOption.series[2].data = option.data.static_data.map(item => item.s3);
        chartOption.series[3].data = option.data.static_data.map(item => item.s4);
        for(let series of chartOption.series){
          series.areaStyle.normal.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: series.itemStyle.normal.color
          }, {
            offset: 1,
            color: "#ffe"
          }]);
        }
        return chartOption;
      }
    }
  }
</script>
