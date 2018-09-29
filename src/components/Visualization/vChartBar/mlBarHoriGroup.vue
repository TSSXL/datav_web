<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";

  export default {
    name: 'mlBarHoriGroup',
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
        chartOption.legend.data = option.style.seriesValues.map(item => item.name);
        chartOption.yAxis[0].data =Array.from(new Set(this.option.data.static_data.map(item => item.x)));
        let seriesNames = Array.from(new Set(this.option.data.static_data.map(item => item.s)));
        for(let i = 0;i < seriesNames.length; i++){
          if(i < option.style.seriesValues.length){
            chartOption.series.push({
              name:option.style.seriesValues[i].name,
              type:"bar",
              itemStyle:{
                color:option.style.seriesValues[i].color
              },
              label:{
                show:option.style.seriesLabel.show,
                fontSize:option.style.seriesLabel.fontSize,
                color:option.style.seriesLabel.color,
                fontWeight:option.style.seriesLabel.fontWeight,
                position:option.style.seriesLabel.position
              },
              barCategoryGap:option.style.barCategoryGap,
              barWidth:option.style.barWidth,
              data:option.data.static_data.filter((item)=>item.s == seriesNames[i]).map(item => item.y)
            });
          }
        }
        return chartOption;
      }
    }
  }
</script>
