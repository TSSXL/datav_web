<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";

  export default {
    name: 'piePercent',
    extends:vChartBase,
    methods: {
      getChartOption(option){
        let chartOption = {};
        chartOption.animation = option.animation;
        chartOption.textStyle = option.style.textStyle;
        chartOption.title = option.style.title;
        chartOption.series = option.style.series;
        chartOption.series[0].data[0].value = option.data.static_data.value;
        chartOption.series[0].data[1].value = option.style.totalValue - option.data.static_data.value;
        return chartOption;
      }
    }
  }
</script>
