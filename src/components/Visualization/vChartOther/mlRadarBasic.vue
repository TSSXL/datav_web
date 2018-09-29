<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";

  export default {
    name: 'mlRadarBasic',
    extends:vChartBase,
    methods: {
      getChartOption(option){
        //地图点击后会重新调用这个方法刷新相关参数
        if(option.newData!=null && option.newData.id!=null){
          option.data.static_data=[];
          let newMap=[
            {
              "data": [
                [
                  234,
                  185,
                  230,
                  4.09,
                  123,
                  69,
                  27
                ]
              ],
              "s": "站点"
            }
          ]
          option.data.static_data=newMap;
        }
        let chartOption = {};
        chartOption.animation = option.animation;
        chartOption.textStyle = option.style.textStyle;
        if(option.style.legend!=null){
          chartOption.legend = option.style.legend;
        }

        chartOption.radar = option.style.radar;
        chartOption.series = option.style.series;
        chartOption.series.splice(0,chartOption.series.length);
        chartOption.legend.data.splice(0,chartOption.legend.data.length);
        //let s =  this.option.data.static_data.map(item => item.s);
        let series = option.data.static_data;
        //let indicators = Array.from(new Set(this.option.data.static_data.map(item => item.x))).map(item=>{return {name:item}});

        chartOption.radar= option.style.radar;
        //chartOption.radar.splitNumber = indicators.length;
        if(series.length > 0){
          for(let se of series){
            chartOption.series.push({
              name: `${se.s}`,
              type: 'radar',
              lineStyle: {
                normal: {
                  width: 1,
                  opacity: 0.5
                }
              },
              //data: [this.option.data.static_data.filter((item)=>item.s == se).map(item => item.y)],
              data:se.data,
              symbol: 'none',
              itemStyle: {
                normal: {
                  color: '#F9713C'
                }
              },
              areaStyle: {
                normal: {
                  opacity: 0.15
                }
              },
              label:{
                show:false
              },
            });
          }
        }
        return chartOption;
      }
    }
  }
</script>
