<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";

  export default {
    name: 'mlPieBasic',
    extends:vChartBase,
    methods: {
      getChartOption(option){
        let chartOption = {};
        chartOption.animation = option.animation;
        chartOption.textStyle = option.style.textStyle;
        chartOption.title = option.style.title;
        chartOption.legend = option.style.legend;
        chartOption.legend.data = option.data.static_data.map(item => item.x);
        chartOption.series = option.style.series;
        chartOption.series.label = {
          //formatter:`${option.style.tagStyle.show ? '{x|{b}}' : ''} ${option.style.tagStyle.isNewLine ? '\n': ''} ${option.style.tagStyle.isVal ? '{y|{c}}' : '{y|{d}%}'}`,
          formatter:`${option.style.tagStyle.show ? '{x|{b}}' : ''} ${option.style.tagStyle.isNewLine ? '\n': ''} ${option.style.tagStyle.isVal ? '{y|{c}}' : '{y|{c}}个'}`,
          rich:{
            x:option.style.tagStyle.x,
            y:option.style.tagStyle.y
          }
        };
        if(option.style.serieColors != null && option.style.serieColors.length > 0) {
          option.style.serieColors.forEach((item, index) => {
            chartOption.series.data.push({
              "name": option.data.static_data[index].x,
              "value": option.data.static_data[index].y,
              "itemStyle": {
                "color": item.color
              }
            });
          });
        }
        return chartOption;
      }
    }
  }
</script>
