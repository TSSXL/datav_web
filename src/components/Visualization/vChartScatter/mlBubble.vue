<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";

  export default {
    name: 'mlBubble',
    extends:vChartBase,
    methods: {
      getChartOption(option){
        let chartOption = {};
        chartOption.animation = option.animation;
        chartOption.legend = option.style.legend;
        chartOption.grid = option.style.grid;
        chartOption.xAxis = option.style.xAxis;
        chartOption.yAxis = option.style.yAxis;
        chartOption.series = option.style.series;
        chartOption.series.splice(0,chartOption.series.length);
        chartOption.legend.data.splice(0,chartOption.legend.data.length);
        chartOption.xAxis.data = Array.from(new Set(this.option.data.static_data.map(item => item.x)));

        if(option.style.seriesItems != null && option.style.seriesItems.length > 0){
          option.style.seriesItems.forEach((item,index)=>{
            chartOption.legend.data.push(item.name);
            chartOption.series.push({
              name: item.name,
              symbolSize: function (data) {
                return data[2];
              },
              itemStyle:{
                borderWidth:item.borderWidth,
                borderColor:item.borderColor,
                color:item.color
              },
              data: option.data.static_data.filter((item)=>item.s == index+1).map(item => [item.x,item.y,item.r]),
              type: 'scatter'
            });
          })
        }
        return chartOption;
      }
    }
  }
</script>
