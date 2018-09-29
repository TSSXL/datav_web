<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";

  export default {
    name: 'shRealtimeMonitor',
    extends:vChartBase,
    methods: {
      getChartOption(option){
        let chartOption = {};
        chartOption.animation = option.animation;
        chartOption.textStyle = option.style.textStyle;
        chartOption.title = option.style.title;
        chartOption.grid = option.style.grid;
        chartOption.visualMap = option.style.visualMap;
        chartOption.xAxis = option.style.xAxis;
        chartOption.yAxis = option.style.yAxis;
        chartOption.series = option.style.series;
        chartOption.xAxis.data = option.data.static_data.map(item => item.x);
        chartOption.series.data = option.data.static_data.map(item => item.y);
        return chartOption;
      }
    }
  }
</script>
