<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";

  export default {
    name: 'env-problems',
    extends:vChartBase,
    methods: {
      getChartOption(option){
        let chartOption = {};
        chartOption.animation = option.animation;
        chartOption.textStyle = option.style.textStyle;
        chartOption.title = option.style.title;
        chartOption.grid = option.style.grid;
        chartOption.legend = option.style.legend;
        chartOption.xAxis = option.style.xAxis;
        chartOption.yAxis = option.style.yAxis;
        chartOption.series = option.style.series;
        chartOption.series[0].name = option.data.datamap.val1.desc;
        chartOption.series[1].name = option.data.datamap.val2.desc;
        chartOption.legend.data = [chartOption.series[0].name,chartOption.series[1].name];
        chartOption.xAxis.data = option.data.static_data.map(item => item.x);
        chartOption.series[0].data = option.data.static_data.map(item => item.val1);
        chartOption.series[1].data = option.data.static_data.map(item => item.val2);
        return chartOption;
      }
    }
  }
</script>
