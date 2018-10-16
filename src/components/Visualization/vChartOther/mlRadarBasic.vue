<template>
  <div class="charts">
    <div ref='chart' :style="'width:300px;height:200px;'"></div>
  </div>
</template>
<script>
  import vChartBase from "../vChartBase";
  import {getResultByApi,postResultByApi} from "../api"

  export default {
    name: 'mlRadarBasic',
    extends:vChartBase,
    methods: {
      async  getChartOption(option){
        if(option.data.data_type=='API'){
          let url=option.data.data_api

          let data=await  postResultByApi(url,option.data.data_api_json).then(async response=>{
            return response.data;
          }).catch((e) => {
            this.$message({
              type: 'error',
              message: option.data.data_api+"接口调用报错"
            });
          });
          option.data.static_data= data;
          return this.returnChartOption(option);

        }else{
          return this.returnChartOption(option);
        }
      },

      returnChartOption(option){

        let chartOption = {};
        chartOption.animation = option.animation;
        chartOption.textStyle = option.style.textStyle;
        if(option.style.legend!=null){
          chartOption.legend = option.style.legend;
        }

        chartOption.radar = option.style.radar;
        chartOption.series = option.style.series;
        chartOption.series.splice(0,chartOption.series.length);
        //chartOption.legend.data.splice(0,chartOption.legend.data.length);
        //let s =  this.option.data.static_data.map(item => item.s);
        let series = option.data.static_data;
        //let indicators = Array.from(new Set(this.option.data.static_data.map(item => item.x))).map(item=>{return {name:item}});

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
