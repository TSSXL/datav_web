<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";

  export default {
    name: 'mlGCloud',
    extends:vChartBase,
    methods: {
      getChartOption(option){
        let chartOption = {};
        chartOption.animation = option.animation;
        chartOption.textStyle = option.style.textStyle;
        chartOption.title = option.style.title;
        chartOption.series = option.style.series;
        chartOption.series[0].data = option.data.static_data.map((item,index)=>{
          return {
            name: item.name,
            value: item.value,
            textStyle: {
              normal: {
                color: option.style.serieColors[index%option.style.serieColors.length]
              }
            }
          };
        });
        return chartOption;
      }
    }
  }
</script>
