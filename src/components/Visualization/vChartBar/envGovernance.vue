<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";

  export default {
    name: 'env-governance',
    extends:vChartBase,
    methods: {
      getChartOption(option){
        let chartOption = {};
        chartOption.animation = option.animation;
        chartOption.textStyle = option.style.textStyle;
        chartOption.grid = option.style.grid;
        chartOption.xAxis = option.style.xAxis;
        chartOption.yAxis = option.style.yAxis;
        chartOption.series = option.style.series;
        chartOption.yAxis[0].data = option.data.static_data.map(item => item.x);
        chartOption.yAxis[1].data = option.data.static_data.map(item => {return item.val + '万元'});
        chartOption.series[1].data = option.data.static_data.map(item => item.val);
        return chartOption;
      }
    }
  }
</script>
