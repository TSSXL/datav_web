<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";

  export default {
    name: 'mlScatterPlot',
    extends:vChartBase,
    methods: {
      getChartOption(option){
        let chartOption = {};
        chartOption.animation = option.animation;
        chartOption.legend = option.style.legend;
        chartOption.xAxis = option.style.xAxis;
        chartOption.yAxis = option.style.yAxis;
        chartOption.series = option.style.series;
        chartOption.series.splice(0,chartOption.series.length);
        chartOption.legend.data.splice(0,chartOption.legend.data.length);

        let s =  this.option.data.static_data.map(item => item.s);
        let series = Array.from(new Set(s));

        chartOption.legend.data.push(`在校总人数`);
        chartOption.series.push({
          name: `在校总人数`,
          symbolSize: 10,
          itemStyle:{
            borderWidth:0,
            borderColor:'#666'
          },
          data: this.option.data.static_data.filter((item)=>item.s == 1).map(item => [item.x,item.y]),
          type: 'scatter'
        });
        chartOption.legend.data.push(`大学`);
        chartOption.series.push({
          name: `大学`,
          symbolSize: 10,
          itemStyle:{
            borderWidth:0,
            borderColor:'#666'
          },
          data: this.option.data.static_data.filter((item)=>item.s == 2).map(item => [item.x,item.y]),
          type: 'scatter'
        });
        chartOption.legend.data.push(`高中`);
        chartOption.series.push({
          name: `高中`,
          symbolSize: 10,
          itemStyle:{
            borderWidth:0,
            borderColor:'#666'
          },
          data: this.option.data.static_data.filter((item)=>item.s == 3).map(item => [item.x,item.y]),
          type: 'scatter'
        });
        chartOption.legend.data.push(`职高`);
        chartOption.series.push({
          name: `职高`,
          symbolSize: 10,
          itemStyle:{
            borderWidth:0,
            borderColor:'#666'
          },
          data: this.option.data.static_data.filter((item)=>item.s == 4).map(item => [item.x,item.y]),
          type: 'scatter'
        });

        /**if(series.length > 0){
          for(let se of series){
            chartOption.legend.data.push(`系列${se}`);
            chartOption.series.push({
              name: `系列${se}`,
              symbolSize: 10,
              itemStyle:{
                borderWidth:0,
                borderColor:'#666'
              },
              data: this.option.data.static_data.filter((item)=>item.s == se).map(item => [item.x,item.y]),
              type: 'scatter'
            });
          }
        }*/
        return chartOption;
      }
    }
  }
</script>
